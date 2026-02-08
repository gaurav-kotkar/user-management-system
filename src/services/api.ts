import { User } from '../config/formSchema';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK === 'true' || true;

let mockUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Wick',
    email: 'john.wick@example.com',
    phoneNumber: '9876543298',
  },
  {
    id: '2',
    firstName: 'Navin',
    lastName: 'Joe',
    email: 'navin.j@example.com',
    phoneNumber: '9887767668',
  },
  {
    id: '3',
    firstName: 'Suraj',
    lastName: 'Patel',
    email: 'suraj.p@example.com',
    phoneNumber: '9876543210',
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockAPI = {
  async getUsers(): Promise<User[]> {
    await delay(500);
    return [...mockUsers];
  },

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    await delay(500);
    const newUser: User = { id: Date.now().toString(), ...userData };
    mockUsers.push(newUser);
    return newUser;
  },

  async updateUser(id: string, userData: Partial<Omit<User, 'id'>>): Promise<User> {
    await delay(500);
    const index = mockUsers.findIndex((user) => user.id === id);
    if (index === -1) throw new Error('User not found');
    mockUsers[index] = { ...mockUsers[index], ...userData };
    return mockUsers[index];
  },

  async deleteUser(id: string): Promise<void> {
    await delay(500);
    const index = mockUsers.findIndex((user) => user.id === id);
    if (index === -1) throw new Error('User not found');
    mockUsers.splice(index, 1);
  },
};

const realAPI = {
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  async updateUser(id: string, userData: Partial<Omit<User, 'id'>>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },

  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete user');
  },
};

export const userAPI = USE_MOCK_API ? mockAPI : realAPI;
export type { User };
