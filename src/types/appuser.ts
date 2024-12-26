

export interface HomeCommonData {
    summaryData: SummaryData[];
    topData: DataItem[];
    lastData: DataItem[];
  }
  
  export interface HtmlData {
    htmlData: HtmlItem[];
  }
  
  export interface HomeUserData {
    summaryData: SummaryData[];
    topData: DataItem[];
    lastData: DataItem[];
  }
  
  export interface SummaryData {
    total: number;
    maxNo: number;
    minNo: number;
    avgNo: number;
  }
  
  export interface DataItem {
    id: number;
    name: string;
  }
  
  export interface HtmlItem {
    name: string;
    html: string;
  }

  export  interface CombinedData {
    homeCommonData: HomeCommonData;
    html: HtmlData;
    homeUserData: HomeUserData;
  }
  

  export interface User {
    pincode: string;
    address: string;
    addressLine: string;
    verifyShop: string;
    gst: string;
    gstOtp: string;
    defaultLanguage: string;
    shopName: string;
    createDate: string;
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    mobile: string;
    mobileVerified: boolean;
    emailId: string;
    emailVerified: boolean;
    password: string;
    state: string;
    district: string;
    gstCertificate: string;
    photoShopFront: string;
    visitingCard: string;
    cheque: string;
    isActive: boolean;
    isAdmin: boolean;
    hasImpersonateAccess: boolean;
    photoAttachment: string;
    role: string;
    roleLabel: string;
    publish: string;
    publishLabel: string;
    lastLogin: string;
    isPremiumUser: boolean;
    totalPlot: number;
  }
  