import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

const initialState : Product[] = [];

const wishlistSlice = createSlice ({
    name: 'wishlist',
    initialState : {
        items: initialState,
    },
    reducers: {
        toggleWishlist: (state, action) => {
            var itemToUpdate = state.items.find((item) => item.id == action.payload.id)
            if (itemToUpdate) {
                // supprimer de la liste
                state.items = state.items.filter((item) => item.id != action.payload.id)
            } else {
                // ajouter à la liste
                state.items.push(action.payload)
            }
        },
        
        setStore: (state:any, action:any) => {
            state.items = action.payload.items
        }
    }
});

export const { toggleWishlist,setStore } = wishlistSlice.actions;
export default wishlistSlice.reducer;