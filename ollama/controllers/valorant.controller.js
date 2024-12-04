import axios from "axios";
import ollama from 'ollama'

export const getAgents = async (req, res) => {
    try {
        const response = await axios.get('https://valorant-api.com/v1/agents');

        const ollamaArray = response.data.data;
        const message = {
            role: 'user',
            content: `Вот массив объектов в формате JSON: ${JSON.stringify(ollamaArray)}. выведи количество персонажей и их имена списком и больше ничего, а так же их characterTags. Почему ты выводишь только двух персонажей? Их 30`
        };

        const ollamaRes = await ollama.chat({ model: 'gemma2:27b', messages: [message], stream: true });
        for await (const part of ollamaRes) {
            process.stdout.write(part.message.content);
        }

        res.json(response.data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
};