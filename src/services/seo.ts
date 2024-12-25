export interface SEOData {
    id: number;
    name: string;
    title: string;
    description?: string;
    keyWords: string;
    imageUrl: string;
  }
  
  export async function getProductSEOData(): Promise<SEOData[]> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Seo/SeoData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
          cache: "no-cache",
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  }
  

//   export const findSEOData = (seos: SEOData[], path: string): SEOData | undefined => {
//     console.log("Searching for SEO data with path:", path);
  
//     // Normalize the path and SEO name to remove leading/trailing slashes for accurate comparison
//     const normalizedPath = path.replace(/^\/|\/$/g, ""); // Remove leading and trailing slashes
  
//     console.log("Normalized Path:", normalizedPath); // Debugging the normalized path
  
//     // Try to find an exact match first
//     const exactMatch = seos.find((seo) => {
//       const normalizedSEOName = seo.name.replace(/^\/|\/$/g, ""); // Normalize SEO name as well
//       console.log("Comparing with SEO:", seo.name, "Normalized SEO:", normalizedSEOName); // Debugging the SEO names
//       return normalizedSEOName === normalizedPath;
//     });
  
//     if (exactMatch) {
//       console.log("Exact SEO Data Found:", exactMatch);
//       return exactMatch;
//     }
  
//     // No exact match, try to find the most specific match by splitting path into segments
//     const pathSegments = normalizedPath.split("/").filter(Boolean);
//     console.log("Path Segments:", pathSegments); // Debugging path segments
  
//     let bestMatch: SEOData | undefined;
//     let bestMatchScore = 0;
  
//     seos.forEach((seo) => {
//       const seoPath = seo.name.replace(/^\/|\/$/g, ""); // Normalize SEO name as well
//       const seoSegments = seoPath.split("/").filter(Boolean);
//       console.log("SEO Segments:", seoSegments); // Debugging SEO segments
  
//       let matchScore = 0;
  
//       // Compare each segment
//       for (let i = 0; i < seoSegments.length; i++) {
//         if (seoSegments[i] === pathSegments[i]) {
//           matchScore++;
//         } else {
//           break;
//         }
//       }
  
//       console.log("Match Score for SEO:", seo.name, "Score:", matchScore); // Debugging match score
  
//       // Update best match if a higher score is found
//       if (matchScore > bestMatchScore) {
//         bestMatch = seo;
//         bestMatchScore = matchScore;
//       }
//     });
  
//     if (bestMatch) {
//       console.log("Best SEO Data Found:", bestMatch);
//       return bestMatch;
//     }
  
//     // Fallback to root ("/") if no specific match is found
//     console.log("No specific match found, falling back to root.");
//     return seos.find((seo) => seo.name === "/");
//   };
  
  