import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  FileUp,
  MessageSquare,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Loader from "./_components/Loader";
import axios from "axios";
import StudentLayout from "@/components/layouts/StudentLayout";

const CreateDiscussion = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("general");
  const [forumId, setForumId] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [file, setFile] = useState(null);

  // State for managing loading, data and errors
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableGroups, setAvailableGroups] = useState(null);
  const [searchResults, setSearchResults] = useState({ students: [] });
  const [error, setError] = useState(null);

  // Fetch available groups
  useEffect(() => {
    const fetchAvailableGroups = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          "/api/student/discussions/available-groups"
        );
        setAvailableGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
        setError(
          error.response?.data?.error || "Failed to fetch available groups"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableGroups();
  }, []);

  // Search for students when query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ students: [] });
      return;
    }

    const searchStudents = async () => {
      try {
        const { data } = await axios.get(
          `/api/student/discussions/search-students?query=${encodeURIComponent(
            searchQuery
          )}`
        );
        setSearchResults(data);
      } catch (error) {
        console.error("Error searching students:", error);
      }
    };

    const debounceTimer = setTimeout(searchStudents, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", type);

      if (type === "general" && forumId) {
        formData.append("forumId", forumId);
      }

      if (type === "private") {
        formData.append("groupName", newGroupName);
        selectedMembers.forEach((memberId) => {
          formData.append("members[]", memberId);
        });
      }

      if (file) {
        formData.append("attachment", file);
      }

      await axios.post("/api/student/discussions/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Redirect on success
      router.push("/student/discussions");
    } catch (error) {
      console.error("Error creating discussion:", error);
      setError(error.response?.data?.error || "Failed to create discussion");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-50/30 to-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-6">
          <motion.div
            whileHover={{ x: -3 }}
            whileTap={{ x: -6 }}
            className="inline-block"
          >
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center hover:bg-blue-50 text-gray-700 hover:text-gray-800"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Discussions
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card className="bg-white shadow-sm border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-2"></div>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <MessageSquare className="w-5 h-5 text-gray-700" />
                Create New Discussion
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-800">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter discussion title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    placeholder="Enter discussion description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-blue-200 focus:ring-blue-500 min-h-[150px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-gray-800">
                    Discussion Type
                  </Label>
                  <Select
                    onValueChange={(value) => setType(value)}
                    defaultValue="general"
                  >
                    <SelectTrigger className="border-blue-200 focus:ring-blue-500">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="private">Private Group</SelectItem>
                      <SelectItem value="batch">Batch</SelectItem>
                      <SelectItem value="department">Department</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {type === "general" && (
                  <div className="space-y-2">
                    <Label htmlFor="forum" className="text-gray-800">
                      Forum
                    </Label>
                    <Select onValueChange={setForumId}>
                      <SelectTrigger className="border-blue-200 focus:ring-blue-500">
                        <SelectValue placeholder="Select forum" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableGroups?.forums.map((forum) => (
                          <SelectItem key={forum.id} value={forum.id}>
                            {forum.forum_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {type === "batch" && (
                  <div className="space-y-2">
                    <Label className="text-gray-800">Batch</Label>
                    <div className="bg-blue-50 p-3 border border-blue-100 rounded-md">
                      {availableGroups?.batch ? (
                        <div className="flex items-center gap-2">
                          <Badge className="bg-amber-600">
                            {availableGroups.batch.name}
                          </Badge>
                          <p className="text-gray-700 text-sm">
                            Your discussion will be visible to all students in
                            your batch.
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-700 text-sm">
                          No batch assigned to your account.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {type === "department" && (
                  <div className="space-y-2">
                    <Label className="text-gray-800">Department</Label>
                    <div className="bg-blue-50 p-3 border border-blue-100 rounded-md">
                      {availableGroups?.department ? (
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-600">
                            {availableGroups.department.name}
                          </Badge>
                          <p className="text-gray-700 text-sm">
                            Your discussion will be visible to all students in
                            your department.
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-700 text-sm">
                          No department assigned to your account.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {type === "private" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="newGroupName" className="text-gray-800">
                        Group Name
                      </Label>
                      <Input
                        id="newGroupName"
                        placeholder="Enter new group name"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        className="border-blue-200 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-800">
                        <Users className="w-4 h-4" />
                        Group Members
                      </Label>

                      {selectedMembers.length > 0 && (
                        <div className="flex flex-wrap gap-2 bg-blue-50 p-3 border border-blue-200 rounded-md">
                          {selectedMembers.map((memberId) => {
                            const user = searchResults.students.find(
                              (u) => u.id === memberId
                            );
                            return (
                              <div
                                key={memberId}
                                className="flex items-center gap-2 bg-white px-3 py-1 border border-blue-200 rounded-full"
                              >
                                <span className="text-gray-700 text-sm">
                                  {user?.first_name} {user?.last_name}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedMembers((prev) =>
                                      prev.filter((id) => id !== memberId)
                                    )
                                  }
                                  className="rounded-full text-gray-500 hover:text-gray-700"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="relative">
                        <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-500 -translate-y-1/2" />
                        <Input
                          placeholder="Search members by name..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9 border-blue-200 focus:ring-blue-500"
                        />
                      </div>

                      {searchQuery && searchResults.students.length > 0 && (
                        <div className="bg-white p-2 border border-blue-200 rounded-md max-h-48 overflow-y-auto">
                          {searchResults.students.map((user) => (
                            <div
                              key={user.id}
                              className="flex items-center space-x-2 hover:bg-blue-50 p-2 rounded-md"
                            >
                              <Checkbox
                                id={user.id}
                                checked={selectedMembers.includes(user.id)}
                                onCheckedChange={(checked) => {
                                  setSelectedMembers((prev) =>
                                    checked
                                      ? [...prev, user.id]
                                      : prev.filter((id) => id !== user.id)
                                  );
                                }}
                                className="data-[state=checked]:bg-blue-600 border-blue-300 data-[state=checked]:border-blue-600"
                              />
                              <label
                                htmlFor={user.id}
                                className="flex-1 text-gray-800 text-sm cursor-pointer"
                              >
                                {user.first_name} {user.last_name}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}

                      {searchQuery && searchResults.students.length === 0 && (
                        <p className="mt-1 text-gray-600 text-sm">
                          No members found. Try a different search term.
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="attachment" className="text-gray-800">
                    Attachment (Optional)
                  </Label>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="attachment"
                      className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 border border-blue-200 rounded-md text-gray-700 transition-colors cursor-pointer"
                    >
                      <FileUp className="w-4 h-4" />
                      <span>{file ? "Change File" : "Upload File"}</span>
                    </label>
                    <Input
                      id="attachment"
                      type="file"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    {file && (
                      <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 border border-blue-100 rounded-md">
                        <span className="max-w-[200px] text-gray-700 text-sm truncate">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
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
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></div>
                          <span>Creating...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          <span>Create Discussion</span>
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

CreateDiscussion.getLayout = (page) => <StudentLayout>{page}</StudentLayout>;

export default CreateDiscussion;
