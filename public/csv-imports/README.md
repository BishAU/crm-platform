# CSV Import Templates

This directory contains CSV templates for importing data into the CRM platform. Each template includes the required headers based on the database schema.

## Available Templates

1. `people-template.csv` - Template for importing people/customer data
2. `outfalls-template.csv` - Template for importing outfall data
3. `water-authorities-template.csv` - Template for importing water authority data
4. `indigenous-communities-template.csv` - Template for importing indigenous community data
5. `politicians-template.csv` - Template for importing politician data
6. `observations-template.csv` - Template for importing observation data
7. `facilities-template.csv` - Template for importing facility data

## Notes

- Headers represent the database fields for each model
- Empty fields are allowed for optional data
- Dates should be in ISO format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.sssZ)
- Boolean fields should be 'true' or 'false'
- For fields that accept multiple values (like media_images), use comma-separated values
- IDs (like waterAuthorityId, indigenousCommunityId) should reference existing records

Note: Outfall Types are managed as a field within the Outfalls model rather than as a separate entity.