import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: Number } }) {
    const { id } = params;
    const cd = await prisma.cd.findUnique({
        where: {
            id: Number(id),
        },
    });
    return new NextResponse(JSON.stringify(cd), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
