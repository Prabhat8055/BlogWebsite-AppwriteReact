import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage, authorName }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="mb-4 flex justify-center h-60">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-50"
          />
        </div>
        <h2 className="text-xl font-bold">{title} </h2>
        <p className="text-sm text-gray-500">by {authorName}</p>
      </div>
    </Link>
  );
};

export default PostCard;
