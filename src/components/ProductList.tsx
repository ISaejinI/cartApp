import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import React from "react";
import { fetchProducts, Product, setPage } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch() as AppDispatch;
  const { items, isLoading, currentPage } = { 
    items : useSelector((state: RootState) => state.products.items),
    isLoading : useSelector((state: RootState) => state.products.isLoading),
    currentPage : useSelector((state: RootState) => state.products.currentPage)
  }

  React.useEffect(() => {
    dispatch(fetchProducts(currentPage || 1));
  }, [dispatch, currentPage]);

  if (isLoading) return <p className="text-center text-gray-500 mt-8">Chargement...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Liste des Produits</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((product:Product) => (
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
              onClick={() => dispatch(addToCart(product))}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Précédent
        </button>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          disabled={items.at(-1)?.id == 194}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ProductList;
