import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useAuth, useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/router'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [secondFactor, setSecondFactor] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { isLoaded, signIn, setActive } = useSignIn()

  if (!isLoaded) {
    return null
  }

  if (isSignedIn) {
    router.push('/dashboard')
  }

  async function create(e) {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signIn?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      setSuccessfulCreation(true)
      setError('')
    } catch (err) {
      console.error('error', err.errors[0].longMessage)
      setError(err.errors[0].longMessage)
    } finally {
      setIsLoading(false)
    }
  }

  async function reset(e) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      
      if (result?.status === 'needs_second_factor') {
        setSecondFactor(true)
        setError('')
      } else if (result?.status === 'complete') {
        setActive({ session: result.createdSessionId })
        setError('')
      }
    } catch (err) {
      console.error('error', err.errors[0].longMessage)
      setError(err.errors[0].longMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <header className="top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold text-xl text-gray-900">EduAssist</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign in
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="flex bg-gray-100 min-h-screen">
        <div className="flex-1">
          <main className="mx-auto sm:px-6 lg:px-8 py-6 max-w-7xl">
            <div className="px-4 sm:px-0 py-6">
              <Card className="mx-auto max-w-md">
                <CardHeader>
                  <CardTitle className="font-bold text-2xl text-center">
                    {!successfulCreation ? "Reset Password" : "Create New Password"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={!successfulCreation ? create : reset} className="space-y-4">
                    {!successfulCreation ? (
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                          />
                          <Mail
                            className="top-1/2 left-3 absolute text-gray-400 transform -translate-y-1/2"
                            size={18}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="code">Reset Code</Label>
                          <div className="relative">
                            <Input
                              id="code"
                              type="text"
                              placeholder="Enter reset code from email"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                              className="pl-10"
                            />
                            <Mail
                              className="top-1/2 left-3 absolute text-gray-400 transform -translate-y-1/2"
                              size={18}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password">New Password</Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter new password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="pl-10"
                            />
                            <Lock
                              className="top-1/2 left-3 absolute text-gray-400 transform -translate-y-1/2"
                              size={18}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="top-1/2 right-3 absolute text-gray-400 hover:text-gray-300 transform -translate-y-1/2 focus:outline-none"
                            >
                              {showPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {error && (
                      <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}

                    <Button className="w-full" type="submit">
                      {isLoading ? (
                        <span className="flex justify-center items-center">
                          <svg
                            className="mr-3 -ml-1 w-5 h-5 text-black animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {!successfulCreation ? "Sending..." : "Resetting..."}
                        </span>
                      ) : (
                        (!successfulCreation ? "Send Reset Code" : "Reset Password")
                      )}
                    </Button>

                    {secondFactor && (
                      <p className="text-amber-500 text-sm text-center">
                        2FA is required, but this UI does not handle that
                      </p>
                    )}
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-gray-500 text-sm">
                    Remember your password?{" "}
                    <Link
                      href="/sign-in"
                      className="text-primary hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordPage