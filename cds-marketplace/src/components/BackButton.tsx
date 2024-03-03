"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    return (
        <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => {
                router.back();
            }}
        >
            &larr; Go back
        </button>
    );
}
