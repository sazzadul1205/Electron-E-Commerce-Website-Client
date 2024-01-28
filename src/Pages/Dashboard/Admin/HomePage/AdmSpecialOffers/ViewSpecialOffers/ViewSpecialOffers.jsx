const ViewSpecialOffers = ({ offer }) => {
  return (
    <div
      key={offer.id}
      className="bg-white p-6 rounded-lg shadow-md text-black"
    >
      <img
        src={offer.image}
        alt={offer.title}
        className="mb-4 rounded-md w-full h-72"
      />
      <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
      <p className="text-md text-red-500 mb-2">{offer.discount}</p>
      <p className="text-gray-700">{offer.details}</p>
    </div>
  );
};

export default ViewSpecialOffers;
