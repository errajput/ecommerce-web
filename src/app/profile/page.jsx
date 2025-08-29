"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login"); // redirect if not logged in
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <p className="p-4">Loading...</p>;

  if (!user) return <p className="p-4">No user found</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
