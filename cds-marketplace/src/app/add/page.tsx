import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { request } from "https";
import { get } from "http";
import { headers } from "next/headers";

const BASE_URL = `https://accounts.spotify.com/api`;
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

export default function AddPage() {
    const getSpotifyToken = async () => {
        "use server";
        const res = await fetch(`${BASE_URL}/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials&client_id=" + client_id + "&client_secret=" + client_secret,
        })
            .then((res) => res.json())
            .then((data) => data.access_token);
        return res;
    };

    const getImageForAlbum = async (album: string, artist: string) => {
        "use server";
        const token = await getSpotifyToken();
        const res = await fetch("https://api.spotify.com/v1/search?q=" + album + "+" + artist + "&type=album", {
            headers: { Authorization: "Bearer " + token },
        })
            .then((res) => res.json())
            .then((data) => data.albums.items[0].images[0].url);
        return res;
    };

    const addCd = async (formData: FormData) => {
        "use server";

        const title = formData.get("title");
        const artist = formData.get("artist");
        const genre = formData.get("genre");
        const releasedYear = formData.get("releasedYear");
        const price = formData.get("price");
        const image = await getImageForAlbum(title as string, artist as string);

        try {
            await prisma.cd.create({
                data: {
                    title: title as string,
                    artist: artist as string,
                    genre: genre as string,
                    releasedYear: parseInt(releasedYear as string),
                    price: parseFloat(price as string),
                    image: image,
                },
            });
        } catch (error) {
            alert("Error adding CD: " + error);
        }
        revalidatePath("/");
        redirect("/");
    };

    return (
        <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 py-10 text-center flex-flex-col items-center">
            <Link href="/" className="text-blue-500 hover:text-blue-700">
                &larr; Go back
            </Link>
            <form className="flex flex-col space-y-4 w-64 mx-auto mt-20" action={addCd}>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
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
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
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
