import img1 from "../../assets/Devs/p1.jpeg";
import img2 from "../../assets/Devs/p2.jpeg";

const AboutUsPage = () => (
  <div className="container mx-auto p-8 pt-28 max-w-[1200px] text-center">
    <h1 className="text-4xl font-bold mb-8 text-gray-800">About Electron</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-100 shadow-xl p-8 rounded-lg">
      {[
        {
          title: "Our Mission",
          content:
            "At Electron, we aim to revolutionize your tech experience by providing innovative and high-quality electronics. We are committed to delivering exceptional products and ensuring a seamless shopping experience.",
        },
        {
          title: "Meet Our Team",
          content:
            "Electron thrives because of the dedication and expertise of our team members. Meet some of the individuals behind Electron's success.",
          teamMembers: [
            { name: "John Doe", role: "Founder & CEO", image: img1 },
            { name: "Jane Smith", role: "Head of Technology", image: img2 },
          ],
        },
        {
          title: "Our Values",
          content:
            "Electron is built on core values that guide our decisions and actions. We prioritize customer satisfaction, innovation, and integrity.",
        },
        {
          title: "Environmental Responsibility",
          content:
            "As a responsible tech provider, Electron is committed to sustainability. We actively seek eco-friendly practices in our products and operations, contributing to a greener future.",
        },
        {
          title: "Contact Us",
          content:
            "Have questions or want to get in touch with us? Feel free to contact us through our ",
          link: { text: "Contact page", url: "/contact" },
          closing: "We value your feedback and are here to assist you.",
        },
      ].map(({ title, content, teamMembers, link, closing }, index) => (
        <div key={index} className="mb-8 bg-slate-200 shadow-lg py-5 px-2">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">{title}</h2>
          <p className="text-gray-700">
            {content}{" "}
            {teamMembers && (
              <div className="flex items-center justify-center">
                {teamMembers.map((member, i) => (
                  <div key={i} className="flex flex-col items-center mb-4">
                    <img
                      src={member.image}
                      alt={`Team Member ${i + 1}`}
                      className="w-28 h-28 rounded-full mb-2"
                    />
                    <p className="text-gray-800 font-semibold">{member.name}</p>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                ))}
              </div>
            )}
            {link && (
              <>
                {link.text && (
                  <a href={link.url} className="text-blue-500">
                    {link.text}
                  </a>
                )}
                {closing && <span className="text-gray-700">{closing}</span>}
              </>
            )}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default AboutUsPage;
