import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function AddPage() {
    const addCd = async (formData: FormData) => {
        "use server";

        const title = formData.get("title");
        const artist = formData.get("artist");
        const genre = formData.get("genre");
        const releasedYear = formData.get("releasedYear");
        const price = formData.get("price");
        const image = "https://miro.medium.com/200";
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
