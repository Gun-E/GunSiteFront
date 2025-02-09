export function formatDate(dateString: string) {
    const now = new Date();
    const targetDate = new Date(dateString);

    const targetDateKST = new Date(targetDate.getTime() + 9 * 60 * 60 * 1000);
    const diffInSeconds = Math.floor((now.getTime() - targetDateKST.getTime()) / 1000);

    if (diffInSeconds < 180) {
        return "방금 전";
    }

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

    return targetDateKST.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}