const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); 

const API_KEY = "Free-For-YT-Subscribers-@DevsDoCode-WatchFullVideo";
const BASE_URL = "https://api.ddc.xiolabs.xyz/v1/chat/completions";

app.post("/api/chat", async (req, res) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Proxy Server Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => console.log(`✅ Proxy server running on port ${PORT}`));
