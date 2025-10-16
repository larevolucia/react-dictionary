const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1500;

// Simple delay helper
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.handler = async (event) => {
  const { word } = event.queryStringParameters;

  if (!word) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'word' query parameter" }),
    };
  }

  const dictionaryApiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(dictionaryApiUrl, { timeout: 10000 });

      // Sometimes Cloudflare returns HTML error pages even with 200 status
      const text = await response.text();

      if (!response.ok || text.trim().startsWith("<!DOCTYPE")) {
        throw new Error(
          `Bad response (${response.status}) or HTML error page from dictionary API`
        );
      }

      const data = JSON.parse(text);

      // ✅ Success
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
    } catch (err) {
      lastError = err;
      console.warn(
        `Attempt ${attempt} failed: ${err.message}. Retrying in ${RETRY_DELAY_MS}ms...`
      );
      await delay(RETRY_DELAY_MS);
    }
  }

  console.error("Dictionary API unavailable:", lastError?.message);

  // 🧩 Fallback response (friendly to user)
  return {
    statusCode: 503,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({
      error:
        "The dictionary service is temporarily unavailable. Please try again later.",
      details: lastError?.message,
    }),
  };
};
