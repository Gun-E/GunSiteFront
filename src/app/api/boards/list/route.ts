import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

const PAGE_SIZE = 10;

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category') || 'free';
        const pageStr = searchParams.get('page');
        const page = pageStr ? parseInt(pageStr, 10) : 0;

        const db = await getDb();
        
        const countResult = await db.get(
            'SELECT COUNT(*) as count FROM boards WHERE category = ?', 
            [category]
        );
        const totalItems = countResult.count;
        const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;

        const offset = page * PAGE_SIZE;

        const boards = await db.all(`
            SELECT b.id as boardId, b.title, u.name as username, b.created_at as date 
            FROM boards b 
            JOIN users u ON b.userId = u.id
            WHERE b.category = ?
            ORDER BY b.created_at DESC
            LIMIT ? OFFSET ?
        `, [category, PAGE_SIZE, offset]);

        return NextResponse.json({
            boards,
            totalPages
        }, { status: 200 });

    } catch (error) {
        console.error('Fetch boards list error:', error);
        return NextResponse.json({ error: '서버 오류' }, { status: 500 });
    }
}
