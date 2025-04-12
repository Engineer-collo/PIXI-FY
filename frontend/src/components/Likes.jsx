import { useState } from "react";
import { Heart } from "lucide-react"; 

function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (liked || loading) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
      });

      if (res.ok) {
        setLikes((prev) => prev + 1);
        setLiked(true);
      }
    } catch (err) {
      console.error("Error liking post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={liked || loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition 
        ${
          liked
            ? "bg-pink-100 text-pink-600"
            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        } 
        ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
      aria-pressed={liked}
      aria-label="Like this post"
    >
      <Heart
        size={20}
        className={`transition ${
          liked ? "fill-pink-500 stroke-pink-500" : "stroke-gray-500"
        }`}
      />
      <span>{likes}</span>
    </button>
  );
}

export default LikeButton;
