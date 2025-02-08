"use client";

import React, { useState, useEffect } from "react";
import BoardComponent from "@/components/BoardComponent";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";
import axios from "axios";
import { formatDate } from "@/format/timeFomat";

interface Board {
    boardId: number;
    title: string;
    username: string;
    date: string;
}

export default function Home() {
    const [codeBoards, setCodeBoards] = useState<Board[]>([]);
    const [freeBoards, setFreeBoards] = useState<Board[]>([]);

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const codeResponse = await axios.get("https://www.9unback.shop/boards?category=code&limit=5");
                setCodeBoards(codeResponse.data);

                const freeResponse = await axios.get("https://www.9unback.shop/boards?category=free&limit=5");
                setFreeBoards(freeResponse.data);
            } catch (error) {
                console.error("게시물 데이터를 가져오는 데 실패했습니다.", error);
            }
        };

        fetchBoards();
    }, []);

    return (
        <>
            <BoardComponent />
            <div className="flex flex-col gap-20 mb-20 px-10 max-w-[1140px] mx-auto">
                {/* 코딩 게시판 */}
                <div className="flex flex-col">
                    <Link className="flex items-center" href="/board/code">
                        <h1 className="text-3xl font-bold mr-2.5">코딩 게시판</h1>
                        <BiChevronRight className="text-3xl" />
                    </Link>
                    <div className="mt-8">
                        {codeBoards.map((board) => (
                            <Link
                                key={board.boardId}
                                href={`/board/${board.boardId}`}
                                className="py-3.5 flex flex-col gap-2.5 items-start"
                            >
                                <div className="w-full flex flex-col gap-1">
                                    <h3 className="text-lg font-semibold">{board.title}</h3>
                                    <p className="text-sm font-normal">
                                        <span className="my-blue mr-2">{board.username}</span>
                                        {formatDate(board.date)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="h-0.5 w-full bg-gray-100"></div>

                {/* 자유 게시판 */}
                <div className="flex flex-col">
                    <Link className="flex items-center" href="/board/free">
                        <h1 className="text-3xl font-bold mr-2.5">자유 게시판</h1>
                        <BiChevronRight className="text-3xl" />
                    </Link>
                    <div className="mt-8">
                        {freeBoards.map((board) => (
                            <Link
                                key={board.boardId}
                                href={`/board/${board.boardId}`}
                                className="py-3.5 flex flex-col gap-2.5 items-start"
                            >
                                <div className="w-full flex flex-col gap-2">
                                    <h3 className="text-lg font-semibold">{board.title}</h3>
                                    <p className="text-sm font-normal">
                                        <span className="my-blue mr-2">{board.username}</span>
                                        {formatDate(board.date)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
