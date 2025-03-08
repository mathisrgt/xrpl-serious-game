import { defineStore } from 'pinia';
import { useCookie } from '#app';

interface UserResponse {
    id: string;
    email: string;
    role: string;
  }

interface LoginResponse {
    token: string;
    user: UserResponse;
  }

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { id: string; email: string; role: string }, 
    token: useCookie('auth_token') // Syncs with browser cookies
  }),

  actions: {
    /**
     * Register a new user
     * @param {Object} data - User registration data
     * @returns {boolean} - True if registration was successful, false otherwise
     */
    async register(data: { firstName: string; lastName: string; email: string; password: string; role: "student" | "teacher" }) {
      try {
        await $fetch('/api/register', {
          method: 'POST',
          body: data
        });
        return true;
      } catch (error) {
        return false;
      }
    },

    /**
     * Log in a user and store JWT
     * @param {Object} data - User login credentials
     * @throws {Error} - If login fails
     */
    async login(data: { email: string; password: string }) {
      try {
        const res = await $fetch<LoginResponse>('/api/login', {
            method: 'POST',
            body: data
          });

        if (res.token) {
          this.token = res.token;
          this.user = res.user;
        }
      } catch (error) {
        throw new Error('Invalid credentials');
      }
    },

    /**
     * Log out the user by clearing cookies and state
     */
    async logout() {
      try {
        await $fetch('/api/users/logout', { method: 'POST' });

        this.token = null;
        this.user = null;
      } catch (error) {
        console.error('Logout failed', error);
      }
    },

    /**
     * Fetch user data from the server (used to restore session)
     */
    async fetchUser() {
      if (!this.token) return;

      try {
        const user = await $fetch<UserResponse>('/api/users/verify', {
            method: 'GET',
            headers: { Authorization: `Bearer ${this.token}` }
        });
        
        this.user = user;
      } catch {
        this.token = null;
        this.user = null;
      }
    }
  }
});
