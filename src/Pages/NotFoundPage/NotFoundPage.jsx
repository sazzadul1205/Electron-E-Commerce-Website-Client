import { Link } from "react-router-dom";
import Loader from "../Components/Loader";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-300">
      <div className="text-center">
        <Loader></Loader>
        <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-gray-700 mb-4">
          Oops! The page you are looking for doesn't exist.
        </p>
        <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
