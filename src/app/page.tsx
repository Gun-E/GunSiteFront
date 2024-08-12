import styles from '@/styles/MainPage.module.css';
export default function Home() {
    return (
        <div className={styles.mainPage}>
            <div className={`${styles.subPage1} p-24`}>
                <p className="text-4xl">
                    test
                </p>
            </div>
            <div className={`${styles.subPage2} p-24`}>
                <p className="text-4xl">
                    test
                </p>
            </div>
            <div className={`${styles.subPage1} p-24`}>
                <p className="text-4xl">
                    test
                </p>
            </div>
            <div className={`${styles.subPage2} p-24`}>
                <p className="text-4xl">
                    test
                </p>
            </div>
        </div>
    );
}
