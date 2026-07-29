import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real Casso webhook, the data structure looks like this:
    // { data: [ { description: "TC cldr93h...", amount: 1000000, ... } ] }
    // For this mock, we just accept the description directly or wrapped in data.
    
    const descriptions: string[] = [];
    if (body.data && Array.isArray(body.data)) {
      body.data.forEach((txn: { description?: string }) => {
        if (txn.description) descriptions.push(txn.description);
      });
    } else if (body.description) {
      descriptions.push(body.description);
    }
    
    if (descriptions.length === 0) {
      return NextResponse.json({ error: "No description found" }, { status: 400 });
    }

    let processed = 0;

    for (const desc of descriptions) {
      // Expecting format: TC [weddingId] [PLAN]
      // Or we can just find any PENDING payment that has this description as transferContent
      const match = desc.match(/TC([a-zA-Z0-9_-]+)/i);
      
      if (match) {
        // Find payment where weddingId ends with the extracted short ID
        const shortId = match[1].toLowerCase();
        
        const pendingPayment = await prisma.payment.findFirst({
          where: { 
            weddingId: { endsWith: shortId }, 
            status: "PENDING" 
          },
          orderBy: { createdAt: "desc" },
        });

        if (pendingPayment) {
          // Update payment
          await prisma.payment.update({
            where: { id: pendingPayment.id },
            data: { 
              status: "COMPLETED",
              paidAt: new Date(),
            },
          });

          // Update wedding
          await prisma.wedding.update({
            where: { id: pendingPayment.weddingId },
            data: {
              status: "PUBLISHED",
              plan: pendingPayment.plan,
              paidAt: new Date(),
              // Expiry can be set here if not infinite
            },
          });
          
          processed++;
        }
      }
    }

    return NextResponse.json({ success: true, processed });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
