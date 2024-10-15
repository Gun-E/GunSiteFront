import Link from 'next/link';
import {
    FaRegClipboard,
    FaJava,
    FaHtml5,
    FaPython,
    FaNodeJs,
    FaDatabase,
    FaReact,
    FaRegChartBar,
    FaCloud,
    FaRobot
} from "react-icons/fa";

export default function Home() {
    const categories = [
        { name: "자유 게시판", description: "자유롭게 의견을 나누는 공간입니다.", icon: <FaRegClipboard className="text-6xl sm:text-8xl"/> , path: "/free-board"},
        { name: "JAVA / SPRING", description: "Java와 Spring 관련 자료와 질문을 공유합니다.", icon: <FaJava className="text-6xl sm:text-8xl"/>, path: "/java-spring"},
        { name: "HTML / CSS", description: "웹 디자인과 관련된 이야기들을 나눕니다.", icon: <FaHtml5 className="text-6xl sm:text-8xl"/>, path: "/html-css"},
        {
            name: "PYTHON / FAST API",
            description: "Python과 FastAPI에 대한 정보와 질문을 다룹니다.",
            icon: <FaPython className="text-6xl sm:text-8xl"/>, path: "/python-fastapi"
        },
        {
            name: "JAVASCRIPT / NODE.JS",
            description: "JavaScript와 Node.js에 관한 모든 내용을 다룹니다.",
            icon: <FaNodeJs className="text-6xl sm:text-8xl"/>, path: "/javascript-nodejs"
        },
        {
            name: "DATABASE / SQL",
            description: "데이터베이스 및 SQL 관련 질문과 자료를 공유합니다.",
            icon: <FaDatabase className="text-6xl sm:text-8xl"/>, path: "/database-sql"
        },
        {
            name: "REACT / NEXT.JS",
            description: "React와 Next.js에 대한 모든 것을 논의합니다.",
            icon: <FaReact className="text-6xl sm:text-8xl"/>, path: "/react-next"
        },
        { name: "DATA ANALYSIS", description: "데이터 분석과 관련된 정보와 팁을 공유합니다.", icon: <FaRegChartBar className="text-6xl sm:text-8xl"/>, path: "/data-analysis"},
        { name: "CLOUD", description: "클라우드 컴퓨팅과 관련된 이야기들을 나눕니다.", icon: <FaCloud className="text-6xl sm:text-8xl"/>, path: "/cloud"},
        { name: "AI", description: "인공지능에 대한 정보와 경험을 공유합니다.", icon: <FaRobot className="text-6xl sm:text-8xl"/>, path: "/ai"}
    ];

    return (
        <main className="flex min-h-screen p-4 sm:p-8 bg-white overflow-hidden">
            <div className="flex flex-col w-full max-w-5xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                    {categories.map((category, index) => (
                        <div key={index}
                             className="flex items-center rounded-xl bg-white transition-shadow duration-300 p-4 sm:p-6 overflow-hidden">
                            <div className="my-blue">{category.icon}</div>
                            <div className="ml-5 flex-1">
                                <p className="text-lg sm:text-2xl font-bold text-gray-800">{category.name}</p>
                                <p className="text-sm sm:text-md text-gray-600 mt-1">{category.description}</p>
                                <div className="mt-2">
                                    <Link href={category.path}
                                          className="px-4 py-1 bg-brown text-white font-semibold rounded-full  duration-300">
                                        이동
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
