"use client"

// Simple authentication system for demo purposes
// In production, use a proper authentication service like NextAuth.js, Supabase Auth, etc.

export interface User {
  id: string
  name: string
  email: string
  mobile: string
}

export interface LoginCredentials {
  email: string
  password: string
  mobile?: string
}

// Mock user data - in production, this would come from your database
const MOCK_USER: User = {
  id: "1",
  name: "امیرمحمد خدابنده",
  email: "amirmohammad@webcom.com",
  mobile: "+98 912 345 6789",
}

const VALID_CREDENTIALS = {
  email: "admin@webcom.com",
  password: "admin123",
  mobile: "+98 912 345 6789",
}

export class AuthService {
  private static readonly TOKEN_KEY = "auth_token"
  private static readonly USER_KEY = "auth_user"

  static async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Validate credentials
    if (
      credentials.email === VALID_CREDENTIALS.email &&
      credentials.password === VALID_CREDENTIALS.password &&
      (!credentials.mobile || credentials.mobile === VALID_CREDENTIALS.mobile)
    ) {
      // Generate mock token
      const token = btoa(JSON.stringify({ userId: MOCK_USER.id, timestamp: Date.now() }))

      // Store in localStorage
      localStorage.setItem(this.TOKEN_KEY, token)
      localStorage.setItem(this.USER_KEY, JSON.stringify(MOCK_USER))

      return { success: true, user: MOCK_USER }
    }

    return { success: false, error: "Invalid credentials" }
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  static getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem(this.USER_KEY)
      return userStr ? JSON.parse(userStr) : null
    } catch {
      return null
    }
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  static isAuthenticated(): boolean {
    const token = this.getToken()
    const user = this.getCurrentUser()

    if (!token || !user) return false

    try {
      const tokenData = JSON.parse(atob(token))
      // Check if token is less than 24 hours old
      const isValid = Date.now() - tokenData.timestamp < 24 * 60 * 60 * 1000
      return isValid
    } catch {
      return false
    }
  }
}
