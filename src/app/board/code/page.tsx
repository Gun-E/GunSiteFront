import React, { Suspense } from "react";
import Board from "@/components/Board";

export default function Home() {
    return (
        <Suspense>
            <Board />
        </Suspense>
    );
}
