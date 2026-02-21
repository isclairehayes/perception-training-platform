// Mock authentication for development
// Replace with real Supabase auth when ready

export interface MockUser {
  id: string;
  email: string;
  created_at: string;
}

let mockUser: MockUser | null = null;

export const mockAuth = {
  signUp: async (email: string, password: string): Promise<{ user: MockUser | null; error: Error | null }> => {
    if (password.length < 6) {
      return { user: null, error: new Error('Password must be at least 6 characters') };
    }
    
    mockUser = {
      id: `mock-${Date.now()}`,
      email,
      created_at: new Date().toISOString(),
    };
    
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
    }
    
    return { user: mockUser, error: null };
  },

  signIn: async (email: string, password: string): Promise<{ user: MockUser | null; error: Error | null }> => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mockUser');
      if (stored) {
        const storedUser = JSON.parse(stored);
        if (storedUser.email === email) {
          mockUser = storedUser;
          return { user: mockUser, error: null };
        }
      }
    }
    
    return { user: null, error: new Error('Invalid credentials') };
  },

  signOut: async (): Promise<{ error: Error | null }> => {
    mockUser = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mockUser');
    }
    return { error: null };
  },

  getUser: async (): Promise<MockUser | null> => {
    if (mockUser) return mockUser;
    
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mockUser');
      if (stored) {
        mockUser = JSON.parse(stored);
        return mockUser;
      }
    }
    
    return null;
  },
};
