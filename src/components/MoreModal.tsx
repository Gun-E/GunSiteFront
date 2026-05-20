"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../styles/MoreModal.module.css";

interface MoreModalProps {
    isOpen: boolean;
    onCloseAction: () => void;
    boardId: number;
}

const MoreModal = ({ isOpen, onCloseAction, boardId }: MoreModalProps) => {
    const router = useRouter();

    if (!isOpen) return null;

    const handleDelete = async () => {
        const confirmDelete = confirm("정말 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://www.9unback.shop/boards/${boardId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("게시글 삭제에 실패했습니다.");
            }

            alert("게시글이 삭제되었습니다.");
            router.back();
        } catch (error) {
            console.error("삭제 오류:", error);
            alert("삭제하는 동안 오류가 발생했습니다.");
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onCloseAction}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <Link href={`/board/edit/${boardId}`} className="text-gray-500">
                    <button onClick={onCloseAction}>수정</button>
                </Link>
                <button className="text-red-500" onClick={handleDelete}>
                    삭제
                </button>
            </div>
        </div>
    );
};

export default MoreModal;