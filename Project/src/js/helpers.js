import { TIMEOUT_SECONDS } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (API_URL) {
  try {
    const response = await Promise.race([
      fetch(API_URL),
      timeout(TIMEOUT_SECONDS),
    ]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);
    return data;
  } catch (err) {
    throw err;
  }
};
