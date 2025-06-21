import Comment from "../models/comment.model.js";



export const getComments = async (req, res) => {
  const postId = req.params.postId;

  try {
    const comments = await Comment.find({ post: postId })
      .populate("user", "username profilePic") // now both are consistent
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error("Error Getting Comments:", error.message);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};
export const addComments = async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.postId;
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ message: "Comment text is required." });
  }

  try {
    const newComment = await Comment.create({
      user: userId,
      post: postId,
      text,
    });

    const populatedComment = await newComment.populate("user", "username profilePic");

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error("Error Adding Comment:", error.message);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

  export const deleteComments = async (req, res) => {
    const commentId = req.params.commentId;
  
    try {
      const deletedComment = await Comment.findByIdAndDelete(commentId);
  
      if (!deletedComment) {
        return res.status(404).json({ message: "Comment not found." });
      }
  
      res.status(200).json({ message: "Comment deleted successfully.", id: commentId });
    } catch (error) {
      console.error("Error deleting comment:", error.message);
      res.status(500).json({ message: "Failed to delete comment." });
    }
  };
  

  