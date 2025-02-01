import React from 'react';
import Link from 'next/link';
import styles from '../styles/Pagination.module.css';
import { BiChevronRight ,BiChevronLeft, BiDotsHorizontalRounded } from "react-icons/bi";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    category: string;
}

export default function Pagination  ({currentPage, totalPages, category}: PaginationProps) {
    const MAX_VISIBLE_PAGES = 7;

    const getPageNumbers = (): number[] => {
        if (totalPages <= MAX_VISIBLE_PAGES) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }

        if (currentPage >= 6 && currentPage <= totalPages - 5) {
            return Array.from({ length: 5 }, (_, index) => currentPage - 2 + index);
        }

        if (currentPage <= MAX_VISIBLE_PAGES) {
            return Array.from({ length: MAX_VISIBLE_PAGES }, (_, index) => index + 1);
        }

        return Array.from({ length: MAX_VISIBLE_PAGES }, (_, index) => totalPages - MAX_VISIBLE_PAGES + 1 + index);
    };

    const PageLink = ({page, currentPage}: { page: number; currentPage: number }) => {
        return (
            <Link
                href={`/board/${category}?page=${page}`}
                className={`${styles.page_button} ${currentPage === page ? styles.active : ''}`}
                aria-label={`Go to page ${page}`}
            >
                {page}
            </Link>
        );
    };

    const Ellipsis = () => {
        return (
            <div className={styles.more}>
                <BiDotsHorizontalRounded className="text-3xl"/>
            </div>
        );
    };
    const FirstPage = () => {
        return (
            <Link href={`/board/${category}?page=1"`}
                className={styles.page_button}
                aria-label="page=1">
                1
            </Link>
        );
    };
    const LastPage = () => {
        return (
            <Link href={`/board/${category}?page=${totalPages}`}
                className={styles.page_button}
                aria-label="page=totalPages">
                {totalPages}
            </Link>
        );
    };
    const pageNumbers = getPageNumbers();

    return (
        <div className={styles.page_nation}>
            <div className={styles.page_nation_list}>
                <Link
                    href={`/board/${category}?page=${Math.max(currentPage - 1, 1)}`}
                    className={`${styles.page_button} ${currentPage === 1 ? styles.disabled : ''}`}
                >
                    <BiChevronLeft className="text-3xl"/>
                </Link>

                {currentPage > 5 && <FirstPage/>}
                {currentPage > 5 && <Ellipsis/>}
                {pageNumbers.map((page) => (
                    <PageLink key={page} page={page} currentPage={currentPage}/>
                ))}
                {currentPage < totalPages - 4 && <Ellipsis/>}
                {currentPage < totalPages - 4 && <LastPage/>}

                <Link
                    href={`/board/${category}?page=${Math.min(currentPage + 1, totalPages)}`}
                    className={`${styles.page_button} ${currentPage === totalPages ? styles.disabled : ''}`}
                >
                    <BiChevronRight className="text-3xl"/>
                </Link>
            </div>
        </div>
    );
}
