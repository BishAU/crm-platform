-- Table: users
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- Table: facilities
CREATE TABLE facilities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    water_auth_id INTEGER,
    FOREIGN KEY (water_auth_id) REFERENCES water_authorities(id)
);

-- Table: outfalls
CREATE TABLE outfalls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    authority VARCHAR(255),
    contact VARCHAR(255),
    contact_email VARCHAR(255),
    contact_name VARCHAR(255),
    indigenous_nation VARCHAR(255),
    land_council VARCHAR(255),
    latitude REAL,
    longitude REAL,
    outfall VARCHAR(255),
    state VARCHAR(255),
    type VARCHAR(255)
);

-- Table: EducationalFacilities
CREATE TABLE EducationalFacilities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Latitude REAL,
    Longtitude REAL,
    Postcode VARCHAR(20),
    "Region Type" VARCHAR(255),
    Sector VARCHAR(255),
    Surburb VARCHAR(255),
    Type VARCHAR(255),
    "Facility Name" VARCHAR(255)
);

-- Table: IngidegnousCommunities
CREATE TABLE IngidegnousCommunities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    "Related Water Authorities" VARCHAR(255),
    "Community Name" VARCHAR(255)
);

-- Table: LandCouncils
CREATE TABLE LandCouncils (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Email VARCHAR(255),
    LGAs VARCHAR(255),
    "Number of outfalls" INTEGER,
    Outfalls TEXT,
    Phone VARCHAR(20),
    "Name" VARCHAR(255)
);

-- Table: people
CREATE TABLE people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ABN VARCHAR(255),
    "Address 1" VARCHAR(255),
    "Annual Report Prepared and Tabled?" VARCHAR(255),
    "Annual Reports" VARCHAR(255),
    Auditor VARCHAR(255),
    "Budget Documentation" VARCHAR(255),
    City VARCHAR(255),
    Classification VARCHAR(255),
    Company VARCHAR(255),
    Country VARCHAR(255),
    "Create At" VARCHAR(255),
    "Creation Date" VARCHAR(255),
    DOB VARCHAR(255),
    Description TEXT,
    Email VARCHAR(255),
    "Established By / Under" VARCHAR(255),
    "Established by/Under More Info" VARCHAR(255),
    "First Name" VARCHAR(255),
    "Full Name" VARCHAR(255),
    "GFS Function / Sector Reported" VARCHAR(255),
    "GFS Sector Classification" VARCHAR(255),
    "Head Office Country" VARCHAR(255),
    "Head Office Postcode" VARCHAR(255),
    "Head Office State" VARCHAR(255),
    "Head Office Street Address" VARCHAR(255),
    "Head Office Suburb" VARCHAR(255),
    "Last Name" VARCHAR(255),
    Materiality VARCHAR(255),
    Name VARCHAR(255),
    Newsletter VARCHAR(255),
    "Opt In Status" VARCHAR(255),
    Organisation VARCHAR(255),
    Organistion VARCHAR(255),
    "PS Act Body" VARCHAR(255),
    Phone VARCHAR(255),
    "Phone Number" VARCHAR(255),
    "Physical Address" VARCHAR(255),
    "Physical Address State" VARCHAR(255),
    Portfolio VARCHAR(255),
    "Portfolio Dept?" VARCHAR(255),
    Postcode VARCHAR(255),
    Relationship VARCHAR(255),
    State VARCHAR(255),
    "Strategic/Corporate/Organisational Plan" VARCHAR(255),
    Surname VARCHAR(255),
    Title VARCHAR(255),
    "Type of Body" VARCHAR(255),
    "Website Address" VARCHAR(255),
    "﻿Full Name" VARCHAR(255)
);

-- Table: politicians
CREATE TABLE politicians (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Address VARCHAR(255),
    City VARCHAR(255),
    EOAddress VARCHAR(255),
    Electorate VARCHAR(255),
    Email VARCHAR(255),
    Fax VARCHAR(255),
    "First name" VARCHAR(255),
    Gender VARCHAR(255),
    House VARCHAR(255),
    LastName VARCHAR(255),
    LastUpdated VARCHAR(255),
    MinAddress VARCHAR(255),
    MinPhone VARCHAR(255),
    Minister VARCHAR(255),
    POAddress VARCHAR(255),
    POstcode VARCHAR(255),
    Party VARCHAR(255),
    PartyAbb VARCHAR(255),
    Phone VARCHAR(255),
    Photo VARCHAR(255),
    "Political Party" VARCHAR(255),
    "Politician Name" VARCHAR(255),
    Position VARCHAR(255),
    PreferredName VARCHAR(255),
    Salutation VARCHAR(255),
    State VARCHAR(255),
    Surname VARCHAR(255),
    Title VARCHAR(255),
    Web VARCHAR(255),
    images VARCHAR(255),
    "﻿Full Name" VARCHAR(255)
);

-- Table: WaterAuthorities
CREATE TABLE WaterAuthorities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    "Associated Indigenous Communities" VARCHAR(255),
    "Authority Name" VARCHAR(255)
);
