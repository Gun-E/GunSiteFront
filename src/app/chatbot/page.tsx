'use client';
import { useState } from 'react';
import axios from 'axios';

const IndexPage = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<string[]>([]);
    const [userId, setUserId] = useState('user1'); // 사용자 ID를 적절히 설정하거나 생성

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        // 사용자 메시지 추가
        setChatHistory([...chatHistory, `You: ${message}`]);

        try {
            // FastAPI 백엔드에 메시지 전송
            const response = await axios.post(`http://192.168.219.68:8000/chat/${userId}`, {
                message,
            });

            // 챗봇 응답 추가
            setChatHistory([...chatHistory, `You: ${message}`, `Chatbot: ${response.data.response}`]);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1>Chatbot</h1>
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll' }}>
                {chatHistory.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <div style={{ marginTop: '10px' }}>
        <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            style={{ width: '100%' }}
        />
                <button onClick={handleSendMessage} style={{ marginTop: '10px' }}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default IndexPage;
