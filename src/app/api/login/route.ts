import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id, password } = body;

        if (!id || !password) {
            return new NextResponse('아이디와 비밀번호를 입력해주세요.', { status: 400 });
        }

        const db = await getDb();
        const user = await db.get('SELECT * FROM users WHERE email = ?', [id]);

        if (!user) {
            return new NextResponse('가입되지 않은 이메일이거나, 비밀번호가 틀렸습니다.', { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return new NextResponse('가입되지 않은 이메일이거나, 비밀번호가 틀렸습니다.', { status: 401 });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        return new NextResponse(token, { status: 200 });
    } catch (error) {
        console.error('Login error:', error);
        return new NextResponse('서버 오류', { status: 500 });
    }
}
