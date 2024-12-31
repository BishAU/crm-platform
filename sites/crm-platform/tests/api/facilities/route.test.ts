import { NextRequest } from 'next/server';
import { mockPrisma } from '../../setup';
import { GET, POST, PUT, DELETE } from '../../../app/api/facilities/route';

describe('Facilities API Routes', () => {
  const mockFacility = {
    id: 'test-facility-id',
    type: 'Test Facility',
    sector: 'Education',
    suburb: 'Test Suburb',
    postcode: '2000',
    regionType: 'Urban',
    createdAt: new Date(),
    updatedAt: new Date(),
    creatorId: 'test-user-id'
  };

  describe('GET /api/facilities', () => {
    it('should return paginated facilities with search', async () => {
      const mockFacilities = [mockFacility];
      mockPrisma.facility.findMany.mockResolvedValueOnce(mockFacilities);
      mockPrisma.facility.count.mockResolvedValueOnce(1);

      const url = new URL('http://localhost:3000/api/facilities');
      url.searchParams.set('page', '1');
      url.searchParams.set('limit', '10');
      url.searchParams.set('search', 'test');
      url.searchParams.set('sortBy', 'type');
      url.searchParams.set('sortOrder', 'asc');

      const request = new NextRequest(url);
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        data: mockFacilities.map(f => ({ ...f, name: f.type })),
        pagination: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1
        }
      });

      expect(mockPrisma.facility.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { type: { contains: 'test', mode: 'insensitive' } },
            { sector: { contains: 'test', mode: 'insensitive' } },
            { suburb: { contains: 'test', mode: 'insensitive' } },
          ]
        },
        skip: 0,
        take: 10,
        orderBy: {
          type: 'asc'
        }
      });
    });
  });

  describe('POST /api/facilities', () => {
    it('should create a new facility', async () => {
      const newFacility = {
        name: 'New Facility',
        sector: 'Healthcare',
        suburb: 'New Suburb',
        postcode: '2001',
        regionType: 'Rural'
      };

      mockPrisma.facility.create.mockResolvedValueOnce({
        ...mockFacility,
        type: newFacility.name,
        sector: newFacility.sector,
        suburb: newFacility.suburb,
        postcode: newFacility.postcode,
        regionType: newFacility.regionType
      });

      const request = new NextRequest('http://localhost:3000/api/facilities', {
        method: 'POST',
        body: JSON.stringify(newFacility)
      });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.type).toBe(newFacility.name);
      expect(mockPrisma.facility.create).toHaveBeenCalledWith({
        data: {
          type: newFacility.name,
          sector: newFacility.sector,
          suburb: newFacility.suburb,
          postcode: newFacility.postcode,
          regionType: newFacility.regionType,
          creatorId: 'test-user-id'
        }
      });
    });
  });

  describe('PUT /api/facilities', () => {
    it('should update a facility', async () => {
      const updateData = {
        id: 'test-facility-id',
        name: 'Updated Facility',
        sector: 'Updated Sector'
      };

      mockPrisma.facility.update.mockResolvedValueOnce({
        ...mockFacility,
        type: updateData.name,
        sector: updateData.sector
      });

      const request = new NextRequest('http://localhost:3000/api/facilities', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.type).toBe(updateData.name);
      expect(mockPrisma.facility.update).toHaveBeenCalledWith({
        where: { id: updateData.id },
        data: {
          type: updateData.name,
          sector: updateData.sector
        }
      });
    });
  });

  describe('DELETE /api/facilities', () => {
    it('should delete a facility', async () => {
      const url = new URL('http://localhost:3000/api/facilities');
      url.searchParams.set('id', 'test-facility-id');

      const request = new NextRequest(url, { method: 'DELETE' });
      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ success: true });
      expect(mockPrisma.facility.delete).toHaveBeenCalledWith({
        where: { id: 'test-facility-id' }
      });
    });

    it('should return 400 when id is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/facilities', {
        method: 'DELETE'
      });
      const response = await DELETE(request);

      expect(response.status).toBe(400);
    });
  });
});