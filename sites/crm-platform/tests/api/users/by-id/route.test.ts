import { NextRequest } from 'next/server';
import { GET, PUT } from '../../../../app/api/users/[id]/route';
import { ERROR_MESSAGES } from '../../../../app/lib/api';
import { mockPrisma } from '../../../setup';
import { createMockRequest } from '../../../jest.setup';

const mockDate = new Date('2024-01-01T00:00:00Z');

describe('Users API Routes', () => {
  const mockUser = {
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
    image: null,
    createdAt: mockDate,
    updatedAt: mockDate
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/users/[id]', () => {
    it('should return a user when found', async () => {
      const request = createMockRequest('http://localhost:3000/api/users/test-user-id');
      const response = await GET(request, { params: { id: 'test-user-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockUser);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'test-user-id' },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          updatedAt: true,
        }
      });
    });

    it('should return 404 when user not found', async () => {
      const request = createMockRequest('http://localhost:3000/api/users/non-existent');
      const response = await GET(request, { params: { id: 'non-existent' } });

      expect(response.status).toBe(404);
      expect(await response.text()).toBe(ERROR_MESSAGES.NOT_FOUND('User'));
    });
  });

  describe('PUT /api/users/[id]', () => {
    const updateData = {
      name: 'Updated Name',
      email: 'updated@example.com'
    };

    it('should prevent email duplication', async () => {
      const request = createMockRequest('http://localhost:3000/api/users/test-user-id', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      const response = await PUT(request, { params: { id: 'test-user-id' } });

      expect(response.status).toBe(400);
      expect(await response.text()).toBe(ERROR_MESSAGES.EMAIL_IN_USE);
      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });

    it('should update a user successfully', async () => {
      const request = createMockRequest('http://localhost:3000/api/users/test-user-id', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      const response = await PUT(request, { params: { id: 'test-user-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ ...mockUser, ...updateData, updatedAt: mockDate });
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'test-user-id' },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          updatedAt: true,
        }
      });
    });

    it('should not allow updating sensitive fields', async () => {
      const sensitiveData = {
        ...updateData,
        password: 'newpassword',
        isAdmin: true
      };

      const request = createMockRequest('http://localhost:3000/api/users/test-user-id', {
        method: 'PUT',
        body: JSON.stringify(sensitiveData)
      });
      const response = await PUT(request, { params: { id: 'test-user-id' } });

      expect(response.status).toBe(200);
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'test-user-id' },
        data: updateData, // Should only contain safe fields
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          updatedAt: true,
        }
      });
    });
  });
});