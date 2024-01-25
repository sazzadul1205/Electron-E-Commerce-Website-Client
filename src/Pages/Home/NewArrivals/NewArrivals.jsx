import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import Title from '../../Components/Title';
import { CiShoppingCart } from "react-icons/ci";

const NewArrivals = () => {
    const newProducts = [
        {
            id: 1,
            name: 'Galaxy A52',
            image: 'https://i.ibb.co/zrthSZG/Galaxya52.png',
            price: 599.99,
            rating: 4,
            reviews: 334,
            description: 'The latest flagship smartphone with cutting-edge features.',
            arrival: 'new',
        },
        {
            id: 2,
            name: 'MSI Raider GE78 HX 13 VI',
            image: 'https://i.ibb.co/xzMnt7T/MSI-Raider-GE78-HX-13-VI.png',
            price: 79.99,
            rating: 4,
            reviews: 456,
            description: 'Immerse yourself in high-quality audio with these wireless earbuds.',
            arrival: 'new',
        },
        {
            id: 3,
            name: 'Sound PEATS Air3 Pro',
            image: 'https://i.ibb.co/MPq9y5s/Sound-PEATS-Air3-Pro.png',
            price: 1299.99,
            rating: 5,
            reviews: 90,
            description: 'Experience gaming like never before with our powerful gaming laptop.',
            arrival: 'new',
        },
        {
            id: 4,
            name: 'T500 Smart Watch',
            image: 'https://i.ibb.co/VDx2cwF/T500-Smart.jpg',
            price: 149.99,
            rating: 4.5,
            reviews: 120,
            description: 'Stay connected with our stylish and feature-rich smartwatch.',
            arrival: 'new',
        },
        {
            id: 5,
            name: 'Extra-Large Screen 3.2K Ultra-Thin Laptop Book PRO 15',
            image: 'https://i.ibb.co/LpFWM3N/Ultra-Thin-Laptop-Pro.jpg',
            price: 999.99,
            rating: 4.8,
            reviews: 210,
            description: 'Boost your productivity with our ultra-thin and powerful laptop.',
            arrival: 'new',
        },
    ];

    const shuffledProducts = newProducts.sort(() => Math.random() - 0.5);

    const randomNewArrivals = shuffledProducts.slice(0, 4);

    return (
        <div className='bg-gray-200 pb-5'>
            <Title
                title={'New Arrivals'}
                subtitle={'Discover the latest products in our inventory.'}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-8 mt-6 mx-[200px] pb-5">
                {randomNewArrivals.map(product => (
                    <div key={product.id} className="relative bg-white p-6 rounded-lg shadow-md">
                        {product.arrival === 'new' && (
                            <div className="absolute top-0 left-0 bg-blue-500 text-white py-1 px-2 rounded-tl-lg rounded-br-lg">
                                New Arrival
                            </div>
                        )}
                        <img src={product.image} alt={product.name} className="card mb-4 rounded-md w-44 h-44 mx-auto relative" />
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-700 mb-2">{product.description}</p>
                        <p className="text-gray-700 mb-2">${parseFloat(product.price).toFixed(2)}</p>
                        <div className="flex items-center mb-2">
                            <span className="text-yellow-500">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={product.rating}
                                    readOnly
                                />
                            </span>
                            <span className="ml-2 text-gray-500">({product.reviews} reviews)</span>
                        </div>
                        <div className="flex justify-center mt-2">
                            <button className="bg-red-500 hover:bg-red-400 text-white rounded-lg w-full p-2 flex items-center justify-center">
                                <h1 className="text-center">Add to Cart</h1>
                                <CiShoppingCart className='text-2xl ml-2' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewArrivals;
