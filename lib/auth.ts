import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true, // Cần thiết khi chạy sau proxy hoặc port khác
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET, // Tránh lỗi Configuration khi chạy Docker
  providers: [
    // Google chỉ bật khi đã cấu hình OAuth trong Google Cloud Console
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    Credentials({
      name: "Đăng nhập bằng email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const email = String(credentials.email).trim().toLowerCase();
        const password = String(credentials.password);

        let user;
        try {
          user = await prisma.user.findUnique({
            where: { email },
          });
        } catch (err) {
          console.error("[Auth] Prisma findUnique user error:", err);
          return null;
        }
        if (!user?.password) return null;

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return null;

        const role = (user as { role?: string }).role ?? "USER";
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    // Cho Credentials: link user đã tồn tại trong DB để adapter không tạo duplicate
    async signIn({ user, account }) {
      if (account?.provider === "credentials" && user?.email) {
        const existing = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (existing) {
          user.id = existing.id;
        }
      }
      return true;
    },
  },
});
