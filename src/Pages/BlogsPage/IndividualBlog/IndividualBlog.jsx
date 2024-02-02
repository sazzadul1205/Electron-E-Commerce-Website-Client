import { Rating } from "@smastrom/react-rating";
import { Link, useLoaderData } from "react-router-dom";

const IndividualBlog = () => {
  const {
    image,
    title,
    date,
    excerpt,
    author,
    likes,
    ratings,
    tags,
    reviewCount,
  } = useLoaderData();

  return (
    <div className="container mx-auto py-28">
      <Link to={'/blog'}>
        <button className="text-xl text-black hover:text-blue-500"> Back</button>
      </Link>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover mb-4 rounded-md"
        />
        <h1 className="text-3xl font-bold mb-4 text-black">{title}</h1>
        <p className="text-gray-600 mb-2">
          Date: {new Date(date).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-4">{excerpt}</p>
        <div className="flex items-center">
          <p className="text-blue-700 hover:underline text-lg">{author}</p>
        </div>
        <div className="mt-4 flex items-center">
          <div className="flex items-center mr-4">
            <span className="text-gray-700 mr-2">Likes:</span>
            <span className="font-semibold">{likes}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 mr-2">Rating:</span>
            <span className="text-yellow-500">
              <Rating style={{ maxWidth: 120 }} value={ratings} readOnly />
            </span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-700">
            Tags:{" "}
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm mr-2"
              >
                {tag}
              </span>
            ))}
          </p>
        </div>
        <div className="mt-4">
          <p className="text-gray-700">Review Count: {reviewCount}</p>
        </div>
      </div>
    </div>
  );
};

export default IndividualBlog;
