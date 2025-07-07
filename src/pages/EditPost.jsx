import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        {post ? (
          <PostForm post={post} />
        ) : (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        )}
      </Container>
    </div>
  ) : null;
};

export default EditPost;
