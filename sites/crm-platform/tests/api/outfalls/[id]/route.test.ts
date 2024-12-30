import { NextRequest } from 'next/server';
import { mockPrisma } from '../../../setup';
import { GET, PUT } from '../../../../app/api/outfalls/[id]/route';
import { ERROR_MESSAGES } from '../../../../app/lib/api';

describe('Outfalls [id] API Routes', () => {
  const mockOutfall = {
    id: 'test-outfall-id',
    authority: 'Test Authority',
    contact: 'Test Contact',
    contact_email: 'contact@example.com',
    contact_name: 'Test Contact Name',
    indigenousNation: 'Test Nation',
    landCouncil: 'Test Council',
    latitude: '123.456',
    longitude: '-45.678',
    state: 'NSW',
    type: 'Test Type',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  describe('GET /api/outfalls/[id]', () => {
    it('should return an outfall when found', async () => {
      mockPrisma.outfall.findUnique.mockResolvedValueOnce(mockOutfall);

      const request = new NextRequest('http://localhost:3000/api/outfalls/test-outfall-id');
      const response = await GET(request, { params: { id: 'test-outfall-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockOutfall);
      expect(mockPrisma.outfall.findUnique).toHaveBeenCalledWith({
        where: { id: 'test-outfall-id' }
      });
    });

    it('should return 404 when outfall not found', async () => {
      mockPrisma.outfall.findUnique.mockResolvedValueOnce(null);

      const request = new NextRequest('http://localhost:3000/api/outfalls/non-existent');
      const response = await GET(request, { params: { id: 'non-existent' } });

      expect(response.status).toBe(404);
      expect(await response.text()).toBe(ERROR_MESSAGES.NOT_FOUND('Outfall'));
    });
  });

  describe('PUT /api/outfalls/[id]', () => {
    it('should update an outfall with valid data', async () => {
      const updateData = {
        contact_email: 'new.contact@example.com',
        latitude: '45.678',
        longitude: '-123.456',
        state: 'VIC'
      };

      mockPrisma.outfall.update.mockResolvedValueOnce({
        ...mockOutfall,
        ...updateData
      });

      const request = new NextRequest('http://localhost:3000/api/outfalls/test-outfall-id', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      const response = await PUT(request, { params: { id: 'test-outfall-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        ...mockOutfall,
        ...updateData
      });
      expect(mockPrisma.outfall.update).toHaveBeenCalledWith({
        where: { id: 'test-outfall-id' },
        data: updateData
      });
    });

    it('should reject invalid latitude', async () => {
      const updateData = {
        latitude: '999.999', // Invalid latitude
        longitude: '-123.456'
      };

      const request = new NextRequest('http://localhost:3000/api/outfalls/test-outfall-id', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      const response = await PUT(request, { params: { id: 'test-outfall-id' } });

      expect(response.status).toBe(400);
      expect(await response.text()).toBe('Invalid latitude format');
      expect(mockPrisma.outfall.update).not.toHaveBeenCalled();
    });

    it('should reject invalid longitude', async () => {
      const updateData = {
        latitude: '45.678',
        longitude: '999.999' // Invalid longitude
      };

      const request = new NextRequest('http://localhost:3000/api/outfalls/test-outfall-id', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      const response = await PUT(request, { params: { id: 'test-outfall-id' } });

      expect(response.status).toBe(400);
      expect(await response.text()).toBe('Invalid longitude format');
      expect(mockPrisma.outfall.update).not.toHaveBeenCalled();
    });

    it('should reject invalid email format', async () => {
      const updateData = {
        contact_email: 'invalid-email' // Invalid email format
      };

      const request = new NextRequest('http://localhost:3000/api/outfalls/test-outfall-id', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      const response = await PUT(request, { params: { id: 'test-outfall-id' } });

      expect(response.status).toBe(400);
      expect(await response.text()).toBe('Invalid email format');
      expect(mockPrisma.outfall.update).not.toHaveBeenCalled();
    });

    it('should reject invalid state code', async () => {
      const updateData = {
        state: 'INVALID' // Invalid state code
      };

      const request = new NextRequest('http://localhost:3000/api/outfalls/test-outfall-id', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      const response = await PUT(request, { params: { id: 'test-outfall-id' } });

      expect(response.status).toBe(400);
      expect(await response.text()).toBe('Invalid state code');
      expect(mockPrisma.outfall.update).not.toHaveBeenCalled();
    });

    it('should accept valid state code in any case', async () => {
      const updateData = {
        state: 'nsw' // Lower case should be accepted
      };

      mockPrisma.outfall.update.mockResolvedValueOnce({
        ...mockOutfall,
        state: 'NSW'
      });

      const request = new NextRequest('http://localhost:3000/api/outfalls/test-outfall-id', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      const response = await PUT(request, { params: { id: 'test-outfall-id' } });

      expect(response.status).toBe(200);
      expect(mockPrisma.outfall.update).toHaveBeenCalled();
    });
  });
});