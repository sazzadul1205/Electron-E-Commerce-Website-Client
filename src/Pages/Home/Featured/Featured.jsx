import Title from "../../Components/Title";

const featuredCategories = [
    {
        id: 1,
        title: 'Smartphones',
        image: 'https://i.ibb.co/kB0SyT1/Smartphones-Accessories.png',
    },
    {
        id: 2,
        title: 'Laptops & Computers',
        image: 'https://i.ibb.co/Dgd0wTL/Laptops-Computers.png',
    },
    {
        id: 3,
        title: 'Wearable Tech',
        image: 'https://i.ibb.co/tZ7f1Dm/Wearable-Tech.png',
    },
    {
        id: 4,
        title: 'Home Entertainment',
        image: 'https://i.ibb.co/nffLYbP/Home-Entertainment.png',
    },
    {
        id: 6,
        title: 'Cameras',
        image: 'https://i.ibb.co/RvSYypx/Cameras-Photography.png',

    },
    {
        id: 7,
        title: 'Gaming Consoles',
        image: 'https://i.ibb.co/q7GrkT9/Gaming-Consoles-Accessories.png',
    },
];

const Featured = () => {
    return (
        <div className="bg-gray-200 pb-5">
            <Title
                title={'Featured Categories'}
                subtitle={'Discover the latest and greatest in technology and lifestyle.'}
            ></Title>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mx-[200px] mt-5">
                {featuredCategories.map(category => (
                    <div key={category.id} className="">
                        <button className="bg-gray-300 p-5 rounded-xl">
                            <img src={category.image} alt="Shoes" className="w-44 h-44 pb-2" />
                            <h1 className="text-blue-500 font-bold">{category.title}</h1>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Featured;
