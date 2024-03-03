import Image from "next/image";
import { prisma } from "../lib/prisma";
import Link from "next/link";
import CdCard from "@/components/CdCard";
import LuckyButton from "@/components/LuckyButton";
import SearchBar from "@/components/SearchBar";

async function getCds(page: number, search: string) {
    const res = await prisma.cd.findMany({
        skip: (page - 1) * 10,
        take: 10,
        where: {
            OR: [{ title: { contains: search } }, { artist: { contains: search } }, { genre: { contains: search } }],
        },
    });
    return res;
}

async function getAllCds() {
    const res = await prisma.cd.findMany();
    return res;
}

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const page = searchParams["page"] ?? "1";
    const search = searchParams["search"] ?? "";
    const allCds = await getAllCds();
    const cds = await getCds(parseInt(page), search);
    const maxPage = Math.ceil((await prisma.cd.count()) / 10);

    return (
        <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 py-10 text-center flex-flex-col items-center">
            <h1 className="text-4xl font-bold">CDs Marketplace</h1>
            <SearchBar />
            <div className="flex justify-center gap-4">
                <Link
                    href="/add"
                    className="inline-block px-6 py-2 text-sm font-medium leading-6 text-center text-white transition bg-indigo-600 rounded-lg shadow ripple hover:shadow-lg hover:bg-indigo-800 focus:outline-none mt-10"
                >
                    Add a new CD
                </Link>
                <LuckyButton cds={allCds} />
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-10 mt-6 items-center align-center">
                {cds.map((cd) => (
                    <CdCard key={cd.id} cd={cd} />
                ))}
            </div>
            <div className="flex justify-center gap-4 mt-10">
                {page !== "1" && (
                    <Link href={`/?page=${parseInt(page) - 1}`} className="text-blue-500 hover:text-blue-700">
                        &larr; Previous
                    </Link>
                )}
                {page !== maxPage.toString() && (
                    <Link href={`/?page=${parseInt(page) + 1}`} className="text-blue-500 hover:text-blue-700">
                        Next &rarr;
                    </Link>
                )}
            </div>
        </div>
    );
}
