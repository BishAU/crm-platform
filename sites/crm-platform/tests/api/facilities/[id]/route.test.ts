import { NextRequest } from 'next/server';
import { mockPrisma } from '../../../setup';
import { GET, PUT } from '../../../../app/api/facilities/[id]/route';
import { ERROR_MESSAGES } from '../../../../app/lib/api';

describe('Facilities [id] API Routes', () => {
  const mockFacility = {
    id: 'test-facility-id',
    type: 'Test Facility',
    sector: 'Education',
    suburb: 'Test Suburb',
    postcode: '2000',
    regionType: 'Urban',
    latitude: '123.456',
    longitude: '-45.678',
    createdAt: new Date(),
    updatedAt: new Date(),
    creatorId: 'test-user-id'
  };

  describe('GET /api/facilities/[id]', () => {
    it('should return a facility when found', async () => {
      mockPrisma.facility.findUnique.mockResolvedValueOnce(mockFacility);

      const request = new NextRequest('http://localhost:3000/api/facilities/test-facility-id');
      const response = await GET(request, { params: { id: 'test-facility-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockFacility);
      expect(mockPrisma.facility.findUnique).toHaveBeenCalledWith({
        where: { id: 'test-facility-id' }
      });
    });

    it('should return 404 when facility not found', async () => {
      mockPrisma.facility.findUnique.mockResolvedValueOnce(null);

      const request = new NextRequest('http://localhost:3000/api/facilities/non-existent');
      const response = await GET(request, { params: { id: 'non-existent' } });

      expect(response.status).toBe(404);
      expect(await response.text()).toBe(ERROR_MESSAGES.NOT_FOUND('Facility'));
    });
  });

  describe('PUT /api/facilities/[id]', () => {
    it('should update a facility with valid coordinates', async () => {
      const updateData = {
        type: 'Updated Facility',
        latitude: '45.678',
        longitude: '-123.456'
      };

      mockPrisma.facility.update.mockResolvedValueOnce({
        ...mockFacility,
        ...updateData
      });

      const request = new NextRequest('http://localhost:3000/api/facilities/test-facility-id', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      const response = await PUT(request, { params: { id: 'test-facility-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        ...mockFacility,
        ...updateData
      });
      expect(mockPrisma.facility.update).toHaveBeenCalledWith({
        where: { id: 'test-facility-id' },
        data: updateData
      });
    });

    it('should reject invalid latitude', async () => {
      const updateData = {
        latitude: '999.999', // Invalid latitude
        longitude: '-123.456'
      };

      const request = new NextRequest('http://localhost:3000/api/facilities/test-facility-id', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      const response = await PUT(request, { params: { id: 'test-facility-id' } });

      expect(response.status).toBe(400);
      expect(await response.text()).toBe('Invalid latitude format');
      expect(mockPrisma.facility.update).not.toHaveBeenCalled();
    });

    it('should reject invalid longitude', async () => {
      const updateData = {
        latitude: '45.678',
        longitude: '999.999' // Invalid longitude
      };

      const request = new NextRequest('http://localhost:3000/api/facilities/test-facility-id', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      const response = await PUT(request, { params: { id: 'test-facility-id' } });

      expect(response.status).toBe(400);
      expect(await response.text()).toBe('Invalid longitude format');
      expect(mockPrisma.facility.update).not.toHaveBeenCalled();
    });

    it('should not allow updating creatorId', async () => {
      const updateData = {
        type: 'Updated Facility',
        creatorId: 'different-user-id'
      };

      mockPrisma.facility.update.mockResolvedValueOnce({
        ...mockFacility,
        type: updateData.type
      });

      const request = new NextRequest('http://localhost:3000/api/facilities/test-facility-id', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      const response = await PUT(request, { params: { id: 'test-facility-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.creatorId).toBe(mockFacility.creatorId);
      expect(mockPrisma.facility.update).toHaveBeenCalledWith({
        where: { id: 'test-facility-id' },
        data: { type: updateData.type }
      });
    });
  });
});