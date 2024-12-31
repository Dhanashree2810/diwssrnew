import ProductDetails from '@/app/pages/product/ProductDetails';
import { getProductLiveByIdData, getProductLiveData } from '@/services/product';
import { getProductSEOData } from '@/services/seo';
import ProductList from '../pages/product/ProductList';
import { redirect } from 'next/navigation';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ id?: string[] }>
}) {
  try {
    const Id = (await params).id || [];
    const seoName = Id.length === 0 ? Id[0] : Id.join('/');
    const seos = await getProductSEOData(seoName);
    const seoData = seos[0];
    // console.log("SEO Data:", seoData);

    if (seoData) {
      return {
        title: seoData?.title,
        description: seoData?.description,
        keywords: seoData?.keyWords,
        openGraph: {
          title: seoData?.title,
          description: seoData?.description,
          images: [
            {
              url: seoData?.imageUrl,
              alt: seoData?.title,
            },
          ],
        },
        twitter: {
          title: seoData.title,
          description: seoData.description,
          images: [seoData.imageUrl],
        },
      };
    }
    redirect('404')

    return {
      title: 'Default Product Title',
      description: 'Explore our product collection',
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    redirect('404')
    return {
      title: 'Default Product Title',
      description: 'Explore our product collection',
    };
  }
}

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ id?: string[] }>
}) => {
  const Id = (await params).id || [];
  // console.log("Id", Id);

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
