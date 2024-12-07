exports.handler = async (event, context) => {
  const url = event.path.substring(12); // обрезаем "/urlдляproxy"
  
  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'URL is required' }),
    };
  }

  try {
    const response = await fetch(url);
    const data = await response.text();

    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*', // Разрешаем CORS
        'Content-Type': response.headers.get('content-type'),
      },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching the URL' }),
    };
  }
};
