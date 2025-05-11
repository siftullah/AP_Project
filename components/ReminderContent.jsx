;

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  Clock,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import ReminderLoader from "@/components/ReminderLoader";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Axios function to fetch reminders
const fetchReminders = async (userId) => {
  if (!userId) return [];

  const { data } = await axios.get(`/api/reminders?userId=${userId}`);
  return data;
};

// Axios function to create or update a reminder
const saveReminder = async (formData) => {
  const isEditing = !!formData.id;

  const { data } = await axios({
    method: isEditing ? "PUT" : "POST",
    url: "/api/reminders",
    data: formData,
  });

  return data;
};

// Axios function to delete a reminder
const deleteReminder = async (id) => {
  await axios.delete(`/api/reminders/${id}`);
};

export default function RemindersContent() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] =
    (useState < Reminder) | (null > null);
  const [formData, setFormData] =
    useState <
    ReminderFormData >
    {
      title: "",
      description: "",
      due_date: "",
    };

  // Fetch reminders using React Query
  const { data: reminders = [], isLoading } = useQuery({
    queryKey: ["reminders", user?.id],
    queryFn: () => fetchReminders(user?.id),
    enabled: !!user?.id,
  });

  // Mutation for creating/updating reminders
  const reminderMutation = useMutation({
    mutationFn: saveReminder,
    onSuccess: () => {
      toast({
        title: editingReminder ? "Reminder Updated" : "Reminder Created",
        description: editingReminder
          ? "Your reminder has been updated successfully."
          : "Your new reminder has been created.",
      });

      setIsModalOpen(false);
      setEditingReminder(null);
      setFormData({ title: "", description: "", due_date: "" });

      // Invalidate and refetch reminders
      queryClient.invalidateQueries({ queryKey: ["reminders", user?.id] });
    },
    onError: (error) => {
      console.error("Error saving reminder:", error);
      toast({
        title: "Error",
        description: axios.isAxiosError(error)
          ? error.response?.data?.error || "Failed to save reminder"
          : "Failed to save reminder. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Mutation for deleting reminders
  const deleteMutation = useMutation({
    mutationFn: deleteReminder,
    onSuccess: () => {
      toast({
        title: "Reminder Deleted",
        description: "Your reminder has been deleted successfully.",
      });

      // Invalidate and refetch reminders
      queryClient.invalidateQueries({ queryKey: ["reminders", user?.id] });
    },
    onError: (error) => {
      console.error("Error deleting reminder:", error);
      toast({
        title: "Error",
        description: "Failed to delete reminder. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    reminderMutation.mutate({
      ...formData,
      user_id: user?.id,
      id: editingReminder?.id,
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this reminder?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (reminder) => {
    setEditingReminder(reminder);
    setFormData({
      title: reminder.title,
      description: reminder.description,
      due_date: new Date(reminder.reminder_date).toISOString().slice(0, 16),
    });
    setIsModalOpen(true);
  };

  const isOverdue = (date) => {
    return new Date(date) < new Date();
  };

  const isToday = (date) => {
    const reminderDate = new Date(date);
    const today = new Date();
    return (
      reminderDate.getDate() === today.getDate() &&
      reminderDate.getMonth() === today.getMonth() &&
      reminderDate.getFullYear() === today.getFullYear()
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  if (isModalOpen) {
    return (
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="mx-auto container"
      >
        <Toaster />
        <Card className="bg-white shadow-sm border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-2"></div>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsModalOpen(false)}
                className="hover:bg-blue-50 text-gray-700 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="font-bold text-gray-900 text-2xl">
                {editingReminder ? "Edit Reminder" : "Create New Reminder"}
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-800">
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="border-blue-200 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-800">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="border-blue-200 focus:ring-blue-500 min-h-[120px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="due_date" className="text-gray-800">
                  Due Date
                </Label>
                <Input
                  id="due_date"
                  type="datetime-local"
                  value={formData.due_date}
                  onChange={(e) =>
                    setFormData({ ...formData, due_date: e.target.value })
                  }
                  className="border-blue-200 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="hover:bg-blue-50 border-blue-200 text-gray-700 hover:text-gray-800"
                >
                  Cancel
                </Button>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={reminderMutation.isPending}
                  >
                    {reminderMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></div>
                        <span>
                          {editingReminder ? "Updating..." : "Creating..."}
                        </span>
                      </div>
                    ) : (
                      <span>
                        {editingReminder
                          ? "Update Reminder"
                          : "Create Reminder"}
                      </span>
                    )}
                  </Button>
                </motion.div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div>
      <Toaster />
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-block mb-6"
      >
        <Button
          onClick={() => {
            setEditingReminder(null);
            setFormData({ title: "", description: "", due_date: "" });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="mr-2 w-4 h-4" />
          Add Reminder
        </Button>
      </motion.div>

      {isLoading ? (
        <ReminderLoader />
      ) : reminders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-blue-50 p-6 border border-blue-100 rounded-lg text-center"
        >
          <p className="mb-4 text-gray-700">
            You don&apos;t have any reminders yet.
          </p>
          <Button
            onClick={() => {
              setEditingReminder(null);
              setFormData({ title: "", description: "", due_date: "" });
              setIsModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="mr-2 w-4 h-4" />
            Create Your First Reminder
          </Button>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {reminders.map((reminder) => (
              <motion.div key={reminder.id} variants={itemVariants}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-white shadow-sm hover:shadow-md border-blue-100 h-full overflow-hidden transition-all">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-1"></div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-gray-900 text-xl">
                          {reminder.title}
                        </h3>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(reminder)}
                            className="hover:bg-blue-50 w-8 h-8 text-gray-600 hover:text-gray-800"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(reminder.id)}
                            className="hover:bg-red-50 w-8 h-8 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="mb-4 text-gray-700 line-clamp-3">
                        {reminder.description}
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-600">
                            {format(new Date(reminder.reminder_date), "PPp")}
                          </span>
                        </div>
                        {isOverdue(reminder.reminder_date) ? (
                          <Badge
                            variant="destructive"
                            className="flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3" /> Overdue
                          </Badge>
                        ) : isToday(reminder.reminder_date) ? (
                          <Badge className="bg-amber-500 hover:bg-amber-600">
                            Today
                          </Badge>
                        ) : (
                          <Badge className="bg-blue-600 hover:bg-blue-700">
                            Upcoming
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
