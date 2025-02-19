"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import axios from "axios";
import Pagination from "@/components/Pagination";
import { useAuth } from "@/app/context/AuthContext";
import { formatDate } from "@/format/timeFomat";

interface Board {
    boardId: number;
    title: string;
    username: string;
    date: string;
}

export default function Board() {
    const { isLoggedIn } = useAuth();
    const pathname = usePathname();
    const isCodeBoard = pathname === "/board/code";
    const boardTitle = isCodeBoard ? "코딩 게시판" : "자유 게시판";
    const [boards, setBoards] = useState<Board[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const searchParams = useSearchParams();

    const category = isCodeBoard ? "code" : "free";

    useEffect(() => {
        const pageParam = searchParams.get("page");
        const page = pageParam ? Math.min(parseInt(pageParam, 10), totalPages) : 1;
        setCurrentPage(page);
    }, [searchParams, totalPages]);

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await axios.get(
                    `https://www.9unback.shop/boards/list?category=${isCodeBoard ? "code" : "free"}&page=${currentPage - 1}`
                );
                setBoards(response.data.boards);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("게시물 데이터를 가져오는 데 실패했습니다.", error);
            }
        };

        fetchBoards();
    }, [currentPage, isCodeBoard]);

    return (
        <div className="flex flex-col items-start justify-start py-24 px-10 max-w-[1140px] mx-auto">
            <h1 className="text-3xl font-bold mr-2.5">{boardTitle}</h1>

            <div className="mt-8">
                {boards.map((board) => (
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

            {Number.isInteger(currentPage) && (
                <Pagination currentPage={currentPage} totalPages={totalPages} category={category} />
            )}

            {isLoggedIn && (
                <Link
                    href="/board/create"
                    className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full py-3 px-5 shadow-lg"
                >
                    <span className="text-lg">글쓰기</span>
                </Link>
            )}
        </div>
    );
}
