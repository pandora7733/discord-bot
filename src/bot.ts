import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { connectDB } from './database/index';
dotenv.config();

connectDB();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const dictionary: Record<string, string> = {
    '안녕': '안녕하세요',
    '이름': '제 이름은 카르티시아에요',
    '오늘의 이야기': 'https://youtube.com/shorts/FEPlBXV5-NE?si=U_xDPe1ixs-Ea8T-',
};

client.on('ready', () => {
    console.log(`🤖 Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const prefix = '카르띳띠 ';
    if (message.content.startsWith(prefix)) {
        const command = message.content.slice(prefix.length).trim();

        // 먼저 특별한 명령어 처리
        if (command === '내 이름은?') {
            // 별명이 있으면 사용, 없으면 기본 username 사용
            const nickname = message.member?.nickname || message.author.username;
            message.channel.send(`오랜만이에요 ${nickname}`);
            return;
        }

        // 일반 dictionary 응답
        const response = dictionary[command] || '잘 모르겠어요';
        message.channel.send(response);
    }
});

client.login(process.env.DISCORD_TOKEN);

//bot 실행