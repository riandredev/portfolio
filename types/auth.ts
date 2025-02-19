export interface LoginAttempt {
  timestamp: number
  ip: string
  location: string
  success: boolean
  userAgent?: string
}

export interface AuthState {
  isAuthenticated: boolean
  loginAttempts: LoginAttempt[]
  checkAuth: () => Promise<boolean>
  login: (credentials: { email: string; password: string }) => Promise<boolean>
  logout: () => void
}
