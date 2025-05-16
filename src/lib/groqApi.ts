export async function fetchGroqResponse(message: string, language: string): Promise<string> {
    const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, language }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch response from backend");
    }

    const data = await response.json();
    return data.reply || "Sorry, I couldn't process your request.";
} 