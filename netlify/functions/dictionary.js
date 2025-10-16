// netlify/functions/dictionary.js
export async function handler(event) {
  const { word } = event.queryStringParameters;

  if (!word) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'word' query parameter" }),
    };
  }

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    if (!response.ok) {
      const text = await response.text();
      console.error("Dictionary API error:", text);
      return {
        statusCode: response.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: `Dictionary API returned ${response.status}` }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("Error fetching dictionary data:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Failed to fetch data" }),
    };
  }
}
