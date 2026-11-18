import express from 'express';
import { createClient } from 'redis';
import pg from "pg"


const app = express();

const redis = createClient({
    url: 'redis://127.0.0.1:6379'
});

redis.on('error', (err) => {
    console.log('Redis error:', err);
});

await redis.connect();


app.get('/redis', async (req, res) => {
    const reply = await redis.ping();
    res.json({
        redis: reply
    })
})

app.get('/pg', async (req, res) => {
    const url = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres';
    if (pg.Connection.readystate === 0) {
        await pg.connect(url);
    }

    res.json({
        pg: "connected",
        database: pg.connection.name
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});