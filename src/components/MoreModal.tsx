"use client"

import React, {useEffect} from "react";
import Link from "next/link";
import ReactDOM from "react-dom";
import styles from "../styles/MoreModal.module.css";

interface MoreModalProps {
    isOpen: boolean;
    isLoggedIn: boolean;
    onCloseAction: () => void;
}

const MoreModal = ({isOpen, onCloseAction}: MoreModalProps) => {

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay} onClick={onCloseAction}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className="text-gray-500" onClick={onCloseAction}>
                    수정
                </button>
                <button className="text-red-500" onClick={onCloseAction}>
                    삭제
                </button>
            </div>
        </div>
        ,
        document.body
    );
};

export default MoreModal;
