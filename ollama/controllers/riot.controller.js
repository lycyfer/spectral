import axios from "axios";

const RIOT_API_KEY = 'RGAPI-8e84dc08-f2f3-41fd-931e-9ba7399dffa3'

export const accountsByPuuid = async (req, res) => {

    const accessToken = 'RGAPI-8e84dc08-f2f3-41fd-931e-9ba7399dffa3'

    try {
        const response = await axios.get("https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/{puuid}")
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
}
export const accountsByGameNameTagLine = async (req, res) => {

    const accessToken = 'RGAPI-8e84dc08-f2f3-41fd-931e-9ba7399dffa3'

    try {
        const response = await axios.get("https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/ASPIRE/TOEND", {
            headers: {
                "X-Riot-Token": "RGAPI-e5fe82ee-0f6a-468c-a81f-814c78c5fae3"
            }
        });
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
}

export const matchList = async (req, res) => {

    try {
        const response = await axios.get(`https://europe.api.riotgames.com/val/match/console/v1/matchlists/by-puuid/${puuid}`, {
            headers: {
                "X-Riot-Token": "RGAPI-e5fe82ee-0f6a-468c-a81f-814c78c5fae3"
            }
        })
        res.json(response.data)

    } catch (err) {

    }

}
