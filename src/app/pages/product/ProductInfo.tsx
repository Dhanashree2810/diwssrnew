import { FaRupeeSign } from "react-icons/fa";

interface ProductInfoProps {
  name: string;
  category: string;
  sku: string;
  specifications: string;
  regularPrice: number;
  salePrice: number;
  discountPercent: string;
}

export const ProductInfo = ({
  name,
  category,
  sku,
  specifications,
  regularPrice,
  salePrice,
  discountPercent,
}:ProductInfoProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">{name}</h1>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-red-600">{discountPercent}% OFF</span>
        <span className="flex items-center text-xl font-semibold">
          <FaRupeeSign size={15} className="mr-1" />
          {salePrice}
        </span>
      </div>
      <span className="text-gray-500">
        M.R.P.: <del className="line-through ml-1"><FaRupeeSign size={15} className="inline-block" />{regularPrice}</del>
      </span>
      <p className="text-sm text-gray-600">{category}</p>
      <p className="text-sm">SKU: <span className="font-semibold">{sku}</span></p>
      <p className="text-sm font-medium">{specifications}</p>
      <h2 className="text-2xl font-semibold">
        ₹ {regularPrice} <span className="text-sm font-normal">+ Free Shipping</span>
      </h2>
    </div>
  );
};

