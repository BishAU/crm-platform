export const dbSchema = {
    Outfall: ['id', 'authority', 'contact', 'contact_email', 'contact_name', 'indigenousNation', 'landCouncil', 'latitude', 'longitude', 'state', 'type', 'outfallName'],
    Facility: ['id', 'latitude', 'longitude', 'postcode', 'regionType', 'sector', 'suburb', 'type', 'creatorId'],
    IndigenousCommunity: ['id', 'name', 'region', 'population'],
    Politician: ['id', 'name', 'email', 'party', 'position', 'state'],
    User: ['id', 'name', 'email', 'password', 'isAdmin'],
    OutfallObservation: ['id', 'outfallId', 'date', 'flow']
};