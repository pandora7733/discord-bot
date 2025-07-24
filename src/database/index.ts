import { Client } from 'pg';

// PostgreSQL 연결 설정
const client = new Client({
  user: 'parksihoo',        // DB 사용자명
  host: '127.0.0.1',       // DB 호스트
  database: 'CartethyiaBot',      // DB 이름
  password: 'Iegon@p2084', // DB 비밀번호
  port: 5432,              // 포트 번호
});

// DB 연결 함수
export async function connectDB(): Promise<Client> {
  try {
    await client.connect();
    console.log('DB 연결 성공');
    return client;
  } catch (err) {
    console.error('DB 연결 오류:', err);
    throw err;
  }
}