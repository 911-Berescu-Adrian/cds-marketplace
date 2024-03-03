"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            router.push(`/?search=${term}`);
        } else {
            router.push("/");
        }
    }, 300);
    return (
        <>
            <div className="relative flex flex-1 flex-shrink-0 justify-center mt-10 mb-10">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input
                    className="peer block sm:w-[70%] lg:w-[50%] rounded-full border border-gray-200 py-[9px] px-6 text-sm outline-2 placeholder:text-gray-500"
                    placeholder={"Search CDs by title, artist or genre..."}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get("search")?.toString()}
                />
            </div>
        </>
    );
}
