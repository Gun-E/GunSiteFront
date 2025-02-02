"use client";

import styles from "./page.module.css";
import {BiDotsVerticalRounded} from "react-icons/bi";
import React, {useState, useEffect} from "react";
import MoreModal from "@/components/MoreModal";
import {usePathname, useRouter} from "next/navigation";
import axios from "axios";

interface Board {
    title: string;
    content: string;
    category: string;
    username: string;
    date: string;
}

export default function Home() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const isLoggedIn: boolean = true;
    const pathname = usePathname();
    const [board, setBoard] = useState<Board | null>(null);

    const boardId = pathname.match(/\d+$/)?.[0];

    useEffect(() => {
        if (!boardId) return;

        axios
            .get<Board>(`https://www.9unback.shop/boards/${boardId}`)
            .then((response) => {
                setBoard(response.data);
            })
            .catch((error) => {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            });
    }, [boardId]);
    const formatTime = (dateString: string) => {
        const now = new Date();
        const targetDate = new Date(dateString);

        const targetDateKST = new Date(targetDate.getTime() + 9 * 60 * 60 * 1000);

        const diffInSeconds = Math.floor((now.getTime() - targetDateKST.getTime()) / 1000);

        if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes}분 전`;
        }

        if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours}시간 전`;
        }

        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        if (targetDateKST.toDateString() === yesterday.toDateString()) {
            return "어제";
        }

        let formattedDate = targetDateKST.toLocaleString("ko-KR", {
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });

        if (targetDateKST.getFullYear() !== now.getFullYear()) {
            formattedDate = targetDateKST.toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
        }

        return formattedDate.replace(/\//g, ".");
    };
    return (
        <div className="flex flex-col gap-8 items-start justify-start py-24 px-10 max-w-[1140px] mx-auto">
            <div className="flex flex-col w-full">
                <div className="flex justify-between w-full items-center mb-5">
                    <h1 className={styles.title}>{board?.title || "제목을 불러오는 중..."}</h1>
                    {/*<BiDotsVerticalRounded*/}
                    {/*    className={styles.more}*/}
                    {/*    onClick={() => setIsModalOpen(true)}*/}
                    {/*/>*/}
                </div>
                <div className="flex justify-between w-full items-center">
                    <div
                        className="bg-my-blue text-white rounded-full px-3 py-1 text-xs font-medium inline-block w-fit">
                        {board?.category === "code" ? "코드 게시판" : board?.category === "free" ? "자유게시판" : "카테고리 없음"}
                    </div>
                    <p className="text-sm font-normal text-gray-500">
                        <span className="my-blue font-medium mr-2">{board?.username || "작성자 없음"}</span>
                        {board?.date ? formatTime(board.date) : "날짜 없음"}
                    </p>
                </div>
            </div>
            <div className="h-0.5 w-full bg-gray-100"></div>
            <p className={styles.content}>{board?.content || "내용을 불러오는 중..."}</p>

            <button onClick={() => router.back()} className="gray_button">
                목록
            </button>
            <MoreModal
                isOpen={isModalOpen}
                isLoggedIn={isLoggedIn}
                onCloseAction={() => setIsModalOpen(false)}
            />
        </div>
    );
}
