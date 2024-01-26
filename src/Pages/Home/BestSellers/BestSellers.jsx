import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import Title from '../../Components/Title';
import { CiShoppingCart } from 'react-icons/ci';

const BestSellers = () => {
    const bestSellers = [
        {
            id: 1,
            name: 'SONY KD-75X80L 75-inch Ultra HD (4K) LED',
            image: 'https://i.ibb.co/1RzdSdk/SONY-KD-75-X80-L-75-inch-Ultra-HD-4-K-LED.jpg',
            price: 899.99,
            rating: 4.7,
            reviews: 210,
            description: 'Experience crystal-clear visuals with our top-selling Ultra HD Smart TV.',
            bestSeller: true,
        },
        {
            id: 2,
            name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
            image: 'https://i.ibb.co/tzZ7Ltt/Sony-WH-1000-XM5-Wireless-Noise-Canceling-Headphones.jpg',
            price: 149.99,
            rating: 4.5,
            reviews: 180,
            description: 'Immerse yourself in superior sound quality with our best-selling headphones.',
            bestSeller: true,
        },
        {
            id: 3,
            name: 'Nikon DSLR Cameras',
            image: 'https://i.ibb.co/fkQ9DKZ/Nikon-DSLR-Cameras.png',
            price: 1299.99,
            rating: 4.9,
            reviews: 300,
            description: 'Capture stunning moments with our top-rated professional DSLR camera.',
            bestSeller: true,
        },
        {
            id: 4,
            name: 'RICUSHN Wireless Video Doorbell',
            image: 'https://i.ibb.co/vv9fZbJ/RICUSHN-Wireless-Video-Doorbell.jpg',
            price: 349.99,
            rating: 4.8,
            reviews: 250,
            description: 'Secure your home with our advanced smart home security system.',
            bestSeller: true,
        },
        {
            id: 5,
            name: 'Samsung Notebook 9',
            image: 'https://i.ibb.co/Wz8j5gm/Samsung-Notebook-9.jpg',
            price: 1299.99,
            rating: 4.6,
            reviews: 180,
            description: 'Maximize productivity with our sleek and powerful ultra-slim laptop.',
            bestSeller: true,
        },
        {
            id: 6,
            name: 'QCY H3 ANC Wireless Headphones',
            image: 'https://i.ibb.co/CnpwtM0/QCY-H3-ANC-Wireless-Headphones.jpg',
            price: 199.99,
            rating: 4.9,
            reviews: 300,
            description: 'Immerse yourself in superior audio quality with our premium noise-canceling earphones.',
            bestSeller: true,
        },
    ];

    const shuffledBestSellers = bestSellers.sort(() => Math.random() - 0.5);

    // Take the first 5 elements after shuffling
    const randomBestSellers = shuffledBestSellers.slice(0, 4);

    return (
        <div className='pb-5'>
            <Title
                title={'Best Sellers'}
                subtitle={'Discover our top-selling products with customer reviews.'}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-8 mt-6 mx-[200px] ">
                {randomBestSellers.map(product => (
                    <div key={product.id} className="relative bg-white p-6 rounded-lg shadow-md">
                        {product.bestSeller && (
                            <div className="absolute top-0 left-0 bg-green-500 text-white py-1 px-2 rounded-tl-lg rounded-br-lg">
                                Best Seller
                            </div>
                        )}
                        <img src={product.image} alt={product.name} className="card mb-4 rounded-md w-44 h-44 mx-auto relative" />
                        <h3 className="text-xl font-semibold mb-2 h-20">{product.name}</h3>
                        <p className="text-gray-700 mb-2 h-16">{product.description}</p>
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

export default BestSellers;
