#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to print in color
print_color() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Database configuration
DB_NAME="vcc_platform"
DB_USER="vcc_user"
DB_PASSWORD="vcc_password_here"

# Function to execute SQL
execute_sql() {
    local sql=$1
    local message=$2
    print_color $YELLOW "$message..."
    if echo "$sql" | sudo -u postgres psql 2>&1; then
        print_color $GREEN "✓ Success: $message"
        return 0
    else
        print_color $RED "✗ Failed: $message"
        return 1
    fi
}

# Function to execute SQL in specific database
execute_sql_in_db() {
    local sql=$1
    local message=$2
    print_color $YELLOW "$message..."
    if echo "$sql" | sudo -u postgres psql -d $DB_NAME 2>&1; then
        print_color $GREEN "✓ Success: $message"
        return 0
    else
        print_color $RED "✗ Failed: $message"
        return 1
    fi
}

# Main function
main() {
    print_color $YELLOW "Starting database setup..."
    echo "================================="

    # Drop and recreate database
    execute_sql "DROP DATABASE IF EXISTS $DB_NAME;" "Dropping existing database" || exit 1
    execute_sql "CREATE DATABASE $DB_NAME;" "Creating database" || exit 1

    # Update user password
    execute_sql "ALTER USER $DB_USER WITH PASSWORD '$DB_PASSWORD';" "Updating user password" || exit 1

    # Grant privileges
    execute_sql "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;" "Granting database privileges" || exit 1
    execute_sql_in_db "GRANT ALL ON SCHEMA public TO $DB_USER;" "Granting schema privileges" || exit 1

    # Create tables
    print_color $YELLOW "\nCreating database tables..."
    if sudo -u postgres psql -d $DB_NAME -c "$(cat /home/bish/Downloads/config/create-vcc-tables.sql)" 2>&1; then
        print_color $GREEN "✓ Tables created successfully"
    else
        print_color $RED "✗ Failed to create tables"
        exit 1
    fi

    # Grant table privileges
    execute_sql_in_db "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DB_USER;" "Granting table privileges" || exit 1
    execute_sql_in_db "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DB_USER;" "Granting sequence privileges" || exit 1

    # Update .env file with new database URL
    print_color $YELLOW "\nUpdating .env file..."
    sed -i "s|DATABASE_URL=.*|DATABASE_URL=\"postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME?schema=public\"|" /home/bish/Downloads/sites/vcc-platform/.env
    print_color $GREEN "✓ Updated .env file"

    # Generate Prisma client
    print_color $YELLOW "\nGenerating Prisma client..."
    cd /home/bish/Downloads/sites/vcc-platform && npx prisma generate
    print_color $GREEN "✓ Generated Prisma client"

    print_color $GREEN "\nDatabase setup completed successfully!"
    echo "================================="
}

# Run main function
main
