import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    // We use "Constant Arrival Rate" so the server can't slow us down
    // This will keep firing even if the site starts lagging
    crush_scenario: {
      executor: 'constant-arrival-rate',
      rate: 150,             // 150 NEW requests every second
      timeUnit: '1s',
      duration: '3m',        // 3 minutes of maximum pressure
      preAllocatedVUs: 100,
      maxVUs: 500,
    },
  },
};

export default function () {
  const TARGET_URL = 'https://cavatzortzatos.gr/en/'; // <--- UPDATE THIS

  const params = {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) k6-crusher/1.0',
    },
    timeout: '120s', // Keep the connection open for up to 2 minutes
  };

  // 1. Stress the Database (Random Search)
  let searchRes = http.get(`${TARGET_URL}/?s=${Math.random().toString(36).substring(7)}`, params);
  check(searchRes, { 'Status 200': (r) => r.status === 200 });

  // 2. Stress the PHP Workers (Login Attempt)
  // We send a tiny bit of data but make the server process a POST request
  let loginRes = http.post(`${TARGET_URL}/wp-login.php`, { log: 'admin', pwd: 'wrong-password' }, params);
  
  sleep(Math.random() * 2); // Randomize timing to mimic real users
}