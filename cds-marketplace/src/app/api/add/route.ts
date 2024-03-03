import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const cd = await req.json();
    console.log(cd);
    const result = await prisma.cd.create({
        data: {
            title: cd.title,
            artist: cd.artist,
            genre: cd.genre,
            releasedYear: cd.releasedYear,
            price: cd.price,
            image: cd.image,
        },
    });
    return new NextResponse(JSON.stringify(cd), { headers: { "Content-Type": "application/json" }, status: 201 });
}
