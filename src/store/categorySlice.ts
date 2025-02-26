import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Category {
    slug: string;
    name: string;
    url: string;
};

export const fetchCategories = createAsyncThunk ('categories/fetchCategories', async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    const allCategories = await response.json();
    return allCategories;
})

const initialState: {
    allCategories: Category[];
    isCatLoading: boolean;
} = {
    allCategories: [],
    isCatLoading: false,
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isCatLoading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isCatLoading = false;
                state.allCategories = action.payload;
            })
    },

});

export default categorySlice.reducer;