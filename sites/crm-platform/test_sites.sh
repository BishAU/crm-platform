#!/bin/bash

# Function to test a site and format output
test_site() {
    local site=$1
    local status=$(curl -s -o /dev/null -w "%{http_code}" http://$site)
    local response=$(curl -s -L http://$site | grep -o "<title>.*</title>" || echo "No title found")
    echo "$site|$status|$response"
}

# Test all sites
echo "Testing all sites..."
echo "Site|Status|Response"
echo "---|---|---"

test_site "crm.myinvoices.today"
test_site "vcc.myinvoices.today"
test_site "www.myinvoices.today"
test_site "myinvoices.today"
test_site "raffle.myinvoices.today"
