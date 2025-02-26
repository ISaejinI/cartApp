import { TruckIcon, SparklesIcon, FaceSmileIcon, GlobeEuropeAfricaIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { RootState } from '../store/store';
import { Category } from '../store/categorySlice';

const Home = () => {
    const categories = useSelector((state: RootState) => state.category.allCategories);

    const randomCategories = [...categories].sort(() => 0.5 - Math.random()).slice(0, 6);

    return (
        <>
            {/* Hero section */}
            <section className="w-full bg-[url('/bgHero.jpg')] bg-cover bg-center relative">
                <div className="max-w-[1440px] mx-auto min-h-[500px] flex flex-col justify-end py-16">
                    <h1 className="text-6xl font-display font-bold text-darkgreen mb-6">Arrêtez-vous un insant : <br/> Café et Matcha d'exception</h1>
                    <p className='w-1/2 text-gray-50'>Redéfinissez votre pause café avec des saveurs uniques et authentiques. Café corsé ou matcha onctueux, trouvez votre allié parfait pour booster votre journée avec style et énergie.</p>
                    <Link className="mt-6 px-6 py-3 bg-neutralgreen hover:bg-lightgreen text-white font-semibold rounded-lg shadow-lg w-fit" to="/products">Découvrez nos produits</Link>
                    
                </div>
            </section>

            {/* Catégories */}
            <section className='w-full py-16'>
                <div className='max-w-[1440px] mx-auto'>
                    <h2 className="text-3xl font-display font-bold text-darkgreen mb-8">Catégories les plus recherchées</h2>
                    <div className='flex'>
                        <div className="w-1/2 overflow-hidden rounded-3xl mr-4 bg-[url('/fouet.jpg')] bg-cover bg-center">
                            {/* <img src="/mostSearched.jpg" className='object-cover' /> */}
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
                    <h2 className="text-3xl font-display font-bold text-darkgreen mb-8">Pourquoi Nous Choisir ?</h2>
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
            
        </>
    )
};

export default Home;