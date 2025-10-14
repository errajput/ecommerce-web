"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { getUserProfile, updateUserProfile } from "@/services/user.service";
import { logoutUser, removeToken } from "@/services/http.service";
import Button from "@/ui/Button";
import { UserContext } from "@/providers";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addressFormData, setAddressFormData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const { setUser: setUserInContext } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
        setAddressFormData({
          name: profile.address?.name || "",
          phone: profile.address?.phone || "",
          street: profile.address?.street || "",
          city: profile.address?.city || "",
          state: profile.address?.state || "",
          pincode: profile.address?.pincode || "",
          country: profile.address?.country || "",
        });
      } catch (err) {
        console.error("Error fetching user:", err.message);
        removeToken();
        router.push("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const handleSave = async () => {
    try {
      const dataToUpdate = {
        address: addressFormData,
        name: user.name,
      };
      const updated = await updateUserProfile(dataToUpdate);
      setUser((prev) => ({
        ...prev,
        ...updated,
      }));
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Error updating profile:", err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-700">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <p className="text-lg font-semibold text-red-600">No user found</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-6 sm:p-8 text-center">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-green-700 mb-6">
          Profile 👤
        </h1>

        {/* User Info */}
        <div className="space-y-2 text-gray-700 text-sm sm:text-base">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="break-words">
            <span className="font-semibold">Address:</span>{" "}
            {user?.address?.country
              ? `${user.address.name}, ${user.address.street}, ${user.address.city}, ${user.address.state} - ${user.address.pincode}, ${user.address.country}`
              : "Not added"}
          </p>

          <Button
            label="Edit"
            onClick={() => setIsDialogOpen(true)}
            className="w-full h-11 !bg-blue-500 hover:!bg-blue-600 mt-2"
          />
        </div>

        {/* Seller button */}
        {user.isSeller && (
          <Link
            href="/products/add"
            className="mt-4 block w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Add Product
          </Link>
        )}

        {/* Links */}
        <div className="mt-6 space-y-3">
          <Link
            href="/cart"
            className="block w-full bg-green-500 text-white font-semibold p-3 rounded-lg hover:bg-green-600 transition"
          >
            🛒 My Cart
          </Link>
          <Link
            href="/orders"
            className="block w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition"
          >
            📦 My Orders
          </Link>
        </div>

        {/* Logout Button */}
        <Button
          label={"Logout"}
          onClick={() => {
            logoutUser();
            setUserInContext({ isLogin: false, isSeller: false });
            router.push("/login");
          }}
          className="mt-6 w-full h-9 sm:h-11 sm:w-35 !bg-gray-400 hover:!bg-gray-500"
        />
      </div>

      {/* Responsive Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/20 p-4 sm:p-0">
          <div className="bg-purple-100 p-4 sm:p-6 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">
              Edit Profile
            </h2>

            <div className="space-y-3 overflow-y-auto max-h-[70vh]">
              {[
                "name",
                "phone",
                "street",
                "city",
                "state",
                "pincode",
                "country",
              ].map((field) => (
                <input
                  key={field}
                  type="text"
                  value={addressFormData[field]}
                  onChange={(e) =>
                    setAddressFormData({
                      ...addressFormData,
                      [field]: e.target.value,
                    })
                  }
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-purple-400 outline-none text-sm sm:text-base"
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-5 sm-2">
              <Button
                label="Cancel"
                onClick={() => setIsDialogOpen(false)}
                className="w-full sm:w-24 !bg-gray-400 hover:!bg-gray-500"
              />
              <Button
                label="Save"
                onClick={handleSave}
                className="w-full sm:w-24 !bg-green-500 hover:!bg-green-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
