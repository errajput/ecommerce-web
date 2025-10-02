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
    //useEffect itself can’t be async, Immediately Invoked Function Expression
    (async () => {
      try {
        const profile = await getUserProfile();
        console.log("profile", profile);

        setUser(profile);
        setAddressFormData({
          name: profile.address.name || "",
          phone: profile.address?.phone || "",
          street: profile.address?.street || "",
          city: profile.address?.city || "",
          state: profile.address?.state || "",
          pincode: profile.address?.pincode || "",
          country: profile.address?.country || "",
        });
      } catch (err) {
        console.error("Error fetching user:", err.message);
        // setAddressFormData({
        //   name: profile.name,
        //   address: profile.address || "",
        // });
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
        <p className="text-lg font-semibold text-gray-700">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
        <p className="text-lg font-semibold text-red-600">No user found</p>
      </div>
    );
  }

  return (
    <div className="h-100 flex items-center justify-center m-12">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-extrabold text-green-700 mb-6">
          Profile 👤
        </h1>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>

          <p>
            <span className="font-semibold">Address:</span>{" "}
            {user?.address?.country
              ? `${user.address.name}, ${user.address.street}, ${user.address.city}, ${user.address.state} - ${user.address.pincode}, ${user.address.country}`
              : "Not added"}
          </p>
          <Button
            label="Edit"
            onClick={() => {
              // setAddressFormData({
              //   name: user.name,
              //   address: user.address || "",
              // });
              setIsDialogOpen(true);
            }}
            className="mt-4 w-32 !bg-blue-500 hover:!bg-blue-600"
          />
        </div>

        {user.isSeller && (
          <Link
            href="/products/add"
            className="block w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Add Product
          </Link>
        )}

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
        <Button
          label={"Logout"}
          onClick={() => {
            logoutUser();
            setUserInContext({ isLogin: false, isSeller: false });
            router.push("/login");
          }}
          className="mt-6 w-40 !bg-gray-400  hover:!bg-gray-500 "
        />
      </div>
      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0  flex items-center justify-center z-50 backdrop-blur-sm bg-transparent">
          <div className="bg-purple-200 p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            {JSON.stringify(addressFormData, null, 2)}
            <div className="space-y-3">
              <input
                type="text"
                value={addressFormData.name}
                onChange={(e) =>
                  setAddressFormData({
                    ...addressFormData,
                    name: e.target.value,
                  })
                }
                placeholder="Full Name"
                className="w-full border rounded p-2 focus:ring-1 focus:ring-purple-500"
              />
              <input
                type="text"
                value={addressFormData.phone}
                onChange={(e) =>
                  setAddressFormData({
                    ...addressFormData,
                    phone: e.target.value,
                  })
                }
                placeholder="Phone"
                className="w-full border rounded p-2 focus:ring-1 focus:ring-purple-500"
              />
              <input
                type="text"
                value={addressFormData.street}
                onChange={(e) =>
                  setAddressFormData({
                    ...addressFormData,
                    street: e.target.value,
                  })
                }
                placeholder="Street"
                className="w-full border rounded p-2 focus:ring-1 focus:ring-purple-500"
              />
              <input
                type="text"
                value={addressFormData.city}
                onChange={(e) =>
                  setAddressFormData({
                    ...addressFormData,
                    city: e.target.value,
                  })
                }
                placeholder="City"
                className="w-full border rounded p-2 focus:ring-1 focus:ring-purple-500"
              />
              <input
                type="text"
                value={addressFormData.state}
                onChange={(e) =>
                  setAddressFormData({
                    ...addressFormData,
                    state: e.target.value,
                  })
                }
                placeholder="State"
                className="w-full border rounded p-2 focus:ring-1 focus:ring-purple-500"
              />
              <input
                type="text"
                value={addressFormData.pincode}
                onChange={(e) =>
                  setAddressFormData({
                    ...addressFormData,
                    pincode: e.target.value,
                  })
                }
                placeholder="Pincode"
                className="w-full border rounded p-2 focus:ring-1 focus:ring-purple-500"
              />
              <input
                type="text"
                value={addressFormData.country}
                onChange={(e) =>
                  setAddressFormData({
                    ...addressFormData,
                    country: e.target.value,
                  })
                }
                placeholder="Country"
                className="w-full border rounded p-2 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button
                label="Cancel"
                onClick={() => setIsDialogOpen(false)}
                className="w-24 !bg-gray-400 hover:!bg-gray-500"
              />
              <Button
                label="Save"
                onClick={handleSave}
                className="w-24 !bg-green-500 hover:!bg-green-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
