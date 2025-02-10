export async function sendMsgToOpenAI(message) {
    try {
        const response = await fetch("https://alokgpt.onrender.com/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "provider-3/gpt-4o-mini",
                messages: [{ role: "user", content: message }]
            })
        }); 

        if (!response.ok) {
            throw new Error(`API a Error: ${response.statusText}`);
        }

        const resData = await response.json();
        return resData.choices[0].message.content;
    } catch (error) {
        console.error("Error during text completion:", error);
        return "Error fetching response.";
    }
}
