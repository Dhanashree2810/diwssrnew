import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import logo from '@/assets/images/logo.png';
import { Product } from '@/types/auth';

interface ProductCardProps {
  item: Product;
  discountPercent: number;
  addDeliverData: (item: Product) => string;
}

const ProductCard = memo(({ item, discountPercent, addDeliverData }: ProductCardProps) => {
  const imageUrls = item.image
    ? item.image.split(',').map((url: string) => url.trim())
    : [];

  return (
    <div className="p-3 border border-gray-200 bg-white shadow-md rounded-md">
      <Link href={`/product/${item.id}`}>
        <div className="flex justify-between items-center">
          <div>
            <Image
              src={logo}
              alt="Logo"
              width={50}
              height={50}
            />
          </div>
        </div>
        <div className="mt-2 flex justify-center items-center">
          {item?.image && (
            <Image
              src={imageUrls[0]}
              alt={item.name}
              width={150}
              height={150}
              loading="lazy"
            />
          )}
        </div>
        <div className="mt-1 pt-3">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h3>
          {item.size && <small className="size"><span className="fw-600">{item.size}</span></small>}
          {discountPercent > 1 && (
            <p className="mt-1 text-xs bg-green-700 w-fit flex items-center justify-center text-white px-2 py-1 rounded-md text-center">
              Upto {discountPercent}% off
            </p>
          )}
          <p className="mt-2 text-xs text-gray-700 font-semibold">
            <span className="text-green-600">{addDeliverData(item)} + </span>
            Products Delivered
          </p>
        </div>
      </Link>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;

