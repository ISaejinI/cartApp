import { toggleWishlist } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Product } from "../store/productSlice";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";

const Wishlist = () => {
    const wishItems = useSelector((state: RootState) => state.wishlist.items);
    const dispatch = useDispatch() as AppDispatch;

    return (
        <>
        <section className="w-full">
            <div className="max-w-[1440px] mx-auto pt-16">
                <h1 className="text-4xl font-display font-bold text-darkgreen mb-6">Tous les items de la Wishlist</h1>
                <div className="grid grid-cols-3 gap-6">
                    {wishItems.map((product: Product) => (
                        <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">{product.title}</h2>
                        <p className="text-gray-600 mb-2">Prix : {product.price} EUR</p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                            {product.reviews.length} Avis
                          </span>
                          <span className="text-gray-500 text-sm">Évaluation : {product.rating} / 5</span>
                        </div>
                        <Link
                          to={`/products/${product.id}`}
                          className="text-blue-500 underline hover:text-blue-700 mb-4 block"
                        >
                          Voir le produit
                        </Link>
                        <button
                          onClick={() => dispatch(toggleWishlist(product))}
                        >
                          <HeartIcon className="size-6 transition-colors fill-red-700" />
                        </button>
                        <button
                          onClick={() => dispatch(addToCart(product))}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                        >
                          Ajouter au panier
                        </button>
                      </div>
                    ))}
                </div>
            </div>
        </section>
        </>
    )
};

export default Wishlist;