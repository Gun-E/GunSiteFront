import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name, phone } = body;

        if (!email || !password || !name || !phone) {
            return NextResponse.json({ error: '모든 필드를 입력해주세요.' }, { status: 400 });
        }

        const db = await getDb();
        const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [email]);

        if (existingUser) {
            return NextResponse.json({ error: '이미 사용 중인 이메일입니다.' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.run(
            'INSERT INTO users (email, password, name, phone) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, name, phone]
        );

        return NextResponse.json({ message: '회원가입 성공' }, { status: 201 });
    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json({ error: '서버 오류' }, { status: 500 });
    }
}
