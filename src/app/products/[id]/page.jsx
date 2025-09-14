"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ImageSlider from "@/Components/ImageSlider";
import { useRouter } from "next/navigation";
import Header from "@/Components/Header";
import { formatPrice, formatStock } from "@/utils/format";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(undefined);
  // const [role, setRole] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        console.log("Product API response:", data);
        setProduct(data.data);
      })
      .catch((err) => {
        console.error(err);
        setProduct(null);
      });
    // const user = JSON.parse(localStorage.getItem("user"));
    // if (user?.role) setRole(user.role);
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // authentication:
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          product: product._id,
          quantity: 1,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to add to cart");

      alert(" Product added to cart!");
      console.log("Cart response:", result);
    } catch (err) {
      console.error(" Cart error:", err);
      alert(err.message);
    }
  };

  const goToCart = () => {
    router.push("/cart");
  };

  // const handleDelete = async () => {
  //   if (!confirm("Are you sure you want to delete this product?")) return;
  //   try {
  //     const res = await fetch(`http://localhost:5000/products/${product._id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.message || "Delete failed");
  //     alert("🗑️ Product deleted successfully");
  //     router.push("/");
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };

  if (product === undefined) return <p className="text-center">Loading...</p>;
  if (product === null)
    return <p className="text-center text-red-500">Product not found</p>;

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto p-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
          {/*  Left: Image Slider */}
          <div className="flex justify-center items-start">
            <ImageSlider
              images={
                product.images?.length
                  ? product.images.map((i) => `http://localhost:5000${i}`)
                  : []
              }
            />
          </div>

          {/*  Right: Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <p className="text-2xl text-green-600 font-semibold mb-4">
              <strong>Price:</strong> {formatPrice(product.price)}
            </p>

            <p className="mb-2">
              <strong>Description:</strong>{" "}
              <span className="text-gray-700">{product.description}</span>
            </p>
            <p className="mb-2">
              <strong>Brand:</strong> {product.brand}
            </p>
            <p className="mb-2">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {product.status}
            </p>
            <p className="mb-2">
              <strong>Stock:</strong> {formatStock(product.stock)}
            </p>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                className="mt-4 bg-blue-400 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition cursor-pointer"
              >
                Add to Cart
              </button>
              <button
                onClick={goToCart}
                className=" mt-4 bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition cursor-pointer"
              >
                Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import ImageSlider from "@/Components/ImageSlider";
// import Header from "@/Components/Header";

// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [product, setProduct] = useState(undefined);
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     // fetch product
//     fetch(`http://localhost:5000/products/${id}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch product");
//         return res.json();
//       })
//       .then((data) => {
//         setProduct(data.data);
//       })
//       .catch((err) => {
//         console.error(err);
//         setProduct(null);
//       });

//     // get role from localStorage
//     const storedUser = localStorage.getItem("user");
//     if (storedUser && storedUser !== "undefined") {
//       try {
//         const user = JSON.parse(storedUser);
//         if (user?.role) setRole(user.role);
//       } catch (err) {
//         console.error("Failed to parse user from localStorage", err);
//       }
//     }
//   }, [id]);

//   const handleAddToCart = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/cart/items", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({
//           product: product._id,
//           quantity: 1,
//         }),
//       });

//       const result = await res.json();
//       if (!res.ok) throw new Error(result.message || "Failed to add to cart");

//       alert("✅ Product added to cart!");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const goToCart = () => {
//     router.push("/cart");
//   };

//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete this product?")) return;
//     try {
//       const res = await fetch(`http://localhost:5000/products/${product._id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Delete failed");
//       alert("🗑️ Product deleted successfully");
//       router.push("/");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (product === undefined) return <p className="text-center">Loading...</p>;
//   if (product === null)
//     return <p className="text-center text-red-500">Product not found</p>;

//   return (
//     <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
//       <Header />
//       <div className="max-w-6xl mx-auto p-6 mt-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
//           {/* Left: Image Slider */}
//           <div className="flex justify-center items-start">
//             <ImageSlider
//               images={
//                 product.images?.length
//                   ? product.images.map((i) => `http://localhost:5000${i}`)
//                   : []
//               }
//             />
//           </div>

//           {/* Right: Product Info */}
//           <div>
//             <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//             <p className="text-2xl text-green-600 font-semibold mb-4">
//               ₹{product.price}
//             </p>

//             <p className="mb-2">
//               <strong>Description:</strong>{" "}
//               <span className="text-gray-700">{product.description}</span>
//             </p>
//             <p className="mb-2">
//               <strong>Brand:</strong> {product.brand}
//             </p>
//             <p className="mb-2">
//               <strong>Category:</strong> {product.category}
//             </p>
//             <p className="mb-2">
//               <strong>Status:</strong> {product.status}
//             </p>
//             <p className="mb-2">
//               <strong>Stock:</strong> {product.stock}
//             </p>

//             {/* User buttons */}
//             <div className="flex gap-4 mt-6">
//               <button
//                 onClick={handleAddToCart}
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition cursor-pointer"
//               >
//                 Add to Cart
//               </button>
//               <button
//                 onClick={goToCart}
//                 className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition cursor-pointer"
//               >
//                 View Cart
//               </button>
//             </div>

//             {/* ✅ Admin-only controls */}
//             {role === "admin" && (
//               <div className="flex gap-4 mt-6">
//                 <button
//                   onClick={() => router.push(`/products/${product._id}/edit`)}
//                   className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition cursor-pointer"
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition cursor-pointer"
//                 >
//                   🗑️ Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
