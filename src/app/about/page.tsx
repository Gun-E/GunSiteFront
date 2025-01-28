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
                    <p>2023.06</p>
                    <p>정보처리기사</p>
                </div>
                <div className={styles.child_text_group}>
                    <p>2024.09</p>
                    <p>SQLD</p>
                </div>
            </div>


            {/*<div className={styles._01049381562}>010-4938-1562</div>*/}
            {/*<div className={styles.rkdrjs71NaverCom}>rkdrjs71@naver.com</div>*/}

            <div className={styles.text_group}>
                <h1>Skills</h1>
                <div className={`${styles.child_text_group} ${styles.java}`}>
                    <p>JAVA</p>
                    <div className={styles.rectangle_group}>
                        <div className={styles.rectangle}></div>
                    </div>
                </div>
                <div className={`${styles.child_text_group} ${styles.database}`}>
                    <p>Database</p>
                    <div className={styles.rectangle_group}>
                        <div className={styles.rectangle}></div>
                    </div>
                </div>
                <div className={`${styles.child_text_group} ${styles.js}`}>
                    <p>JS</p>
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
                <div className={`${styles.child_text_group} ${styles.python}`}>
                    <p>Python</p>
                    <div className={styles.rectangle_group}>
                        <div className={styles.rectangle}></div>
                    </div>
                </div>
                <div className={`${styles.child_text_group} ${styles.cloud}`}>
                    <p>Cloud</p>
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

            {/*<div className={styles.div3}>*/}
            {/*    <span>*/}
            {/*        <span className={styles.div3Span}>*/}
            {/*            성실하고 열정적인*/}
            {/*            <br />*/}
            {/*        </span>*/}
            {/*        <span className={styles.div3Span2}>웹 개발자 강건</span>*/}
            {/*    </span>*/}
            {/*</div>*/}
            {/*<img className={styles._3Ca5970Fc1} src="_3-ca-5970-fc-10.png" alt="Portfolio" />*/}
            {/*<div className={styles.rectangle6}></div>*/}
            {/*<div className={styles.div4}>소개</div>*/}
        </div>
    );
}
