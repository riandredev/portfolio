'use client'

import { Suspense } from 'react'
import LoginForm from '@/components/login-form'

export default function LoginPage() {
  return (
    <div className="container px-4 mx-auto min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
