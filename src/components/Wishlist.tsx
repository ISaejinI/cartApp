import { toggleWishlist } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Product } from "../store/productSlice";

import ProductCard from "./ProductCard";

const Wishlist = () => {
  const wishItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch() as AppDispatch;

  return (
    <main className="mb-auto">
      <section className="w-full">
        <div className="max-w-[1440px] mx-auto pt-16">
          <h1 className="text-4xl font-display font-bold text-darkgreen mb-8">Tous les items de la Wishlist</h1>
          {wishItems.length === 0 ? (
            <p className="text-center text-gray-500">Il n'y a aucun produit dans votre liste d'envies.</p>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {wishItems.map((product: Product) => (
                <ProductCard {...product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
};

export default Wishlist;