import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const limitStr = searchParams.get('limit');
        const limit = limitStr ? parseInt(limitStr, 10) : 10;

        const db = await getDb();
        
        let query = `
            SELECT b.id as boardId, b.title, u.name as username, b.created_at as date 
            FROM boards b 
            JOIN users u ON b.userId = u.id
        `;
        const queryParams: any[] = [];

        if (category) {
            query += ` WHERE b.category = ?`;
            queryParams.push(category);
        }

        query += ` ORDER BY b.created_at DESC LIMIT ?`;
        queryParams.push(limit);

        const boards = await db.all(query, queryParams);

        return NextResponse.json(boards, { status: 200 });
    } catch (error) {
        console.error('Fetch boards error:', error);
        return NextResponse.json({ error: '서버 오류' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, content, category, userId } = body;

        if (!title || !content || !userId) {
            return NextResponse.json({ error: '필수 항목이 누락되었습니다.' }, { status: 400 });
        }

        const db = await getDb();
        
        const result = await db.run(
            'INSERT INTO boards (title, content, category, userId) VALUES (?, ?, ?, ?)',
            [title, content, category || 'free', userId]
        );

        return NextResponse.json({ message: '게시글이 작성되었습니다.', boardId: result.lastID }, { status: 200 });
    } catch (error) {
        console.error('Create board error:', error);
        return NextResponse.json({ error: '서버 오류' }, { status: 500 });
    }
}
