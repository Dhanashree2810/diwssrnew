import ProductDetails from '@/app/pages/product/ProductDetails';
import { getProductLiveByIdData, getProductLiveData } from '@/services/product';
import { getProductSEOData } from '@/services/seo';
import ProductList from '../pages/product/ProductList';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id?: string[] }>
}) {
  const seos = await getProductSEOData();
  const Id = (await params).id || [];
  const seoName = Id.length === 0 ? 'product' : Id.join('/');
  const seoData = seos.find((seo) => seo.name === seoName);

  console.log("SEO Data:", seoData);

  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keyWords,
      openGraph: {
        title: seoData.title,
        description: seoData.description,
        images: [
          {
            url: seoData.imageUrl,
            alt: seoData.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: seoData.title,
        description: seoData.description,
        images: [seoData.imageUrl],
      },
    };
  }

  return {
    title: 'Default Product Title',
    description: 'Explore our product collection',
  };
}

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ id?: string[] }>
}) => {
  const Id = (await params).id || [];
  console.log("Id", Id);

  let content;
  if (Id.length === 1) {
    const productData = await getProductLiveData();
    content = <ProductList productData={productData} />;
  } else if (Id.length === 2) {
    const productDetailData = await getProductLiveByIdData(Id[1]);
    content = <ProductDetails productData={productDetailData} />;
  } else {
    content = <p>Invalid Product ID or structure</p>;
  }

  return (
    <section>
      <div className="mt-20">
        {content}
      </div>
    </section>
  );
};

export default EditProductPage;
