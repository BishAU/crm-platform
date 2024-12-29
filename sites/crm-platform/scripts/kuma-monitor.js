import fetch from 'node-fetch';

const MONITOR_URL = process.env.MONITOR_URL || 'http://localhost:3100';
const CHECK_INTERVAL = process.env.CHECK_INTERVAL || 60000; // 1 minute

async function checkHealth() {
    try {
        const response = await fetch(`${MONITOR_URL}/api/health`);
        if (!response.ok) {
            console.error(`Health check failed: ${response.status} ${response.statusText}`);
        } else {
            console.log('Health check passed');
        }
    } catch (error) {
        console.error('Health check error:', error.message);
    }
}

// Initial check
checkHealth();

// Schedule regular checks
setInterval(checkHealth, CHECK_INTERVAL);

console.log(`Health monitoring started for ${MONITOR_URL}`);
