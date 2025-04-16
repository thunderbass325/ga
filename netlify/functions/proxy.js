const fetch = require('node-fetch');

exports.handler = async (event) => {
  const apiKey = event.headers['authorization'];
  const body = JSON.parse(event.body);

  try {
    const response = await fetch('https://degens.gaia.domains/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch', message: error.message })
    };
  }
};
