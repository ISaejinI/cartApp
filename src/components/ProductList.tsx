import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import React, { useState } from "react";
import { fetchProducts, Product, setPage, setSearch, setCategory, setDefault } from "../store/productSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { fetchCategories, Category } from "../store/categorySlice";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const dispatch = useDispatch() as AppDispatch;
  const { items, isLoading, currentPage, currentSearch, currentCategory, categories } = {
    items: useSelector((state: RootState) => state.products.items),
    isLoading: useSelector((state: RootState) => state.products.isLoading),
    currentPage: useSelector((state: RootState) => state.products.currentPage),
    currentSearch: useSelector((state: RootState) => state.products.currentSearch),
    currentCategory: useSelector((state: RootState) => state.products.currentCategory),
    categories: useSelector((state: RootState) => state.category.allCategories)
  }

  let [searchContent, setSearchContent] = useState("");

  React.useEffect(() => {
    dispatch(fetchProducts({ currentPage: currentPage || 1, currentSearch: currentSearch, currentCategory: currentCategory }));
    dispatch(fetchCategories());
  }, [dispatch, currentPage, currentSearch, currentCategory]);

  if (isLoading) return <div className="flex h-[500px] items-center flex-row justify-center mb-auto"><svg aria-hidden="true" className="w-12 h-12 text-darkgreen animate-spin fill-pink" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg></div>;

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8 mb-auto">
      <h1 className="text-3xl font-bold font-display text-darkgreen text-center mb-8">Nos produits</h1>

      {/* Créer une barre de recherche et une liste des catégories */}

      <div className="flex gap-8 pb-8 justify-between">
        <div className="flex gap-8">
          <div className="flex">
            <input onChange={(e) => setSearchContent(e.target.value)} type="text" name="search" id="search" placeholder="Rechercher un produit..." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 min-w-64" />
            <button onClick={() => dispatch(setSearch(searchContent))} className="p-2.5 ms-2 text-sm font-medium text-white bg-darkgreen rounded-lg border border-darkgreen hover:bg-neutralgreen focus:ring-4 focus:outline-none focus:ring-lightgreen">
              <MagnifyingGlassIcon className="size-6" />
            </button>
          </div>
          <select onChange={(e) => dispatch(setCategory(e.target.value))} name="category" id="cat" className="bg-gray-50 w-fit border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
            <option defaultValue={""} value="">Sélectionner une catégorie</option>
            {categories.map((category: Category) => (
              <option key={category.slug} value={category.slug}>{category.name}</option>
            ))}
          </select>
        </div>

        <button onClick={() => dispatch(setDefault())}>Réinitialiser les filtres</button>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">Aucun produit ne correspon à votre recherche.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((product: Product) => (
            <ProductCard {...product} />
          ))}
        </div>
      )}

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
