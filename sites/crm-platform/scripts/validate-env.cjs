const fs = require('fs');
const path = require('path');

const requiredEnvVars = {
  crm: [
    'NODE_ENV',
    'PORT',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'JWT_SECRET',
    'DATABASE_URL',
    'NEXT_PUBLIC_API_URL'
  ],
  vcc: [
    'NODE_ENV',
    'PORT'
  ],
  www: [
    'NODE_ENV',
    'PORT'
  ],
  skyhigh: [
    'NODE_ENV',
    'PORT'
  ],
  raffle: [
    'NODE_ENV',
    'PORT'
  ],
  rockregister: [
    'NODE_ENV',
    'PORT'
  ],
  spraiybooth: [
    'NODE_ENV',
    'PORT'
  ]
};

function validateEnvFile(platform, envPath) {
  console.log(`\nValidating ${platform} environment variables...`);
  
  if (!fs.existsSync(envPath)) {
    console.error(`❌ .env file not found at ${envPath}`);
    return false;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      envVars[match[1].trim()] = match[2].trim();
    }
  });

  let isValid = true;
  const required = requiredEnvVars[platform];

  required.forEach(varName => {
    if (!envVars[varName]) {
      console.error(`❌ Missing required environment variable: ${varName}`);
      isValid = false;
    } else {
      console.log(`✓ Found ${varName}`);
    }
  });

  // Additional validation for specific variables
  if (platform === 'crm') {
    if (envVars['NEXTAUTH_URL'] && !envVars['NEXTAUTH_URL'].startsWith('http')) {
      console.error('❌ NEXTAUTH_URL must start with http:// or https://');
      isValid = false;
    }
    if (envVars['NEXTAUTH_SECRET'] && envVars['NEXTAUTH_SECRET'].length < 32) {
      console.error('❌ NEXTAUTH_SECRET should be at least 32 characters long');
      isValid = false;
    }
  }

  // Validate PORT matches assigned port number
  const portMap = {
    vcc: 3000,
    crm: 4000,
    www: 5000,
    raffle: 6000,
    skyhigh: 11000,
    rockregister: 11003,
    spraiybooth: 11002
  };

  if (envVars['PORT'] && parseInt(envVars['PORT']) !== portMap[platform]) {
    console.error(`❌ PORT should be ${portMap[platform]} for ${platform}`);
    isValid = false;
  }

  return isValid;
}

function main() {
  const baseDir = '/home/bish/Downloads';
  const platforms = {
    crm: `${baseDir}/crm-platform/.env`,
    vcc: `${baseDir}/vcc-platform/.env`,
    www: `${baseDir}/myinvoices-www/.env`,
    skyhigh: `${baseDir}/skyhigh-platform/skyhighdeploy/.env`,
    raffle: `${baseDir}/raffle-platform/.env`,
    rockregister: `${baseDir}/rockregister-platform/.env`,
    spraiybooth: `${baseDir}/vcc-platform/spraybooth/.env`
  };

  let allValid = true;

  Object.entries(platforms).forEach(([platform, envPath]) => {
    const isValid = validateEnvFile(platform, envPath);
    if (!isValid) {
      allValid = false;
      console.error(`\n❌ Validation failed for ${platform}`);
    } else {
      console.log(`\n✓ All environment variables valid for ${platform}`);
    }
  });

  if (!allValid) {
    console.error('\n❌ Environment validation failed');
    process.exit(1);
  }

  console.log('\n✓ All environment variables are valid');
}

main();
