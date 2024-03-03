import Image from "next/image";
import { prisma } from "../lib/prisma";
import Link from "next/link";
import CdCard from "@/components/CdCard";

async function getCds() {
    const res = await prisma.cd.findMany();
    return res;
}

export default async function Home() {
    const cds = await getCds();

    return (
        <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 py-10 text-center flex-flex-col items-center">
            <h1 className="text-4xl font-bold">CDs Marketplace</h1>
            <Link
                href="/add"
                className="inline-block px-6 py-2 text-sm font-medium leading-6 text-center text-white transition bg-indigo-600 rounded-lg shadow ripple hover:shadow-lg hover:bg-indigo-800 focus:outline-none mt-10"
            >
                Add a new CD
            </Link>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-10 mt-6 items-center align-center ">
                {cds.map((cd) => (
                    <CdCard key={cd.id} cd={cd} />
                ))}
            </div>
        </div>
    );
}
