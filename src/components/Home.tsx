import { TruckIcon, SparklesIcon, FaceSmileIcon, GlobeEuropeAfricaIcon, ArrowUpRightIcon, HeartIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from '../store/store';
import { Category, fetchCategories } from '../store/categorySlice';
import React from 'react';
import { fetchRandProducts, Product } from '../store/productSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';

const Home = () => {
    const dispatch = useDispatch() as AppDispatch;
    const { categories, randomProducts, wishlist } = {
        categories: useSelector((state: RootState) => state.category.allCategories),
        randomProducts: useSelector((state: RootState) => state.products.randomProducts),
        wishlist: useSelector((state: RootState) => state.wishlist.items),
    }

    React.useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchRandProducts());
    }, [dispatch])

    const randomCategories = [...categories].sort(() => 0.5 - Math.random()).slice(0, 6);

    return (
        <>
            {/* Hero section */}
            <section className="w-full bg-[url('/bgHero.jpg')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>
                <div className="max-w-[1440px] mx-auto min-h-[550px] flex flex-col justify-end py-16 z-10 relative">
                    <h1 className="text-7xl font-display font-bold text-lightgreen mb-6">Arrêtez-vous un insant : <br /> Café et Matcha d'exception</h1>
                    <p className='w-1/2 text-gray-50'>Redéfinissez votre pause café avec des saveurs uniques et authentiques. Café corsé ou matcha onctueux, trouvez votre allié parfait pour booster votre journée avec style et énergie.</p>
                    <Link className="mt-6 px-6 py-3 bg-neutralgreen hover:bg-lightgreen text-white font-semibold rounded-lg shadow-lg w-fit" to="/products">Découvrez nos produits</Link>
                </div>
            </section>

            {/* Catégories */}
            <section className='w-full py-16'>
                <div className='max-w-[1440px] mx-auto'>
                    <h2 className="text-4xl font-display font-bold text-darkgreen mb-8">Catégories les plus recherchées</h2>
                    <div className='flex min-h-[600px]'>
                        <div className="w-1/2 overflow-hidden rounded-3xl mr-4 bg-[url('/fouet.jpg')] bg-cover bg-center">
                        </div>
                        <div className='w-1/2 pl-4'>
                            {randomCategories.map((category: Category) => (
                                <div key={category.slug} className='flex justify-between items-center w-full pt-6 pb-6 border-b-2 mb-8 border-black'>
                                    <p className='text-2xl'>{category.name}</p>
                                    <ArrowUpRightIcon className='size-6' />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Valeurs */}
            <section className="w-full bg-pink py-12 text-center">
                <div className='max-w-[1440px] mx-auto'>
                    <h2 className="text-4xl font-display font-bold text-darkgreen mb-8">Pourquoi nous choisir ?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-8">
                        <div className="flex flex-col items-center">
                            <TruckIcon className="size-24 text-neutralgreen" />
                            <p className="mt-2 text-gray-900">Livraison rapide</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <GlobeEuropeAfricaIcon className="size-24 text-neutralgreen" />
                            <p className="mt-2 text-gray-900">Produits naturels</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <SparklesIcon className="size-24 text-neutralgreen" />
                            <p className="mt-2 text-gray-900">Qualité premium</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaceSmileIcon className="size-24 text-neutralgreen" />
                            <p className="mt-2 text-gray-900">Satisfait ou remboursé</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Produits phares */}

            <section className="w-full py-12">
                <div className='max-w-[1440px] mx-auto'>
                    <h2 className="text-4xl font-display font-bold text-darkgreen mb-8">Nos produits phares</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {randomProducts.map((product: Product) => (
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
                                    <HeartIcon className={`size-6 transition-colors ${wishlist.find((item) => item.id === product.id) ? 'text-pink fill-pink' : ''}`} />
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
                        ))}
                    </div>
                </div>
            </section>

        </>
    )
};

export default Home;