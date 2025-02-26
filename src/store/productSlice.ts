import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Product {
  thumbnail: string;
  category: string;
  brand: string;
  discountPercentage: number;
  stock: number;
  availabilityStatus: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  images: string[];
  warrantyInformation: string;
  weight: number;
  shippingInformation: string;
  sku: string;
  returnPolicy: string;
  reviews: {
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  rating: number;
  id: number;
  title: string;
  description: string;
  price: number;
  quantity?: number;
}

// Product Slice
export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({currentPage, currentSearch, currentCategory}: {currentPage?: number, currentSearch?: string, currentCategory?:string}) => {
  let url = 'https://dummyjson.com/products'
  if (currentSearch) {
    url += '/search?q=' + currentSearch
  } else if (currentCategory) {
    url += '/category/' + currentCategory
  } else if (currentPage) {
    url += '?skip=' + (currentPage - 1) * 30
  }
  const response = await fetch(url);
  const allProducts = await response.json();
  return allProducts.products;
})

const initialState: {
  items: Product[];
  isLoading: boolean;
  currentPage: number;
  currentSearch: string;
  currentCategory: string;
} = {
  items: [],
  isLoading: false,
  currentPage: 1,
  currentSearch: "",
  currentCategory: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload
    },

    setSearch: (state, action) => {
      state.currentSearch = action.payload
    },

    setCategory: (state, action) => {
      state.currentCategory = action.payload
    },

    setDefault: (state) => {
      state.currentSearch = initialState.currentSearch
      state.currentCategory = initialState.currentCategory
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload
      })
  },
});


export const { setPage, setSearch, setCategory, setDefault } = productSlice.actions;
export default productSlice.reducer;