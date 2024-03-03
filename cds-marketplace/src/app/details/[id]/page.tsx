import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

async function getCd(id: Number) {
    const host = headers().get("host");
    const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
    const res = await fetch(`${protocal}://${host}/api/get/${id}`, { cache: "no-store" });
    const cd = await res.json();
    return cd;
}

export default async function CdDetails({ params }: { params: { id: Number } }) {
    const cd = await getCd(params.id);
    return (
        <>
            <div>
                <Link href="/">Go back</Link>
                <div>
                    <Image src={cd.image.toString()} alt={cd.title.toString()} width={400} height={400} />
                    <h1>{cd.title}</h1>
                    <h2>{cd.artist}</h2>
                    <h3>{cd.genre}</h3>
                    <h4>{cd.releasedYear}</h4>
                    <h5>{cd.price}</h5>
                </div>
            </div>
        </>
    );
}
