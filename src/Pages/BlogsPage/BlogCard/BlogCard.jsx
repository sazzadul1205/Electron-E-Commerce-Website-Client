import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {

  return (
    <div className="card card-compact w-96 shadow-xl text-black">
      <figure>
        <img src={blog.image} alt={blog.title} className="w-full h-64" />
      </figure>
      <div className="card-body mb-6">
        <h2 className="card-title h-24">{blog.title}</h2>
        <p>{blog.excerpt}</p>
        <div className="card-actions ">
          <Link to={`/blog/${blog._id}`}>
            <button className="bg-blue-500 hover:bg-blue-600 p-3 rounded-xl  text-white">
              Read more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
