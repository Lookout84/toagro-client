import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listingsApi } from '@api/listingsApi';
import {
  Listing,
  CreateListingData,
  UpdateListingData,
  ListingFilters,
  ListingsResponse,
} from '@types/listing.types';

interface ListingsState {
  items: Listing[];
  currentListing: Listing | null;
  userListings: Listing[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ListingsState = {
  items: [],
  currentListing: null,
  userListings: [],
  meta: null,
  isLoading: false,
  error: null,
};

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (filters?: ListingFilters) => {
    const response = await listingsApi.getListings(filters);
    return response.data;
  }
);

export const fetchListing = createAsyncThunk(
  'listings/fetchListing',
  async (id: number) => {
    const response = await listingsApi.getListing(id);
    return response.data;
  }
);

export const createListing = createAsyncThunk(
  'listings/createListing',
  async (data: CreateListingData) => {
    const response = await listingsApi.createListing(data);
    return response.data;
  }
);

export const updateListing = createAsyncThunk(
  'listings/updateListing',
  async ({ id, data }: { id: number; data: UpdateListingData }) => {
    const response = await listingsApi.updateListing(id, data);
    return response.data;
  }
);

export const deleteListing = createAsyncThunk(
  'listings/deleteListing',
  async (id: number) => {
    await listingsApi.deleteListing(id);
    return id;
  }
);

export const fetchUserListings = createAsyncThunk(
  'listings/fetchUserListings',
  async (params?: { page?: number; limit?: number }) => {
    const response = await listingsApi.getUserListings(params);
    return response.data;
  }
);

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    clearCurrentListing: (state) => {
      state.currentListing = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Listings
      .addCase(fetchListings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.listings;
        state.meta = action.payload.meta;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch listings';
      })
      // Fetch Single Listing
      .addCase(fetchListing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentListing = action.payload.listing;
      })
      .addCase(fetchListing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch listing';
      })
      // Create Listing
      .addCase(createListing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload.listing);
      })
      .addCase(createListing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create listing';
      })
      // Update Listing
      .addCase(updateListing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.listing.id);
        if (index !== -1) {
          state.items[index] = action.payload.listing;
        }
        if (state.currentListing?.id === action.payload.listing.id) {
          state.currentListing = action.payload.listing;
        }
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update listing';
      })
      // Delete Listing
      .addCase(deleteListing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.userListings = state.userListings.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to delete listing';
      })
      // Fetch User Listings
      .addCase(fetchUserListings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userListings = action.payload.listings;
      })
      .addCase(fetchUserListings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch user listings';
      });
  },
});

export const { clearCurrentListing, clearError } = listingsSlice.actions;
export default listingsSlice.reducer;