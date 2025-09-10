"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageSlider({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return <p>No images available</p>;
  }

  const prevSlide = () => {
    if (images.length > 1) {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  const nextSlide = () => {
    if (images.length > 1) {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Image */}
      <div className="w-full h-64 relative">
        <Image
          src={images[currentIndex]}
          alt={`slide-${currentIndex}`}
          fill
          className="w-full h-60 object-contain"
          priority
        />
      </div>

      {/* Show buttons only if more than 1 image */}
      {images.length > 1 && (
        <>
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Show dots only if more than 1 image */}
      {images.length > 1 && (
        <div className="flex justify-center mt-2 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
