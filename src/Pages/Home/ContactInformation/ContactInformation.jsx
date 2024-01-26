const ContactInformation = () => {
  // You can replace these placeholders with your actual contact details
  const contactDetails = {
    email: "Psazzadul@gmail.com",
    phone: "+8801917335945",
    address: "Sekartek, Mohammadpur, Dhaka-1207, Bangladesh",
  };

  // Placeholder for live chat option (you can integrate your live chat component here)
  const LiveChat = () => (
    <div>
      {/* Your live chat component goes here */}
      <p>Live chat is available during business hours.</p>
    </div>
  );

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-blue-200 p-6 rounded-lg shadow-md text-black">
            <h2 className="text-2xl font-bold mb-4 ">Contact Details</h2>
            <p className="font-semibold">
              <strong className="text-blue-500" >Email:</strong> {contactDetails.email}
            </p>
            <p className="font-semibold">
              <strong className="text-blue-500" >Phone:</strong> {contactDetails.phone}
            </p>
            <p className="font-semibold">
              <strong className="text-blue-500" >Address:</strong> {contactDetails.address}
            </p>
          </div>

          {/* Live Chat Option */}
          <div className="bg-blue-200 p-6 rounded-lg shadow-md text-black">
            <h2 className="text-2xl font-bold mb-4">Live Chat</h2>
            <LiveChat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
