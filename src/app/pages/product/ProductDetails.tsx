'use client';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { FaRupeeSign } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { CiHeart } from 'react-icons/ci';
import { FiFacebook } from 'react-icons/fi';
import { ImPinterest2 } from 'react-icons/im';
import { FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa6';
import { LuBadgeCheck } from "react-icons/lu";
import { BsBox } from "react-icons/bs";
import { LuRotateCcw } from "react-icons/lu";
import { IoLockClosedOutline } from "react-icons/io5";
import { globalStore, useUserLoginStore } from '../../../../globalstate';
import { cartQuantityUpdate } from '@/services/cart';
import {  Product } from '@/types/auth';


const ProductDetails = (props: { productData: Product}) => {
    const [userInfo] = useState({ role: "Farmer" });
    const [discountPercent, setDiscountPercent] = useState(0);
    const [productImages, setProductImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [zoom, setZoom] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const { setCartListList } = globalStore();
    const [userData, setUserData] = useState<number | undefined>();
    const [userToken, setUserToken] = useState<string | undefined>();
    const { userLoginInfo } = useUserLoginStore();
  
    const productData = props.productData;

    useEffect(() => {
        const userId = userLoginInfo?.userInfo?.[0]?.id;
        setUserData(userId);
        const token = userLoginInfo?.token;
        setUserToken(token);
    }, [userLoginInfo]);

    useEffect(() => {
        const discount =
      ((productData.regularPrice - productData.salePrice) /
        productData.regularPrice) *
      100;
    setDiscountPercent(Math.round(discount));

    // Set product images
    const images = productData.image ? [productData.image] : [];
    setProductImages(images);
    setSelectedImage(images[0] || null);
    }, [productData, userInfo.role]);

    const handleMouseEnter = () => {
        setZoom(true);
    };

    const handleMouseLeave = () => {
        setZoom(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { offsetX, offsetY, target } = e.nativeEvent;
        const rect = (target as HTMLDivElement).getBoundingClientRect();

        setCursorPosition({
            x: (offsetX / rect.width) * 100,
            y: (offsetY / rect.height) * 100,
        });
    };

    const product = useMemo(() => ({
        id: "1",
        category: 'Necklaces',
        name: '9ct White Gold 0.05cttw Diamond Circle Necklace',
        desc: "The necklace is crafted in 9K rose gold and features a band set with 0.05 CTW brilliant diamonds and a centerpiece of bright pink topaz on a diamond bezel frame.",
        price: 6950,
        sku: 'H3E4F5G6',
        ratings: 3.50,
        quantity: 1,
        terms: [
            { title: 'Price match promise', icon: <LuBadgeCheck /> },
            { title: 'Free delivery on all orders', icon: <BsBox /> },
            { title: 'Safe & secure transaction', icon: <IoLockClosedOutline /> },
            { title: 'Extended Christmas return policy', icon: <LuRotateCcw /> }
        ],
    }), []);

    useEffect(() => {
        setQuantities({ [product.id]: product.quantity });
    }, [product]);

   

    const handleIncrement = (id: string) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: prev![id] + 1,
        }));
    };

    const handleDecrement = (id: string) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(prev![id] - 1, 1),
        }));
    };

    const addToCart = async (item: Product) => {
        const cartItemData = {
            name: item.name,
            sku: item.sku,
            slug: item.slug,
            qty: item.minQty,
            regularPrice: item.regularPrice,
            salePrice: item.salePrice,
            actualSalePrice: item.salePrice,
            wogActualSalePrice: item.salePrice,
            regularShippingAmount: 0,
            actualShippingAmount: 0,
            couponDiscount: 0,
            igst: item.igst,
            sgst: item.sgst,
            cgst: item.cgst,
            totalGst: 0,
            totalAmount: item.salePrice * item.minQty,
            appUserId: userData,
            image: item.image,
            minQty: item.minQty,
            totalShippingAmount: 0,
        };

        try {
            const data = await cartQuantityUpdate(cartItemData, userToken);
            console.log("data", data);
            setCartListList(data);
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };

    return (
        <div className="relative w-full">
            <div className="w-full px-4 py-5 sm:px-8 sm:py-10 lg:px-48 lg:py-5 bg-[#FAF7F5]">
                <div className='bg-white'>

                    <div className="bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-10 p-10">
                            <div className="relative flex flex-col justify-start items-start">
                                <div className="relative">
                                    <div
                                        className="w-[200px] h-[200px] lg:w-[500px] lg:h-[400px] relative overflow-hidden"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onMouseMove={handleMouseMove}
                                    >
                                        {selectedImage ? (
                                            <Image
                                                src={selectedImage}
                                                alt="Selected product image"
                                                layout="fill"
                                                objectFit="cover"
                                                className={`cursor-pointer transition-transform duration-300 ${zoom ? "transform scale-125" : "transform scale-100"}`}
                                                style={{
                                                    transformOrigin: `${cursorPosition.x}% ${cursorPosition.y}%`,
                                                    transition: "transform 0.3s ease",
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                <p>No image available</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 lg:gap-4 mt-4">
                                    {productImages.map((img, index) => (
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

                            <div>
                                <div className="flex flex-col mb-4 ga-2">
                                    <div className="flex flex-col mb-4">
                                        <div>
                                            <h1 className=' text-xl font-semibold'>{productData?.name}</h1>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-red-600">
                                                {discountPercent}%
                                            </span>
                                            <span className="flex items-center">
                                                <FaRupeeSign size={15} className="mr-1" />
                                                <span className="text-xl font-semibold">
                                                    {productData?.salePrice}
                                                </span>
                                            </span>
                                        </div>
                                        <span className="text-gray-500">
                                            M.R.P.:
                                            <del className="line-through ml-1">
                                                <FaRupeeSign size={15} className="inline-block" />
                                                {Math.floor(productData?.regularPrice || 0)}
                                            </del>
                                        </span>
                                    </div>

                                    <div className="mb-3">
                                        <h1 className="text-sm font-normal text-gray-600 py-2">{productData.category}</h1>
                                        <div className=' flex flex-row items-center gap-4'>
                                            <h2 className='font-normal text-sm py-2 text-gray-400'>
                                                SKU:
                                            </h2>
                                            <span className='text-lg font-semibold text-black'>
                                                {productData.sku}
                                            </span>
                                        </div>
                                        <div>
                                            <h2 className=' text-sm font-medium py-3'>{productData.specifications}</h2>
                                        </div>
                                    </div>
                                    <div className=' flex flex-col justify-start items-start mb-3'>
                                        <h1 className="text-black font-semibold text-xl lg:text-3xl">
                                            ₹ {Math.floor(productData?.regularPrice || 0)}
                                            <span className=' text-sm font-normal'> + Free Shipping</span>
                                        </h1>

                                    </div>
                                    <div>
                                        <p className=' text-xs lg:text-sm'>{product.desc}</p>
                                    </div>

                                    <div className="flex flex-row gap-4 my-4">
                                        <Button
                                            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            onClick={() => handleDecrement(product.id)}
                                            disabled={quantities[product.id] <= 1}
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="text-gray-600" />
                                        </Button>
                                        <Input
                                            type="number"
                                            value={quantities[product.id]}
                                            readOnly
                                            className="w-16 text-center border border-gray-300 rounded-md"
                                            aria-label="Quantity"
                                        />
                                        <Button
                                            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                                            onClick={() => handleIncrement(product.id)}
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="text-gray-600" />
                                        </Button>
                                        <div onClick={() => addToCart(productData)}>
                                            <Button className="bg-black text-white h-10 w-30 lg:w-60 rounded-xl hover:bg-white hover:text-black">
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </div>

                                    <div>
                                        <Link href="/wishlist">
                                            <div className="flex flex-row items-center gap-2 text-sm lg:text-[16px] font-semibold">
                                                <CiHeart size={30} /> Add to wishlist
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-gray-900 font-semibold"></h3>
                                    <ul className="list-disc pl-5 text-gray-700 text-sm font-normal leading-8 ">
                                        {product.terms.map((offer, index) => (
                                            <li key={index} className=' flex gap-2 items-center'>
                                                {offer.icon}
                                                {offer.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className=" flex flex-row items-center">
                                    <div className=" flex text-sm">Share this product:</div>
                                    <div className=" flex  gap-2 mt-2 lg:mt-0">
                                        <FiFacebook className="rounded-full p-2 text-black bg-transparent hover:bg-black hover:text-white hover:cursor-pointer" size={35} />
                                        <FaTwitter className="rounded-full p-2 text-black bg-transparent hover:bg-black hover:text-white hover:cursor-pointer" size={35} />
                                        <ImPinterest2 className="rounded-full p-2 text-black bg-transparent hover:bg-black hover:text-white hover:cursor-pointer" size={35} />
                                        <FaLinkedin className="rounded-full p-2 text-black bg-transparent hover:bg-black hover:text-white hover:cursor-pointer" size={35} />
                                        <FaWhatsapp className="rounded-full p-2 text-black bg-transparent hover:bg-black hover:text-white hover:cursor-pointer" size={35} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
