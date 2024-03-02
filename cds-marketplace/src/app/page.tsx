import Image from "next/image";
import prisma from "../lib/prisma";
import Link from "next/link";

async function getCds() {
    const res = await prisma.cd.findMany();
    var a = res;
    a.push({
        id: 15,
        title: "Test",
        artist: "Test",
        genre: "Test",
        releasedYear: 12,
        price: 12,
        image: "https://miro.medium.com/200",
    });
    a.push({
        id: 125,
        title: "Test",
        artist: "Test",
        genre: "Test",
        releasedYear: 12,
        price: 12.99,
        image: "https://miro.medium.com/200",
    });
    return a;
}

export default async function Home() {
    const cds = await getCds();
    return (
        <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 py-10 text-center flex-flex-col items-center">
            <h1 className="text-4xl font-bold">CDs Marketplace</h1>
            <Link href="/add">Add a new CD</Link>
            <div className="grid grid-cols-3 gap-10 mt-6 items-center align-center ">
                {cds.map((cd) => (
                    <div
                        key={cd.id}
                        className="flex flex-col  items-center hover:bg-gray-100 rounded-xl p-6 max-w-lg hover:cursor-pointer"
                    >
                        <Image src={cd.image} alt={cd.title} width={200} height={200} className="rounded-xl mb-6" />
                        <h2 className="text-2xl font-bold">
                            {cd.title.length > 23 ? cd.title.substring(0, 23).concat("...") : cd.title}
                        </h2>
                        <p className="text-lg">{cd.artist}</p>
                        <p className="text-2xl font-bold mt-4">${cd.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
