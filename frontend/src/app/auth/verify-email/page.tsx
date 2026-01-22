"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Loader2, XCircle, Mail } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

function VerifyEmailContent() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (token && verificationStatus === "idle") {
      verifyEmail(token);
    }
  }, [token, verificationStatus]);

  const verifyEmail = async (verificationToken: string) => {
    setIsVerifying(true);
    setVerificationStatus("loading");

    try {
      const response = await axios.post(`${API_URL}/auth/verify-email`, {
        token: verificationToken,
      });

      if (response.data.success) {
        setVerificationStatus("success");
        toast.success("Email Verified!", {
          description:
            "Your email has been verified successfully. Redirecting to login...",
        });

        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      }
    } catch (error: any) {
      setVerificationStatus("error");
      const message =
        error.response?.data?.message ||
        "Failed to verify email. The link may be invalid or expired.";
      setErrorMessage(message);
      toast.error("Verification Failed", {
        description: message,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);

    try {
      const email = localStorage.getItem("pendingVerificationEmail");

      if (!email) {
        toast.error("Email not found", {
          description: "Please register again or enter your email.",
        });
        setIsResending(false);
        return;
      }

      await axios.post(`${API_URL}/auth/resend-verification`, {
        email,
      });

      // Start 30 second countdown
      setCountdown(30);

      toast.success("Verification Sent", {
        description: "A new verification link has been sent to your email.",
      });
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Could not resend verification email.";

      const waitMatch = message.match(/(\d+) seconds/);
      if (waitMatch) {
        const waitSeconds = parseInt(waitMatch[1]);
        setCountdown(waitSeconds);
      }

      toast.error("Failed to resend", {
        description: message,
      });
    } finally {
      setIsResending(false);
    }
  };

  // If verifying with token
  if (token && verificationStatus === "loading") {
    return (
      <div className="w-full">
        <Card className="rounded-3xl bg-card border border-border">
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
              <h2 className="text-xl font-bold text-foreground">
                Verifying your email...
              </h2>
              <p className="text-sm text-muted-foreground">
                Please wait while we verify your email address.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If verification successful
  if (verificationStatus === "success") {
    return (
      <div className="w-full">
        <Card className="rounded-3xl bg-card border border-border">
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <CheckCircle className="h-16 w-16 text-primary" />
              <h2 className="text-xl font-bold text-foreground">
                Email Verified!
              </h2>
              <p className="text-sm text-muted-foreground text-center">
                Your email has been verified successfully. You will be
                redirected to login shortly.
              </p>
              <Link href="/auth/login">
                <Button className="mt-4 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold border-none transition-all active:scale-95">
                  Go to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If verification failed
  if (verificationStatus === "error") {
    return (
      <div className="w-full">
        <Card className="rounded-3xl bg-card border border-border">
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <XCircle className="h-16 w-16 text-destructive" />
              <h2 className="text-xl font-bold text-foreground">
                Verification Failed
              </h2>
              <p className="text-sm text-muted-foreground text-center">
                {errorMessage}
              </p>

              <div className="space-y-3 w-full mt-6">
                <Button
                  onClick={handleResend}
                  disabled={isResending || countdown > 0}
                  className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border-none shadow-none"
                >
                  {isResending
                    ? "Resending..."
                    : countdown > 0
                      ? `Wait ${countdown}s`
                      : "Resend Verification Link"}
                </Button>

                <Link href="/auth/login" className="block">
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-2xl border-border hover:bg-muted font-bold uppercase tracking-widest text-xs text-muted-foreground transition-all"
                  >
                    Back to Login
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Card className="rounded-3xl bg-card border border-border">
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Mail className="h-16 w-16 text-primary" />
            <h2 className="text-xl font-bold text-foreground text-center">
              Check Your Email
            </h2>
          </div>

          <div className="p-4 bg-muted/30 rounded-2xl border border-border italic text-sm text-center font-bold text-muted-foreground">
            Didn't receive the email? Check your spam folder or resend below.
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleResend}
              disabled={isResending || countdown > 0}
              className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border-none shadow-none"
            >
              {isResending
                ? "Resending..."
                : countdown > 0
                  ? `Wait ${countdown}s`
                  : "Resend Link"}
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 rounded-2xl border-border hover:bg-muted font-bold uppercase tracking-widest text-xs text-muted-foreground group bg-transparent transition-all px-0"
            >
              Change Email
            </Button>
          </div>

          <div className="pt-6 border-t border-border text-center">
            <Link
              href="/auth/login"
              className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full">
          <Card className="rounded-3xl bg-card border border-border">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground">
                  Loading verification page...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
