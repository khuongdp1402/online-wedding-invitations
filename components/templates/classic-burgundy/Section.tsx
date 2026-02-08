import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  fullBleed?: boolean;
};

export function Section({ id, children, className = "", fullBleed = false }: SectionProps) {
  if (fullBleed) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }
  return (
    <section id={id} className={className}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
