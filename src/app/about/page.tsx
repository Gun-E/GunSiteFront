import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.about_me}>
            <div className={styles.text_group}>
                <h1>About Me</h1>
                <div className={styles.child_text_group}>
                    <p>Name</p>
                    <p>강건 / Kang Geon</p>
                </div>
                <div className={styles.child_text_group}>
                    <p>Birth</p>
                    <p>1999. 04. 19</p>
                </div>
            </div>

            <div className={styles.text_group}>
                <h1>Skills</h1>
                <div className={`${styles.child_text_group} ${styles.java}`}>
                    <p>JAVA</p>
                    <div className={styles.rectangle_group}>
                        <div className={styles.rectangle}></div>
                    </div>
                </div>
                <div className={`${styles.child_text_group} ${styles.js}`}>
                    <p>JavaScript</p>
                    <div className={styles.rectangle_group}>
                        <div className={styles.rectangle}></div>
                    </div>
                </div>
                <div className={`${styles.child_text_group} ${styles.python}`}>
                    <p>Python</p>
                    <div className={styles.rectangle_group}>
                        <div className={styles.rectangle}></div>
                    </div>
                </div>
                <div className={`${styles.child_text_group} ${styles.html}`}>
                    <p>HTML</p>
                    <div className={styles.rectangle_group}>
                        <div className={styles.rectangle}></div>
                    </div>
                </div>
                <div className={`${styles.child_text_group} ${styles.database}`}>
                    <p>SQL / DB</p>
                    <div className={styles.rectangle_group}>
                        <div className={styles.rectangle}></div>
                    </div>
                </div>
                <div className={`${styles.child_text_group} ${styles.cloud}`}>
                    <p>AWS / Cloud</p>
                    <div className={styles.rectangle_group}>
                        <div className={styles.rectangle}></div>
                    </div>
                </div>
                <div className={`${styles.child_text_group} ${styles.ai}`}>
                    <p>AI</p>
                    <div className={styles.rectangle_group}>
                        <div className={styles.rectangle}></div>
                    </div>
                </div>
            </div>

            <div className={styles.text_group}>
                <h1>Education</h1>
                <div className={styles.child_text_group}>
                    <p>2024.12</p>
                    <p>LG전자 DX School 1기 수료</p>
                </div>
                <div className={styles.child_text_group}>
                    <p>2024.02</p>
                    <p>NHN Academy Java Back-End 과정 4기 수료</p>
                </div>
                <div className={styles.child_text_group}>
                    <p>2024.02</p>
                    <p>조선대학교 컴퓨터 공학과 졸업</p>
                </div>
            </div>

            <div className={styles.text_group}>
                <h1>Licence</h1>
                <div className={styles.child_text_group}>
                    <p>2023.06.09</p>
                    <p>정보처리기사</p>
                </div>
                <div className={styles.child_text_group}>
                    <p>2024.09.20</p>
                    <p>SQL Developer</p>
                </div>
            </div>


            <div className={styles.text_group}>
                <h1>Career</h1>
                <div className={styles.child_text_group}>
                    <p>2024.12</p>
                    <p>LG전자 DX School 1기 우수 수료생</p>
                </div>
                <div className={styles.child_text_group}>
                    <p>2024.12</p>
                    <p>LG전자 DX School 데이터 비지니스 DX 프로젝트 우수상</p>
                </div>
                <div className={styles.child_text_group}>
                    <p>2024.11</p>
                    <p>한국언론진흥재단 주최 2024 뉴스 빅데이터 해커톤 최우수상</p>
                </div>
                <div className={styles.child_text_group}>
                    <p>2024.09</p>
                    <p>LG전자 DX School 고객경험향상 CX 프로젝트 최우수상</p>
                </div>
                <div className={styles.child_text_group}>
                    <p>2024.06</p>
                    <p>Y-mart 순천점 홈페이지 구축 외주</p>
                </div>
            </div>
        </div>
    );
}
