import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery = ({ images }:ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [zoom, setZoom] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => setZoom(true);
  const handleMouseLeave = () => setZoom(false);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setCursorPosition({ x, y });
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={selectedImage}
          alt="Selected product image"
          layout="fill"
          objectFit="cover"
          className={`transition-transform duration-300 ${zoom ? "scale-150" : "scale-100"}`}
          style={{
            transformOrigin: `${cursorPosition.x}% ${cursorPosition.y}%`,
          }}
        />
      </div>
      <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 mt-4">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            width={70}
            height={70}
            alt={`Thumbnail ${index}`}
            onClick={() => setSelectedImage(img)}
            className={`w-16 h-16 rounded-lg cursor-pointer ${img === selectedImage ? 'border-2 border-blue-500' : 'border'}`}
          />
        ))}
      </div>
    </div>
  );
};

