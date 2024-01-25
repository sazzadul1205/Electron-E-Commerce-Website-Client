import Title from "../../Components/Title";

const SpecialOffers = () => {
    const specialOffers = [
        {
            id: 1,
            title: 'Limited Time Offer',
            image: 'https://i.ibb.co/CBT66PC/Limited-Time-Offer.png',
            discount: 'Save up to 20%',
            details: 'Shop now and enjoy exclusive discounts on selected items. Hurry, offer ends soon!',
        },
        {
            id: 2,
            title: 'Flash Sale',
            image: 'https://i.ibb.co/Nr4yyyn/Flash-Sale.jpg',
            discount: 'Up to 30% Off',
            details: 'Don\'t miss out on our flash sale! Grab your favorite products at unbeatable prices.',
        },
        // Add more special offers as needed...
    ];

    return (
        <div className="mx-[200px] pb-5">
            <Title
                title={'Special Offers or Promotions'}
                subtitle={'Discover exclusive discounts, deals, and limited-time offers.'}
            ></Title>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-8">
                {specialOffers.map(offer => (
                    <div key={offer.id} className="bg-white p-6 rounded-lg shadow-md text-black">
                        <img src={offer.image} alt={offer.title} className="mb-4 rounded-md w-full h-72" />
                        <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                        <p className="text-md text-red-500 mb-2">{offer.discount}</p>
                        <p className="text-gray-700">{offer.details}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpecialOffers;
