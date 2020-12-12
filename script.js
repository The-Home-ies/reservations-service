import http from 'k6/http';
import { check, sleep } from 'k6';

const getRandomNum = () => Math.floor(Math.random() * 1000000 + 1);

export const options = {
  stages: [
    { duration: '1m', target: 1000 },
    { duration: '1m', target: 1000 },
    { duration: '45s', target: 1500 },
    { duration: '1m', target: 1500 },
    { duration: '45s', target: 0 },
  ],
  thresholds: {
    errors: ['rate < 0.1'],
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
  },
  ext: {
    loadimpact: {
      distribution: {
        'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 },
      },
    },
  },
};

export default function () {
  const res = http.get(`http://localhost:3002/${getRandomNum()}`, { timeout: 180000 });
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
