"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPage() {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [genre, setGenre] = useState("");
    const [releasedYear, setReleasedYear] = useState(0);
    const [price, setPrice] = useState(0);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            await fetch("/api/add", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    artist,
                    genre,
                    releasedYear,
                    price,
                    //todo: add image from spotify
                    image: "https://miro.medium.com/200",
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            router.refresh();
            router.push("/");
        } catch (error) {
            setError("Error adding CD");
        }
        setTitle("");
        setArtist("");
        setGenre("");
        setReleasedYear(0);
        setPrice(0);
    };

    return (
        <div>
            <Link href="/">Go back</Link>
            <form className="flex flex-col space-y-4 w-64 mx-auto mt-28" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="artist" className="block text-sm font-medium text-gray-700">
                        Artist
                    </label>
                    <input
                        type="text"
                        id="artist"
                        name="artist"
                        required
                        onChange={(e) => setArtist(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                        Genre
                    </label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        required
                        onChange={(e) => setGenre(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="releasedYear" className="block text-sm font-medium text-gray-700">
                        Released Year
                    </label>
                    <input
                        type="number"
                        id="releasedYear"
                        name="releasedYear"
                        required
                        onChange={(e) => setReleasedYear(parseInt(e.target.value))}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        required
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add new CD
                </button>
            </form>
        </div>
    );
}
