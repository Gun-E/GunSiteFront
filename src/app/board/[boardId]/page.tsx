"use client";

import styles from "./page.module.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import MoreModal from "@/components/MoreModal";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { formatDate } from "@/format/timeFomat";

interface Board {
    boardId: number;
    title: string;
    content: string;
    category: string;
    username: string;
    date: string;
    userId: number;
}

export default function Home() {
    const { userId, isAdmin } = useAuth();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const [board, setBoard] = useState<Board | null>(null);
    const boardId = pathname.match(/\d+$/)?.[0];

    useEffect(() => {
        if (!boardId) return;

        fetch(`https://www.9unback.shop/boards/${boardId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("데이터를 불러오는 데 실패했습니다.");
                }
                return response.json();
            })
            .then((data: Board) => {
                setBoard(data);
            })
            .catch((error) => {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            });
    }, [boardId]);

    const handleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    return (
        <div className="flex flex-col gap-8 items-start justify-start py-24 px-10 max-w-[1140px] mx-auto">
            <div className="flex flex-col w-full">
                <div className="flex justify-between w-full items-center mb-5 relative">
                    <h1 className={styles.title}>{board?.title || "제목을 불러오는 중..."}</h1>
                    {(board?.userId === userId || isAdmin)&& (
                        <BiDotsVerticalRounded
                            className={styles.more}
                            onClick={handleModal}
                        />
                    )}
                    {isModalOpen && (
                        <MoreModal isOpen={isModalOpen} onCloseAction={handleModal} boardId={boardId ? Number(boardId) : 0} />
                    )}
                </div>
                <div className="flex justify-between w-full items-center">
                    <div className="bg-my-blue text-white rounded-full px-3 py-1 text-xs font-medium inline-block w-fit">
                        {board?.category === "code"
                            ? "코드 게시판"
                            : board?.category === "free"
                                ? "자유게시판"
                                : "카테고리 없음"}
                    </div>
                    <p className="text-sm font-normal text-gray-500">
                        <span className="my-blue font-medium mr-2">{board?.username || "작성자 없음"}</span>
                        {board?.date ? formatDate(board.date) : "날짜 없음"}
                    </p>
                </div>
            </div>
            <div className="h-0.5 w-full bg-gray-100"></div>
            <p className={styles.content}>{board?.content || "내용을 불러오는 중..."}</p>

            <button onClick={() => router.back()} className="gray_button">
                목록
            </button>


        </div>
    );
}