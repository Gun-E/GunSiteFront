"use client"

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";
import Select, { SingleValue, StylesConfig } from "react-select";
import { useAuth } from "@/app/context/AuthContext";

interface OptionType {
    value: string;
    label: string;
}

export default function Home() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { userId } = useAuth();
    const [selectedOption, setSelectedOption] = useState<OptionType | null>({
        value: "free",
        label: "자유 게시판",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isClient, setIsClient] = useState(false);

    const contentRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (contentRef.current) {
            const textarea = contentRef.current;

            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;

            const textLength = textarea.value.length;
            textarea.setSelectionRange(textLength, textLength);
            textarea.scrollTop = textarea.scrollHeight;
        }
    }, [content]);

    const handleSave = async () => {
        console.log("User ID:", userId);
        if (!title || !content) {
            setErrorMessage("제목과 내용을 모두 입력해야 합니다.");
            return;
        }

        const confirmCreate = confirm("정말 저장하시겠습니까?");
        if (!confirmCreate) return;

        try {
            const boardData = {
                title,
                content,
                category: selectedOption?.value || "free",
                userId: userId,
            };

            const response = await axios.post(
                "https://www.9unback.shop/boards",
                boardData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                alert("저장 되었습니다.")
                router.push("/board");
            } else {
                setErrorMessage("게시글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400) {
                    setErrorMessage("잘못된 입력값이 있습니다.");
                } else if (error.response.status === 500) {
                    setErrorMessage("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
                }
            } else {
                setErrorMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    const handleChange = (selected: SingleValue<OptionType>) => {
        setSelectedOption(selected);
    };

    const customStyles: StylesConfig<OptionType, false> = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "#F2F4F6",
            borderColor: "transparent",
            fontWeight: "500",
            borderRadius: "8px",
            padding: "8px",
            boxShadow: "none",
            zIndex: 10,
            cursor: "pointer",
            border: "none",
            '&:hover': {
                borderColor: "transparent",
            },
        }),
        menu: (provided) => ({
            ...provided,
            position: "absolute",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 8px 16px 0 rgba(2, 32, 71, 0.05)",
            padding: "8px 10px",
            zIndex: 9999,
            top: '100%',
            border: "none",
        }),
        option: (provided) => ({
            ...provided,
            backgroundColor: "transparent",
            cursor: "pointer",
            color: "#535353",
            fontWeight: "500",
            border: "none",
            borderRadius: "8px",
            padding: "9px 13px",
            transition: "background-color 0.3s ease",
            '&:hover': {
                backgroundColor: "#F2F4F6",
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#1C1B1F",
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: "#4E5968",
            '&:hover': {
                color: "#1C1B1F",
            },
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
    };

    const options: OptionType[] = [
        { value: "code", label: "코딩 게시판" },
        { value: "free", label: "자유 게시판" },
    ];

    return (
        <div className="flex flex-col items-start justify-start py-24 px-10 max-w-[1140px] mx-auto min-h-[100vh] relative">
            <h1 className="text-3xl font-bold mb-10">새로운 게시글 작성</h1>

            <div className="mb-3.5">
                {isClient && (
                    <Select
                        value={selectedOption}
                        onChange={handleChange}
                        options={options}
                        isSearchable={false}
                        styles={customStyles}
                        placeholder="게시판을 선택하세요"
                        menuPortalTarget={document.body}
                    />
                )}
            </div>

            <input
                type="text"
                className={styles.title_input}
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                ref={contentRef}
                className={styles.content_input}
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            {errorMessage && (
                <div className="text-red-500 mb-4">{errorMessage}</div>
            )}
            <div className="flex gap-2">
                <button onClick={handleSave} className="blue_button">
                    저장
                </button>
                <button onClick={() => router.back()} className="gray_button">
                    취소
                </button>
            </div>
        </div>
    );
}
