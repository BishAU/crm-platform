import React from 'react';

const ImportPage = () => {
  return (
    <div>
      <h1>Import Data</h1>
      <p>This page will allow you to import data from CSV files.</p>
      <input type="file" accept=".csv" />
      <div>
        <label htmlFor="table-select">Select a table:</label>
        <select id="table-select">
          <option value="_prisma_migrations">_prisma_migrations</option>
          <option value="VerificationToken">VerificationToken</option>
          <option value="Outfall">Outfall</option>
          <option value="Account">Account</option>
          <option value="Session">Session</option>
          <option value="OutfallPostcode">OutfallPostcode</option>
          <option value="MarketingListEntity">MarketingListEntity</option>
          <option value="MarketingListFilter">MarketingListFilter</option>
          <option value="MarketingList">MarketingList</option>
          <option value="Facility">Facility</option>
          <option value="IndigenousCommunity">IndigenousCommunity</option>
          <option value="Politician">Politician</option>
          <option value="User">User</option>
           <option value="LandCouncil">LandCouncil</option>
          <option value="WaterAuthority">WaterAuthority</option>
          <option value="Campaign">Campaign</option>
          <option value="OutfallObservation">OutfallObservation</option>
          <option value="SupportTicket">SupportTicket</option>
        </select>
      </div>
      <div>
        {/* Mapping UI will go here */}
      </div>
      <button>Dry Run</button>
      <button>Import</button>
    </div>
  );
};

export default ImportPage;