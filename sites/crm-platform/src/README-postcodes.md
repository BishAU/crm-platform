# Outfall Postcode Queries

This directory contains scripts for managing and querying outfall data by postcode radius.

## Scripts

### extract-postcodes.js
Extracts and analyzes postcode data from CSV files to understand the data format and coverage.

### update-outfall-postcodes.js
Updates outfall records with postcode data from CSV files, storing the information in both:
- Description field for text search
- Dedicated postcode columns for structured queries

### query-outfalls-by-postcode.js
Queries outfalls by postcode and radius, providing:
- List of outfalls within specified radius of a postcode
- All postcodes within that radius of any outfall
- Water authorities managing outfalls in that area

## Usage

### Query outfalls by postcode
```bash
# Search within 25km radius (default)
node src/query-outfalls-by-postcode.js 2000

# Search within 50km radius
node src/query-outfalls-by-postcode.js 2000 50
```

### Example Output
```
Outfalls within 25km of postcode 2000:
- Bondi (Ocean outfall, Active)
- Malabar (Ocean outfall, Active)
- Vaucluse (Ocean outfall, Active)
...

All postcodes within 25km of any outfall:
2000, 2010, 2011, 2020, 2026, 2031, 2036, 2088, 2095, 2099...

Water authorities managing outfalls:
Sydney Water: 8 outfalls
Local Government: 12 outfalls
```

## Data Structure

Postcode data is stored in two formats:

1. Description field:
```
Postcodes (25km): 2000, 2010, 2011 | Postcodes (50km): 2000, 2026, 2500
```

2. Dedicated columns:
- postcodes25km: Comma-separated list of postcodes within 25km
- postcodes50km: Comma-separated list of postcodes within 50km

## Notes

- Postcode data comes from two CSV files: outfalls1.csv and outfalls2.csv
- Some outfalls have different postcode coverage at 25km vs 50km radius
- Water authorities are extracted from the description field
- Queries use text search on the description field for flexibility
