import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/router";
import { SignOutButton } from '@clerk/nextjs'

const OnboardingPage = () => {
  const [universityName, setUniversityName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          universityName: universityName
        }),
      });

      if (response.ok) {
        router.push("/administration");
      } else {
        throw new Error('Error occured in api file');
      }
    } catch (err) {
      setError(`${err}`);
      setIsLoading(false);
    }
  };

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
          <div>
            <SignOutButton />
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
                  Welcome to EduAssist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="universityName">University Name</Label>
                    <div className="relative">
                      <Input
                        id="universityName"
                        type="text"
                        value={universityName}
                        placeholder="Enter University Name"
                        required
                        className={`${error ? "border-red-600" : ""}`}
                        onChange={(e) => {
                          setUniversityName(e.target.value);
                          setError("");
                        }}
                      />
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm">
                        {error}
                      </p>
                    )}
                  </div>
                  <Button className="w-full" type="submit" disabled={isLoading}>
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
                        Submitting...
                      </span>
                    ) : (
                      "Complete Onboarding"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default OnboardingPage;
