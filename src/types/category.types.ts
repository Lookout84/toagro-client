export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parentId?: number;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    parent?: {
      id: number;
      name: string;
      slug: string;
    };
    children?: Category[];
    _count?: {
      children: number;
      listings: number;
    };
  }
  
  export interface CategoryTree extends Category {
    children: CategoryTree[];
  }
  
  export interface CreateCategoryData {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parentId?: number;
    active?: boolean;
  }
  
  export interface UpdateCategoryData extends Partial<CreateCategoryData> {}
  
  export interface CategoryFilters {
    active?: boolean;
    parentId?: number;
    search?: string;
  }