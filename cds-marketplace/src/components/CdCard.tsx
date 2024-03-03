"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type CdType = {
    id: Number;
    title: String;
    artist: String;
    genre: String;
    releasedYear: Number;
    price: Number;
    image: String;
};

const CdCard = ({ cd }: { cd: CdType }) => {
    const router = useRouter();

    const handleClickDetails = (id: Number) => {
        router.push(`/details/${id}`);
    };
    return (
        <div
            onClick={() => handleClickDetails(cd.id)}
            className="flex flex-col items-center hover:bg-gray-100 rounded-xl p-6 max-w-lg hover:cursor-pointer"
        >
            <Image
                src={cd.image.toString()}
                alt={cd.title.toString()}
                width={200}
                height={200}
                className="rounded-xl mb-6"
            />
            <h2 className="text-2xl font-bold">
                {cd.title.length > 23 ? cd.title.substring(0, 23).concat("...") : cd.title}
            </h2>
            <p className="text-lg">{cd.artist}</p>
            <p className="text-2xl font-bold mt-4">${cd.price.toString()}</p>
        </div>
    );
};

export default CdCard;
