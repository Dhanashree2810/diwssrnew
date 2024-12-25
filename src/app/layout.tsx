import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavbarPage from "@/components/custom/Navbar";
import { getProductSEOData } from "@/services/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}): Promise<Metadata> {
  try {
    // const headerList = headers();
    // console.log("headerList",headerList);

    // const pathname = (await headerList).get("x-current-path");

    // console.log("pathname", pathname);

    // const slug = params.slug ? '/' + params.slug.join("/") : "/";
    // console.log("Constructed path:", params.slug);

    // const seos = await getProductSEOData();
    // console.log("Fetched SEO data count:", seos.length);

    // const seoData = seos.find((seo) => seo.name === slug);
    // console.log("SEO Data Found:", seoData);

    // if (seoData) {
    //   return {
    //     title: seoData.title,
    //     description: seoData.description || "",
    //     keywords: seoData.keyWords,
    //     openGraph: {
    //       title: seoData.title,
    //       description: seoData.description || "",
    //       images: [
    //         {
    //           url: seoData.imageUrl,
    //           alt: seoData.title,
    //         },
    //       ],
    //     },
    //     twitter: {
    //       card: "summary_large_image",
    //       title: seoData.title,
    //       description: seoData.description || "",
    //       images: [seoData.imageUrl],
    //     },
    //   };
    // }

    // console.log(`No SEO data found for path: ${slug}`);
    return {
      title: "Default Title",
      description: "Default description",
    };
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    return {
      title: "Error",
      description: "An error occurred while generating metadata.",
    };
  }
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen overflow-y-auto bg-background font-sans antialiased",
          poppins.variable
        )}
      >
        <div className="flex flex-col">
          <NavbarPage />
          <main className="flex flex-1 flex-col bg-gray-50">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
