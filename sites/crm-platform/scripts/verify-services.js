const http = require('http');

const services = [
  { name: 'VCC Platform', url: 'http://localhost:3000', expectedStatus: 200 },
  { name: 'CRM Platform', url: 'http://localhost:4000/api/health', expectedStatus: 200 },
  { name: 'WWW Platform', url: 'http://localhost:5000', expectedStatus: 200 },
  { name: 'Raffle Platform', url: 'http://localhost:6001', expectedStatus: 200 },
  { name: 'Skyhigh Platform', url: 'http://localhost:11000', expectedStatus: 200 },
  { name: 'Rockregister Platform', url: 'http://localhost:11003', expectedStatus: 200 },
  { name: 'Spraybooth', url: 'http://localhost:11002', expectedStatus: 200 },
];

async function checkService(service) {
  return new Promise((resolve) => {
    http.get(service.url, (res) => {
      const { statusCode } = res;
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const status = statusCode === service.expectedStatus ? 'UP' : 'DOWN';
        resolve({
          name: service.name,
          url: service.url,
          status,
          statusCode,
          response: status === 'UP' ? data.slice(0, 100) + '...' : null,
        });
      });
    }).on('error', (err) => {
      resolve({
        name: service.name,
        url: service.url,
        status: 'DOWN',
        error: err.message,
      });
    });
  });
}

async function main() {
  console.log('Checking services...\n');

  const results = await Promise.all(services.map(checkService));

  results.forEach((result) => {
    console.log(`${result.name}:`);
    console.log(`  URL: ${result.url}`);
    console.log(`  Status: ${result.status}`);
    if (result.statusCode) {
      console.log(`  Status Code: ${result.statusCode}`);
    }
    if (result.error) {
      console.log(`  Error: ${result.error}`);
    }
    if (result.response) {
      console.log(`  Response: ${result.response}`);
    }
    console.log('');
  });

  const allUp = results.every((r) => r.status === 'UP');
  if (!allUp) {
    console.error('Some services are down!');
    process.exit(1);
  }

  console.log('All services are up and running!');
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
