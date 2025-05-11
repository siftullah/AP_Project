import { useRef, useState } from "react";
import { useRouter } from "next/router";
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
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import Head from "next/head";
import Image from "next/image";

const SignUpPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email_address: "",
    password: "",
    confirm_password: "",
    code: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const router = useRouter();

  const validateForm = () => {
    const formErrors = {
      firstname: firstname === "" ? "First Name is required" : "",
      lastname: lastname === "" ? "Last Name is required" : "",
      email_address:
        emailAddress === ""
          ? "Email is required"
          : !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)
          ? "Invalid email format"
          : "",
      password:
        password === ""
          ? "Password is required"
          : password.length < 8
          ? "Password must be at least 8 characters"
          : "",
      confirm_password:
        confirmPassword === ""
          ? "Confirm password is required"
          : confirmPassword !== password
          ? "Passwords do not match"
          : "",
    };

    setErrors((prev) => ({ ...prev, ...formErrors }));

    return Object.values(formErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) return;

    if (validateForm()) {
      setIsLoading(true);
      try {
        await signUp.create({
          firstName: firstname,
          lastName: lastname,
          emailAddress,
          password,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setPendingVerification(true);
      } catch (err) {
        if (isClerkAPIResponseError(err)) {
          err.errors.forEach((error) => {
            setErrors((prev) => ({
              ...prev,
              [error.meta?.paramName || ""]: error.message,
            }));
          });
        }
        console.error(JSON.stringify(err, null, 2));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerificationCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Move to the next input if a digit is entered
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && verificationCode[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const newCode = pastedData.split("").slice(0, 6);
    setVerificationCode(newCode);
    newCode.forEach((_, i) => {
      if (inputRefs.current[i + 1]) {
        inputRefs.current[i + 1]?.focus();
      }
    });
  };

  const onPressVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    const code = verificationCode.join("");
    if (code.length !== 6) return;

    setIsLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        // Set role metadata
        try {
          const response = await fetch("/api/sign-up/set-meta-data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: "user" }),
          });

          const data = await response.json();

          if (response.ok) {
            console.log(data.message); // Meta data set successfully
            router.push("/"); // Redirect to home after successful signup and verification
          } else {
            console.error(data.error);
          }
        } catch (error) {
          console.error("Error:", error);
          router.push("/"); // Still redirect even if metadata setting fails
        }
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        err.errors.forEach((error) => {
          setErrors((prev) => ({
            ...prev,
            [error.meta?.paramName || ""]: error.message,
          }));
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - EduAssist</title>
        <meta name="description" content="Create your EduAssist account" />
      </Head>

      <header className="top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/fyp-logo.png"
                  alt="EduAssist"
                  className="h-10 w-auto"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <button className="px-5 py-2 rounded-md bg-black hover:bg-gray-800 text-white font-medium transition-colors shadow-md">
                  Home
                </button>
              </Link>
              <Link href="/sign-in">
                <button className="px-5 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-medium transition-colors shadow-md">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="flex bg-slate-100 min-h-screen">
        <div className="flex-1">
          <main className="mx-auto sm:px-6 lg:px-8 py-6 max-w-7xl">
            <div className="px-4 sm:px-0 py-6">
              <Card className="mx-auto max-w-md">
                <CardHeader>
                  <CardTitle className="text-4xl text-center font-pacifico text-sky-500">
                    {pendingVerification
                      ? "Verify Your Email"
                      : "Join EduAssist!"}
                  </CardTitle>
                  <p className="text-muted-foreground text-center">
                    {pendingVerification
                      ? "We've sent a verification code to your email"
                      : "Create a new account"}
                  </p>
                </CardHeader>
                <CardContent>
                  {!pendingVerification ? (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      noValidate
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstname">First Name</Label>
                          <div className="relative">
                            <Input
                              id="firstname"
                              value={firstname}
                              placeholder="John"
                              className={`pl-10 ${
                                errors.firstname !== "" ? "border-red-600" : ""
                              }`}
                              onChange={(e) => {
                                setFirstName(e.target.value);
                                setErrors({ ...errors, firstname: "" });
                              }}
                              required
                            />
                            <User
                              className="top-1/2 left-3 absolute text-gray-400 transform -translate-y-1/2"
                              size={18}
                            />
                          </div>
                          {errors.firstname && (
                            <p className="text-red-500 text-sm">
                              {errors.firstname}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastname">Last Name</Label>
                          <div className="relative">
                            <Input
                              id="lastname"
                              value={lastname}
                              placeholder="Doe"
                              className={`pl-10 ${
                                errors.lastname !== "" ? "border-red-600" : ""
                              }`}
                              onChange={(e) => {
                                setLastName(e.target.value);
                                setErrors({ ...errors, lastname: "" });
                              }}
                              required
                            />
                            <User
                              className="top-1/2 left-3 absolute text-gray-400 transform -translate-y-1/2"
                              size={18}
                            />
                          </div>
                          {errors.lastname && (
                            <p className="text-red-500 text-sm">
                              {errors.lastname}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            value={emailAddress}
                            placeholder="john.doe@example.com"
                            className={`pl-10 ${
                              errors.email_address !== ""
                                ? "border-red-600"
                                : ""
                            }`}
                            onChange={(e) => {
                              setEmailAddress(e.target.value);
                              setErrors({ ...errors, email_address: "" });
                            }}
                            required
                          />
                          <Mail
                            className="top-1/2 left-3 absolute text-gray-400 transform -translate-y-1/2"
                            size={18}
                          />
                        </div>
                        {errors.email_address && (
                          <p className="text-red-500 text-sm">
                            {errors.email_address}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            placeholder="Create a password"
                            className={`pl-10 ${
                              errors.password !== "" ? "border-red-600" : ""
                            }`}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setErrors({ ...errors, password: "" });
                            }}
                            required
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
                        {errors.password && (
                          <p className="text-red-500 text-sm">
                            {errors.password}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            placeholder="Confirm your password"
                            className={`pl-10 ${
                              errors.confirm_password !== ""
                                ? "border-red-600"
                                : ""
                            }`}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                              setErrors({ ...errors, confirm_password: "" });
                            }}
                            required
                          />
                          <Lock
                            className="top-1/2 left-3 absolute text-gray-400 transform -translate-y-1/2"
                            size={18}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="top-1/2 right-3 absolute text-gray-400 hover:text-gray-300 transform -translate-y-1/2 focus:outline-none"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                        {errors.confirm_password && (
                          <p className="text-red-500 text-sm">
                            {errors.confirm_password}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-sky-600 hover:bg-sky-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={onPressVerify} className="space-y-4">
                      <div className="text-center">
                        <p className="mb-4">
                          Please enter the 6-digit code sent to{" "}
                          <span className="font-medium">{emailAddress}</span>
                        </p>
                        <div className="flex justify-center gap-2">
                          {verificationCode.map((digit, index) => (
                            <Input
                              key={index}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={digit}
                              className="w-12 h-12 text-center text-xl"
                              onChange={(e) =>
                                handleVerificationCodeChange(
                                  index,
                                  e.target.value
                                )
                              }
                              onKeyDown={(e) => handleKeyDown(index, e)}
                              onPaste={
                                index === 0 ? handleCodePaste : undefined
                              }
                              ref={(el) => (inputRefs.current[index] = el)}
                            />
                          ))}
                        </div>
                        {errors.code && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.code}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-sky-600 hover:bg-sky-700"
                        disabled={
                          isLoading || verificationCode.join("").length !== 6
                        }
                      >
                        {isLoading ? "Verifying..." : "Verify Email"}
                      </Button>
                      <p className="text-center text-sm text-gray-500">
                        Didn&apos;t receive the code?{" "}
                        <button
                          type="button"
                          className="text-sky-600 hover:underline"
                          onClick={async () => {
                            try {
                              await signUp.prepareEmailAddressVerification({
                                strategy: "email_code",
                              });
                            } catch (err) {
                              console.error("Error resending code:", err);
                            }
                          }}
                        >
                          Resend
                        </button>
                      </p>
                    </form>
                  )}
                </CardContent>
                <CardFooter className="justify-center text-center">
                  <p className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                      href="/sign-in"
                      className="text-sky-600 hover:underline"
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
  );
};

export default SignUpPage;
