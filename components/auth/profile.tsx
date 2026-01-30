"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Upload, RefreshCw, Sun, Bell } from "lucide-react";
import { toast } from "sonner";

const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

const professionalInfoSchema = z.object({
  jobTitle: z.string().optional(),
  bio: z.string().optional(),
});

type PersonalInfoInput = z.infer<typeof personalInfoSchema>;
type ProfessionalInfoInput = z.infer<typeof professionalInfoSchema>;

interface ProfileProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function Profile({ user }: ProfileProps) {
  const [isLoadingPersonal, setIsLoadingPersonal] = useState(false);
  const [isLoadingProfessional, setIsLoadingProfessional] = useState(false);

  const nameParts = user?.name?.split(" ") || ["", ""];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const personalForm = useForm<PersonalInfoInput>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName,
      lastName,
    },
  });

  const professionalForm = useForm<ProfessionalInfoInput>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      jobTitle: "",
      bio: "",
    },
  });

  const initials =
    `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "U";

  async function onSubmitPersonal(data: PersonalInfoInput) {
    setIsLoadingPersonal(true);
    try {
      console.log("Update personal info:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Personal information updated successfully");
    } catch (error) {
      console.error("Update personal info error:", error);
      toast.error("Failed to update personal information");
    } finally {
      setIsLoadingPersonal(false);
    }
  }

  async function onSubmitProfessional(data: ProfessionalInfoInput) {
    setIsLoadingProfessional(true);
    try {
      console.log("Update professional info:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Professional information updated successfully");
    } catch (error) {
      console.error("Update professional info error:", error);
      toast.error("Failed to update professional information");
    } finally {
      setIsLoadingProfessional(false);
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b bg-background px-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold">Profile Information</h1>
            <p className="text-sm text-muted-foreground">
              Update your personal information and profile picture
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <RefreshCw className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon">
            <Sun className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Picture Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Profile Picture</CardTitle>
                <CardDescription>
                  Update your profile picture to be recognized by your team.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={user?.image || ""}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="text-2xl bg-muted">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Recommended: Square JPG, PNG, or GIF, at least 1000x1000
                    pixels.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Account Settings</CardTitle>
                <CardDescription>
                  Manage your account credentials and verification.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-muted/50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email address cannot be changed directly. Please contact
                    support if you need to update it.
                  </p>
                </div>
                <div className="pt-2">
                  <Link href="/auth/change-password">
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Personal Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...personalForm}>
                  <form
                    onSubmit={personalForm.handleSubmit(onSubmitPersonal)}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={personalForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isLoadingPersonal}
                        className="bg-violet-500 hover:bg-violet-600"
                      >
                        {isLoadingPersonal ? "Saving..." : "Save Personal Info"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Professional Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Professional Information
                </CardTitle>
                <CardDescription>
                  Share your professional background and role.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...professionalForm}>
                  <form
                    onSubmit={professionalForm.handleSubmit(onSubmitProfessional)}
                    className="space-y-4"
                  >
                    <FormField
                      control={professionalForm.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Web developer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={professionalForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about yourself..."
                              className="min-h-[100px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isLoadingProfessional}
                        className="bg-violet-500 hover:bg-violet-600"
                      >
                        {isLoadingProfessional
                          ? "Saving..."
                          : "Save Professional Info"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
