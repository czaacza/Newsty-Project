import { TIMEOUT_SECONDS } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (searchItem) {
  try {
    const response = await Promise.race([
      fetch(
        `https://newsapi.org/v2/everything?q=${searchItem}&language=en&from=2022-07-27&sortBy=popularity&apiKey=dc297ae8299e47b7b6f153d8f0dd2d73`
      ),
      timeout(TIMEOUT_SECONDS),
    ]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);
    return data;
  } catch (err) {
    throw err;
  }
};
