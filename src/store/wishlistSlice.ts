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
            if (itemToUpdate != null) {
                // supprimer de la liste
                state.items = state.items.filter((item) => item.id != itemToUpdate.id)
            } else {
                // ajouter à la liste
                state.items.push(action.payload)
            }
        }
    }
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;