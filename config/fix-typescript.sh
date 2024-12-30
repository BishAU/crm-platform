#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Starting TypeScript fixes...${NC}"

# Fix missing dependencies
echo -e "${YELLOW}Installing missing dependencies...${NC}"
cd /home/bish/Downloads/sites/vcc-platform && npm install --save-dev @types/testing-library__react @types/jest
cd /home/bish/Downloads/sites/crm-platform && npm install --save-dev @types/testing-library__react @types/jest
cd /home/bish/Downloads/sites/skyhigh-platform && npm install --save-dev @types/testing-library__react @types/jest
cd /home/bish/Downloads/sites/kuma-platform && npm install --save-dev @types/testing-library__react @types/jest

# Fix recharts type issues
echo -e "${YELLOW}Installing recharts types...${NC}"
npm install --save-dev @types/recharts

# Fix missing modules
echo -e "${YELLOW}Installing missing modules...${NC}"
npm install --save micro openid-client react-query @stripe/stripe-js

# Update tsconfig.json to handle type issues
echo -e "${YELLOW}Updating TypeScript configuration...${NC}"
cat > tsconfig.json << EOL
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOL

echo -e "${GREEN}TypeScript fixes completed${NC}"