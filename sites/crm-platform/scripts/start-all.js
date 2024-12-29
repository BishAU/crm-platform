import { execSync } from 'child_process';
import { resolve } from 'path';

function executeCommand(command, options = {}) {
  try {
    console.log(`\n📋 Executing: ${command}`);
    const output = execSync(command, { 
      stdio: ['pipe', 'pipe', 'pipe'],
      encoding: 'utf-8',
      ...options
    });
    console.log('✅ Success');
    return output;
  } catch (error) {
    console.error('❌ Failed:', error.message);
    throw error;
  }
}

async function main() {
  try {
    console.log('\n🔍 Starting validation checks...');
    
    // 1. Validate environment variables
    console.log('\n📝 Validating environment variables...');
    executeCommand('node scripts/validate-env.js');

    // 2. Clean up ports
    console.log('\n🧹 Cleaning up ports...');
    executeCommand('bash /home/bish/Downloads/config/port-cleanup.sh prod');

    // 3. Stop all PM2 processes
    console.log('\n⏹️ Stopping all PM2 processes...');
    executeCommand('pm2 delete all || true');

    // 4. Reset PM2 state
    console.log('\n🔄 Resetting PM2 state...');
    executeCommand('pm2 save --force');

    // 5. Build all projects
    console.log('\n🏗️ Building projects...');
    
    const projects = [
      { name: 'CRM', path: '/home/bish/Downloads/crm-platform' },
      { name: 'VCC', path: '/home/bish/Downloads/vcc-platform' },
      { name: 'WWW', path: '/home/bish/Downloads/myinvoices-www' },
      { name: 'Skyhigh', path: '/home/bish/Downloads/skyhigh-platform/skyhighdeploy' },
      { name: 'Raffle', path: '/home/bish/Downloads/raffle-platform' },
      { name: 'Rockregister', path: '/home/bish/Downloads/rockregister-platform' },
      { name: 'Spraybooth', path: '/home/bish/Downloads/vcc-platform/spraybooth' }
    ];

    for (const project of projects) {
      console.log(`\n📦 Building ${project.name}...`);
      executeCommand('npm run build', { cwd: project.path });
    }

    // 6. Start all services
    console.log('\n🚀 Starting all services...');
    executeCommand('pm2 start /home/bish/Downloads/config/ecosystem.global.config.js');
    executeCommand('pm2 save');

    // 7. Wait for services to start
    console.log('\n⏳ Waiting for services to initialize...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 8. Verify services
    console.log('\n✅ Verifying services...');
    executeCommand('node scripts/verify-services.js');

    console.log('\n🎉 All services started successfully!');
    console.log('\nService URLs:');
    console.log('VCC Platform:        http://localhost:3000');
    console.log('CRM Platform:        http://localhost:4000');
    console.log('WWW Platform:        http://localhost:5000');
    console.log('Raffle Platform:     http://localhost:6000');
    console.log('Skyhigh Platform:    http://localhost:11000');
    console.log('Rockregister:        http://localhost:11003');
    console.log('Spraybooth:          http://localhost:11002');

  } catch (error) {
    console.error('\n❌ Startup failed:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);