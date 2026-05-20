import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { boardId: string } }) {
    try {
        const boardId = parseInt(params.boardId, 10);
        if (isNaN(boardId)) {
            return NextResponse.json({ error: '잘못된 게시글 ID입니다.' }, { status: 400 });
        }

        const db = await getDb();
        const board = await db.get(`
            SELECT b.id as boardId, b.title, b.content, b.category, u.name as username, b.created_at as date, b.userId
            FROM boards b
            JOIN users u ON b.userId = u.id
            WHERE b.id = ?
        `, [boardId]);

        if (!board) {
            return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });
        }

        return NextResponse.json(board, { status: 200 });
    } catch (error) {
        console.error('Fetch board error:', error);
        return NextResponse.json({ error: '서버 오류' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { boardId: string } }) {
    try {
        const boardId = parseInt(params.boardId, 10);
        if (isNaN(boardId)) {
            return NextResponse.json({ error: '잘못된 게시글 ID입니다.' }, { status: 400 });
        }

        const body = await req.json();
        const { title, content, category } = body;

        const db = await getDb();
        const result = await db.run(`
            UPDATE boards
            SET title = ?, content = ?, category = ?
            WHERE id = ?
        `, [title, content, category, boardId]);

        if (result.changes === 0) {
            return NextResponse.json({ error: '게시글을 찾을 수 없거나 수정되지 않았습니다.' }, { status: 404 });
        }

        return NextResponse.json({ message: '게시글이 수정되었습니다.' }, { status: 200 });
    } catch (error) {
        console.error('Update board error:', error);
        return NextResponse.json({ error: '서버 오류' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { boardId: string } }) {
    try {
        const boardId = parseInt(params.boardId, 10);
        if (isNaN(boardId)) {
            return NextResponse.json({ error: '잘못된 게시글 ID입니다.' }, { status: 400 });
        }

        const db = await getDb();
        const result = await db.run(`
            DELETE FROM boards
            WHERE id = ?
        `, [boardId]);

        if (result.changes === 0) {
            return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });
        }

        return NextResponse.json({ message: '게시글이 삭제되었습니다.' }, { status: 200 });
    } catch (error) {
        console.error('Delete board error:', error);
        return NextResponse.json({ error: '서버 오류' }, { status: 500 });
    }
}