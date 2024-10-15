import { FaJava, FaHtml5, FaPython, FaNodeJs, FaDatabase, FaReact, FaCloud, FaRobot } from "react-icons/fa";

export default function Home() {
    const categories = [
        { name: "자유 게시판", description: "자유롭게 의견을 나누는 공간입니다.", icon: <FaJava className="text-4xl" /> },
        { name: "JAVA / SPRING", description: "Java와 Spring 관련 자료와 질문을 공유합니다.", icon: <FaJava className="text-4xl" /> },
        { name: "HTML / CSS", description: "웹 디자인과 관련된 이야기들을 나눕니다.", icon: <FaHtml5 className="text-4xl" /> },
        { name: "PYTHON / FAST API", description: "Python과 FastAPI에 대한 정보와 질문을 다룹니다.", icon: <FaPython className="text-4xl" /> },
        { name: "JAVASCRIPT / NODE.JS", description: "JavaScript와 Node.js에 관한 모든 내용을 다룹니다.", icon: <FaNodeJs className="text-4xl" /> },
        { name: "DATABASE / SQL", description: "데이터베이스 및 SQL 관련 질문과 자료를 공유합니다.", icon: <FaDatabase className="text-4xl" /> },
        { name: "REACT / NEXT.JS", description: "React와 Next.js에 대한 모든 것을 논의합니다.", icon: <FaReact className="text-4xl" /> },
        { name: "DATA ANALYSIS", description: "데이터 분석과 관련된 정보와 팁을 공유합니다.", icon: <FaRobot className="text-4xl" /> },
        { name: "CLOUD", description: "클라우드 컴퓨팅과 관련된 이야기들을 나눕니다.", icon: <FaCloud className="text-4xl" /> },
        { name: "AI", description: "인공지능에 대한 정보와 경험을 공유합니다.", icon: <FaRobot className="text-4xl" /> }
    ];

    return (
        <main className="flex min-h-screen p-6 bg-gray-100">
            <div className="flex flex-col w-full max-w-2xl mx-auto">
                <div className="flex flex-col space-y-4">
                    {categories.map((category, index) => (
                        <div key={index} className="flex items-start justify-between border rounded-lg p-4 bg-blue-500 text-white hover:bg-blue-600 transition duration-200">
                            <div className="flex items-center">
                                <span className="mr-4">{category.icon}</span>
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold">{category.name}</span>
                                    <span className="text-sm">{category.description}</span>
                                </div>
                            </div>
                            <button className="ml-4 px-3 py-1 bg-white text-blue-500 rounded-lg hover:bg-gray-200 transition duration-200">
                                이동
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
