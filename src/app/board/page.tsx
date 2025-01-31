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
import BoardComponent from "@/components/BoardComponent";
import Viewpager from "@/components/Viewpager";

export default function Home() {
    const categories = [
        {
            name: "자유 게시판",
            description: "자유롭게 의견을 나누는 공간입니다.",
            icon: <FaRegClipboard className="text-6xl sm:text-8xl"/>,
            path: "/free-board"
        },
        {
            name: "코딩 게시판",
            description: "웹 개발 및 CS 지식을 공유합니다.",
            icon: <FaJava className="text-6xl sm:text-8xl"/>,
            path: "/java-spring"
        }
    ];

    return (
        <><BoardComponent/>
            <main className="flex min-h-screen px-10 py-14 bg-white overflow-hidden">
                <div className="flex flex-col w-full max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                        {categories.map((category, index) => (
                            <div key={index}
                                 className="flex items-center rounded-3xl bg-gradient-to-l from-slate-50 from-5% via-white via-60% to-sky-50 to-95%% transition-shadow duration-300 p-4 sm:p-6 overflow-hidden">
                                <div className="my-blue w-20 h-20 flex items-center justify-center">{category.icon}</div>
                                <div className="ml-5 flex-1">
                                    <p className="text-lg sm:text-2xl font-bold text-gray-800">{category.name}</p>
                                    <p className="text-sm sm:text-md text-gray-600 mt-1">{category.description}</p>
                                    <div className="mt-3.5">
                                        <Link href={category.path}
                                              className="px-4 py-1 bg-button text-white font-semibold rounded-full  duration-300">
                                            이동
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
