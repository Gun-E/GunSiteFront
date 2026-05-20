import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ error: '이메일을 입력해주세요.' }, { status: 400 });
        }

        const db = await getDb();
        const user = await db.get('SELECT id FROM users WHERE email = ?', [email]);

        // If user exists, return true (duplicate). Else false.
        return NextResponse.json(!!user, { status: 200 });
    } catch (error) {
        console.error('Email check error:', error);
        return NextResponse.json({ error: '서버 오류' }, { status: 500 });
    }
}
