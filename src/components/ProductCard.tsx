import { Link } from "react-router-dom"
import { Product } from "../store/productSlice"
import { useDispatch, useSelector } from "react-redux"
import { toggleWishlist } from "../store/wishlistSlice"
import { HeartIcon, PlusIcon } from "@heroicons/react/24/outline"
import { RootState } from "../store/store"
import { addToCart } from "../store/cartSlice"

const ProductCard= (product: Product) => {

    const dispatch = useDispatch()
    const wishlistStore = useSelector((state: RootState)=> state.wishlist.items)

    return (
        <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow group relative">
            <Link to={`/products/${product.id}`}>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="aspect-square w-full bg-gray-200 object-cover rounded-md mb-4 group-hover:opacity-75"
                />
            </Link>
            <Link to={`/products/${product.id}`}><h2 className="text-xl font-semibold text-gray-700 mb-2">{product.title}</h2></Link>
            <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 text-sm">
                    {product.rating} / 5
                    <span className="pl-2">( {product.reviews.length} avis )</span>
                </span>
            </div>
            <button
                onClick={() => dispatch(toggleWishlist(product))}
                className="absolute top-6 right-6"
            >
                <HeartIcon className={`size-6 transition-colors ${wishlistStore.find((item) => item.id === product.id) ? 'text-pink fill-pink' : ''}`} />
            </button>
            <div className="w-full flex justify-between items-center">
                <p className="text-gray-900 font-bold text-lg mb-2">{product.price} €</p>
                <button
                    onClick={() => dispatch(addToCart(product))}
                    className="w-fit bg-neutralgreen text-white px-4 py-2 rounded hover:bg-darkgreen"
                >
                    <PlusIcon className="size-6" />
                </button>
            </div>
        </div>
    )
}

export default ProductCard