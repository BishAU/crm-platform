# Dynamic Project Setup Tasks

## Current Status
- Multiple projects in `/home/bish/Downloads/sites/`
- Each project has its own environment configuration
- Need to move from hardcoded to dynamic setup

## Requirements
1. Dynamic Project Discovery
   - [x] Scan `/home/bish/Downloads/sites/*` directory
   - [ ] Read project configurations from .env files
   - [ ] Determine required ports and settings per project

2. Port Management
   - [ ] Dynamically allocate ports based on project requirements
   - [ ] Avoid port conflicts
   - [ ] Document port assignments

3. Nginx Configuration
   - [ ] Generate nginx configs dynamically
   - [ ] Set up proper routing for each project
   - [ ] Handle SSL configurations

4. PM2 Ecosystem
   - [ ] Generate PM2 ecosystem.config.js dynamically
   - [ ] Configure proper project names and paths
   - [ ] Set environment variables from .env files

## Implementation Plan
1. Create dynamic setup script that:
   - Reads project directories
   - Extracts configuration from .env files
   - Generates required configurations
   - Sets up nginx and PM2

2. Testing
   - Test script on each project type
   - Verify port assignments
   - Check nginx configurations
   - Validate PM2 setup
