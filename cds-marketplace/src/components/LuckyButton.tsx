"use client";
import Link from "next/link";
import React from "react";
import { CdType } from "./CdCard";

export default function LuckyButton({ cds }: { cds: CdType[] }) {
    return (
        <Link
            href={"/details/" + cds[Math.floor(Math.random() * cds.length)].id}
            className="inline-block px-6 py-2 text-sm font-medium leading-6 text-center  transition bg-slate-50 border border-slate-200 rounded-lg shadow ripple hover:shadow-lg hover:bg-slate-300 focus:outline-none mt-10"
        >
            Feeling Lucky
        </Link>
    );
}
