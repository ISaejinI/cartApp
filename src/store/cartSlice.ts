import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

const initialState: Product[] = [];

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: initialState,
  },
  reducers: {
    addToCart: (state, action) => {
      var itemToAdd = state.items.find((item) => item.id == action.payload.id)
      if (itemToAdd && itemToAdd.quantity) {
        itemToAdd.quantity++
      } else {
        state.items.push({...action.payload, quantity: 1}) //Créer une copie pour pouvoir ajouter des elements
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id != action.payload)
    },

    updateQuantity: (state, action) => {
      var itemToUpdate = state.items.find((item) => item.id == action.payload.id)
      if (itemToUpdate != null) {
        itemToUpdate.quantity = action.payload.quantity
      }
    },
    
    setStore: (state:any, action:any) => {
      state.items = action.payload.items
    }


  },
});

export const { addToCart, removeFromCart, updateQuantity,setStore } = cartSlice.actions;
export default cartSlice.reducer;