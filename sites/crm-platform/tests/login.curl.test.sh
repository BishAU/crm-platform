#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="http://localhost:3101"

echo "Starting Login API Tests..."

# Test 1: Login with valid credentials
echo -e "\nTest 1: Login with valid credentials"
response=$(curl -s -L \
  -c cookies.txt \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"pbishop@cleanocean.org\",\"password\":\"b15h0p\",\"json\":true, \"callbackUrl\":\"/dashboard\"}" \
  "${BASE_URL}/api/auth/signin/credentials")

if echo "$response" | grep -q "callbackUrl"; then
  echo -e "${GREEN}✓ Login successful${NC}"
  
  # Follow the redirect
  redirect_url=$(echo "$response" | grep -o '"url":"[^"]*' | cut -d'"' -f4)
  response=$(curl -s -L -b cookies.txt "${redirect_url}")

  # Test 2: Access protected route
  echo -e "\nTest 2: Access protected route"
  response=$(curl -s \
    -b cookies.txt \
    "${BASE_URL}/api/auth/session")

  if echo "$response" | grep -q "user"; then
    echo -e "${GREEN}✓ Protected route access successful${NC}"
  else
    echo -e "${RED}✗ Protected route access failed${NC}"
    echo "Response: $response"
  fi
else
  echo -e "${RED}✗ Login failed${NC}"
  echo "Response: $response"
fi

# Test 3: Invalid credentials
echo -e "\nTest 3: Invalid credentials"
response=$(curl -s -L \
  -c cookies.txt \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"wrong@example.com\",\"password\":\"wrongpass\",\"json\":true, \"callbackUrl\":\"/dashboard\"}" \
  "${BASE_URL}/api/auth/signin/credentials")

if echo "$response" | grep -q "error"; then
  echo -e "${GREEN}✓ Invalid credentials test passed${NC}"
else
  echo -e "${RED}✗ Invalid credentials test failed${NC}"
  echo "Response: $response"
fi

# Test 4: Missing credentials
echo -e "\nTest 4: Missing credentials"
response=$(curl -s -L \
  -c cookies.txt \
  -H "Content-Type: application/json" \
  -d "{\"json\":true, \"callbackUrl\":\"/dashboard\"}" \
  "${BASE_URL}/api/auth/signin/credentials")

if echo "$response" | grep -q "error"; then
  echo -e "${GREEN}✓ Missing credentials test passed${NC}"
else
  echo -e "${RED}✗ Missing credentials test failed${NC}"
  echo "Response: $response"
fi

# Cleanup
rm -f cookies.txt

echo -e "\nLogin API Tests Complete"