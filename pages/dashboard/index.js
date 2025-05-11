import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const role = user?.publicMetadata["role"];

    if (role === "admin") {
      router.push("/administration");
    } else if (role === "student") {
      router.push("/student");
    } else if (role === "faculty") {
      router.push("/faculty");
    }
  }, [user, isLoaded, router]);

  return null;
}
