"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import type { Profile, ProfileUpdateData } from "@/app/faculty/types/profile";

const fetchProfile = async (): Promise<Profile> => {
  const { data } = await axios.get("/api/faculty/profile");
  return data;
};

const updateProfile = async (formData: ProfileUpdateData): Promise<Profile> => {
  const { data } = await axios.put("/api/faculty/profile", formData);
  return data;
};

const Profile = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState<ProfileUpdateData>({
    first_name: "",
    last_name: "",
  });

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["facultyProfile"],
    queryFn: fetchProfile,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        first_name: data.first_name,
        last_name: data.last_name,
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["facultyProfile"], data);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <div className="px-4 sm:px-0 py-6">
      <ToastContainer />
      <h2 className="mb-6 font-bold text-2xl">My Profile</h2>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="mb-4 w-32 h-32">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${data.first_name} ${data.last_name}`}
                alt={`${data.first_name} ${data.last_name}`}
              />
              <AvatarFallback>
                {data.first_name[0]}
                {data.last_name[0]}
              </AvatarFallback>
            </Avatar>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Personal Information</CardTitle>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                Edit Profile
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={isEditing ? formData.first_name : data.first_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={isEditing ? formData.last_name : data.last_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={data.email} disabled />
                </div>
                <div>
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" value={data.designation} disabled />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" value={data.department} disabled />
                </div>
                <div>
                  <Label htmlFor="university">University</Label>
                  <Input id="university" value={data.university} disabled />
                </div>
              </div>
              {isEditing && (
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
