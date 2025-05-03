
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast"; // Import useToast

interface AdminAuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Store the passcode securely (e.g., environment variable) in a real app
// For this exercise, we use a constant, but avoid committing real secrets.
const ADMIN_PASSCODE = "100672"; // Never display this in UI code

export function AdminAuthDialog({ open, onOpenChange }: AdminAuthDialogProps) {
  const [passcode, setPasscode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast(); // Initialize toast

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Clear previous errors
    setIsSubmitting(true);

    // Simulate network delay/check
    setTimeout(() => {
      if (passcode === ADMIN_PASSCODE) {
        // Store auth status temporarily (INSECURE for production)
        try {
          sessionStorage.setItem('isAdminAuthenticated', 'true');
          toast({ // Success toast
              title: "Authentication Successful",
              description: "Redirecting to admin area...",
          });
          router.push('/admin'); // Navigate to admin page
          onOpenChange(false); // Close the dialog
          setPasscode(''); // Clear passcode field
        } catch (storageError) {
           console.error("Session storage error:", storageError);
           setError("Could not save session. Please try again.");
           toast({
                title: "Error",
                description: "Could not save session. Please try again.",
                variant: "destructive",
            });
        }
      } else {
        setError('Incorrect passcode. Please try again.');
         toast({ // Error toast
            title: "Authentication Failed",
            description: "Incorrect passcode entered.",
            variant: "destructive",
        });
        setPasscode(''); // Clear passcode field on error
      }
      setIsSubmitting(false);
    }, 500); // Simulate delay
  };

  // Clear error when dialog is closed or passcode changes
  useEffect(() => {
    if (!open) {
      setError(null);
      setPasscode(''); // Also clear passcode when dialog closes
    }
  }, [open]);

   useEffect(() => {
      setError(null); // Clear error when user types
   }, [passcode])


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Admin Access</DialogTitle>
            <DialogDescription>
              Please enter the passcode to access admin features.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="passcode" className="text-right">
                Passcode
              </Label>
              <Input
                id="passcode"
                type="password" // Use password type
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="col-span-3"
                required
                aria-describedby={error ? "passcode-error" : undefined}
              />
            </div>
            {error && (
              <p id="passcode-error" className="col-span-4 text-sm text-destructive text-center">
                {error}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Submit'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
