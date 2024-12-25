'use client';
import { useState, useEffect, useCallback } from 'react';
import { useUserStore } from '../../../../globalstate';
import PageHeader from '@/components/custom/PageHeader';
import SearchBox from '@/components/custom/SearchBox';
import ProductCard from './ProductCard';
import LoginDialog from './LoginDialog';
import { Product } from '@/types/auth';

const ProductList = ({ productData }: { productData: Promise<Product[]> }) => {
  const [trendingProductList, setTrendingProductList] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { loginUserInfo } = useUserStore();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await productData;
      setTrendingProductList(data.sort((a, b) => b.id - a.id));
    };
    fetchData();
  }, [productData]);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const filteredTrendingProduct = trendingProductList.filter((product: Product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateDiscountPercent = useCallback((regularPrice: number, salePrice: number) => {
    if (regularPrice > 0 && salePrice < regularPrice) {
      return Number(((regularPrice - salePrice) / regularPrice * 100).toFixed(2));
    }
    return 0;
  }, []);

  const addDeliverData = useCallback((item: Product) => {
    if (item && item.deliveredData && !item.totalDeliverProductAdded) {
      const formattedData = item.deliveredData.trim();
      let additionalDelivered = parseInt(formattedData.startsWith('+') ? formattedData.substring(1) : formattedData);
      if (isNaN(additionalDelivered)) {
        additionalDelivered = 0;
      }
      item.totalDeliverProduct = isNaN(item.totalDeliverProduct) ? 0 : item.totalDeliverProduct;
      item.totalDeliverProduct += additionalDelivered;
      item.totalDeliverProductAdded = true;
    }
    return `${item.totalDeliverProduct}`;
  }, []);

  return (
    <>
      <PageHeader title="Trending Products" />
      <div className="mx-4">
        <SearchBox searchQuery={searchQuery} setSearchQuery={handleSearch} placeholder="Search Products" />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {filteredTrendingProduct.map((item: Product) => {
            const discountPercent = loginUserInfo?.[0]?.role === 'DEALER'
              ? calculateDiscountPercent(item.regularPrice, item.salePrice)
              : calculateDiscountPercent(item.regularPrice, item.salePriceFarmer);

            return (
              <ProductCard
                key={item.id}
                item={item}
                discountPercent={discountPercent}
                addDeliverData={addDeliverData}
              />
            );
          })}
        </div>
      </div>

      <LoginDialog
        showLoginPopup={showLoginPopup}
        setShowLoginPopup={setShowLoginPopup}
      />
    </>
  );
};

export default ProductList;

