export interface UserInfo {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    emailId: string;
    lastLogin: string;
    mobile: string;
    isAdmin: boolean;
    role: string;
    address: string;
    photoAttachment: string;
    state: string;
    district: string;
    isPremiumUser: boolean;
    totalPlot: number;
  }
  
  export interface LoginResponse {
    token: string;
    userInfo: UserInfo[];
    expireDate: string;
  }
  
  export interface LoginFormProps {
    onCloseDialog: () => void;
  }
  
  export interface LoginPayload {
    emailId: string;
    pin: string;
  }
  
  export interface LoginErrors {
    email?: string;
    password?: string;
  }
  
  
  export interface Product {
    id: number;
    name: string;
    slug: string;
    sku: string;
    image: string;
    size: string;
    specifications: string;
    shippingAmount: number;
    regularPrice: number;
    salePrice: number;
    sgst: number;
    igst: number;
    cgst: number;
    categoryId: string;
    productStatus: string;
    productStatusLabel: string;
    relatedProduct: string;
    category: string;
    minQty: number;
    minQtyFarmer: number;
    salePriceFarmer: number;
    isActive: boolean;
    orderNo: number;
    deliveredData: string;
    totalDeliverProduct: number;
    isParent: boolean;
    variableLabel: string;
    variableValue: string;
    isLimitedSale: boolean;
    comment: string;
    totalDeliverProductAdded?: boolean;
    
  }

  export interface CartItemData {
    name: string;
    sku: string;
    slug: string;
    qty: number;
    regularPrice: number;
    salePrice: number;
    actualSalePrice: number;
    wogActualSalePrice: number;
    regularShippingAmount: number;
    actualShippingAmount: number;
    couponDiscount: number;
    igst: number;
    sgst: number;
    cgst: number;
    totalGst: number;
    totalAmount: number;
    appUserId?: number;
    image: string;
    minQty: number;
    totalShippingAmount: number;
  }
  
  export interface CartItem {
    id: number;
    name: string;
    sku: string;
    qty: number;
    regularPrice: number;
    salePrice: number;
    actualSalePrice: number;
    wogActualSalePrice: number;
    regularShippingAmount: number;
    actualShippingAmount: number;
    couponDiscount: number;
    igst: number;
    sgst: number;
    cgst: number;
    totalGst: number;
    totalAmount: number;
    appUserId: number;
    image: string;
    slug: string;
    minQty: number;
    totalShippingAmount: number;
  }
  
  export interface CartProps {
    items: CartItem[];
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemoveItem: (item: CartItem) => Promise<void>;
  }
  