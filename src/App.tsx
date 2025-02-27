import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import Home from './components/Home';
import Wishlist from "./components/Wishlist";
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {  RootState } from "./store/store";
import { setStore as setStoreCart } from "./store/cartSlice";
import { setStore as setStoreWishList } from "./store/wishlistSlice";

const App = () => {
  const store = useSelector((state:RootState)=>state)
  const dispatch  = useDispatch()
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      window.localStorage.setItem('store', JSON.stringify(store))
    })
    return () => window.removeEventListener('beforeunload', () => {})
  }, [store])
  useEffect(() => {
    window.addEventListener("load", () => {
      const store = window.localStorage.getItem('store')
      if(store){
        const storeJson = JSON.parse(store)
        console.log("storeJson",storeJson);
        dispatch(setStoreCart(storeJson.cart))
        dispatch(setStoreWishList(storeJson.wishlist))
      }
      
    })
    return () => window.removeEventListener('load', () => {})
  }, [store])
  let [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items)

  return (
    <>
      <Router>
        <header className="w-full">
          <nav className="flex justify-between items-center max-w-[1440px] mx-auto py-6">
            <Link to="/"><img className="h-[75px]" src='/logo.png' /></Link>
            <div className="flex lg:hidden">
              <button type="button" onClick={() => setBurgerMenuOpen(true)}>
                <Bars3Icon className="size-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:items-center lg:gap-x-12">
              <Link className="m-3" to="/">Accueil</Link>
              <Link className="m-3" to="/products">Produits</Link>
              <Link className="m-3" to="/wishlist">Favoris</Link>
              <Link className="m-3 relative" to="/cart"><ShoppingBagIcon className="size-6" /> {cartItems.length === 0? '':<span className="absolute text-xs text-white -top-3 -right-3 rounded-full bg-neutralgreen w-6 h-6 flex justify-center items-center">{cartItems.length}</span>}</Link>
            </div>
          </nav>

          {/* Mobile Menu */}

          <Dialog className="lg:hidden" open={burgerMenuOpen} onClose={() => setBurgerMenuOpen(false)}>
            <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-end">
                <button type="button" onClick={() => setBurgerMenuOpen(false)}>
                  <XMarkIcon className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div>
                  <div className="py-6 flex flex-col">
                    <Link className="m-3 w-full" to="/">Accueil</Link>
                    <Link className="m-3 w-full" to="/products">Produits</Link>
                    <Link className="m-3 w-full" to="/wishlist">Favoris</Link>
                    <Link className="m-3 w-full" to="/cart">Panier</Link>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        
      <footer className="bg-darkgreen w-full text-white">
        <div className="max-w-[1440px] mx-auto py-6 flex justify-between text-sm md:flex-col-reverse">
          <p>© 2025 Développé par <a href="https://github.com/ISaejinI">Lou-Anne Biet.</a> Tous droits réservés.</p>
          <ul className="flex flex-wrap items-center">
            <li>
              <Link className="hover:underline me-4" to="/">Accueil</Link>
            </li>
            <li>
              <Link className="hover:underline me-4" to="/products">Produits</Link>
            </li>
          </ul>
        </div>
      </footer>
      </Router>
    </>
  );
};

export default App;