import BackButton from "@/components/BackButton";
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
            <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 py-10 text-center flex-flex-col items-center">
                <BackButton />
                <div className="mt-10">
                    <Image
                        src={cd.image.toString()}
                        alt={cd.title.toString()}
                        width={400}
                        height={400}
                        className="mx-auto rounded-lg"
                    />
                    <h1 className="text-3xl font-bold mt-5">{cd.title}</h1>
                    <h2 className="text-2xl mt-2">{cd.artist}</h2>
                    <h3 className="text-lg mt-2">
                        {cd.genre} • {cd.releasedYear}
                    </h3>
                    <h2 className="text-3xl font-bold mt-2">${cd.price}</h2>
                </div>
            </div>
        </>
    );
}
