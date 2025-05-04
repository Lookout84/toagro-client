export interface Listing {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    category: string;
    categoryId?: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    active: boolean;
    images: string[];
    views: number;
    user: {
      id: number;
      name: string;
      avatar?: string;
    };
    categoryRel?: {
      id: number;
      name: string;
      slug: string;
    };
  }
  
  export interface CreateListingData {
    title: string;
    description: string;
    price: number;
    location: string;
    category: string;
    categoryId?: number;
    images?: string[];
  }
  
  export interface UpdateListingData extends Partial<CreateListingData> {
    active?: boolean;
  }
  
  export interface ListingFilters {
    category?: string;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'price' | 'views';
    sortOrder?: 'asc' | 'desc';
  }
  
  export interface ListingsResponse {
    listings: Listing[];
    meta: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  }