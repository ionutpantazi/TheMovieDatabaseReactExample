const fetch = require('node-fetch');

async function asyncCall() {
  let key = '6953e1931b6994157197955210678c4a'
  const result = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=35`
  );
	if (!result.ok) {
    throw new Error(result.statusText);
  }
  return await result.json();
}

module.exports = {
  asyncCall,
};