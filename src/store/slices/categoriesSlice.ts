import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoriesApi } from '@api/categoriesApi';
import { Category, CategoryTree, CategoryFilters } from '../../types/category.types';

interface CategoriesState {
  items: Category[];
  tree: CategoryTree[];
  currentCategory: Category | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  tree: [],
  currentCategory: null,
  isLoading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (filters?: CategoryFilters) => {
    const response = await categoriesApi.getCategories(filters);
    return response.data;
  }
);

export const fetchCategoryTree = createAsyncThunk(
  'categories/fetchCategoryTree',
  async () => {
    const response = await categoriesApi.getCategoryTree();
    return response.data;
  }
);

export const fetchCategory = createAsyncThunk(
  'categories/fetchCategory',
  async (id: number) => {
    const response = await categoriesApi.getCategory(id);
    return response.data;
  }
);

export const fetchCategoryBySlug = createAsyncThunk(
  'categories/fetchCategoryBySlug',
  async (slug: string) => {
    const response = await categoriesApi.getCategoryBySlug(slug);
    return response.data;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCurrentCategory: (state) => {
      state.currentCategory = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      })
      // Fetch Category Tree
      .addCase(fetchCategoryTree.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoryTree.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tree = action.payload.categoryTree;
      })
      .addCase(fetchCategoryTree.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch category tree';
      })
      // Fetch Category
      .addCase(fetchCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCategory = action.payload.category;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch category';
      })
      // Fetch Category By Slug
      .addCase(fetchCategoryBySlug.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoryBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCategory = action.payload.category;
      })
      .addCase(fetchCategoryBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch category by slug';
      });
  },
});

export const { clearCurrentCategory, clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer;