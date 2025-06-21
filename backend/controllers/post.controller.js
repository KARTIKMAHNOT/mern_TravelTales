import Post from "../models/post.model.js";
import cloudinary from "cloudinary";


export const createPost = async (req, res) => {
  const { caption, images, location, description } = req.body;
  const creator = req.user._id;
  const creatorName = req.user.username;

  try {
    if (!caption || !images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: "Caption and at least one image are required" });
    }
    const uploadedImages = await Promise.all(
      images.map(async (img) => {
        const uploadRes = await cloudinary.uploader.upload(img, {
          folder: "posts",
        });
        return {
          url: uploadRes.secure_url,
          publicId: uploadRes.public_id,
        };
      })
    );

    const newPost = new Post({
      caption,
      description,
      images: uploadedImages,
      creator,
      creatorName,
      location,
    });

    const savedPost = await newPost.save();

    return res.json({
      _id: savedPost._id,
      caption: savedPost.caption,
      description: savedPost.description,
      images: savedPost.images,
      creator: savedPost.creator,
      creatorName: savedPost.creatorName,
      location: savedPost.location,
      createdAt: savedPost.createdAt,
    });
  } catch (error) {
    console.log("Error in createPost:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const deletePost = async (req,res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({message:"post not found"})
        }
        if (post.images && post.images.length > 0) {
            try {
              await Promise.all(
                post.images.map((img) =>
                  cloudinary.uploader.destroy(`posts/${img.publicId}`)
                )
              );
            } catch (imgErr) {
              console.error("Error deleting images from Cloudinary:", imgErr.message);
            }
          }
        await Post.findByIdAndDelete(postId)
        res.status(200).json({ message: "Post deleted successfully" });
    }  catch (error) {
        console.log("Error in deletePost", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
export const getMyPost = async (req,res) => {
  try {
    const userId = req.user._id;
    const page  =parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const totalPosts = await Post.countDocuments({creator:userId})
    const posts = await Post.find({creator:userId}).sort({createdAt:-1}).skip((page-1)*limit).limit(limit).populate("creator")


    res.json({
      posts,
      total: totalPosts,
      currentPage: page,
      totalPages: limit ? Math.ceil(totalPosts/limit):1
    })
  } catch (error) {
    console.error("Error fetching user's posts:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
} 

export const getAllPosts = async(req,res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const totalPosts = await Post.countDocuments()
    const posts = await Post.find().sort({likes: -1}).skip((page-1)*limit).limit(limit).populate("creator","username profilePic")
    res.json({
      posts,
      total: totalPosts,
      currentPage: page,
      totalPages: limit ? Math.ceil(totalPosts/limit):1
    })
  } catch (error) {
    console.error("Error fetching user's posts:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getRecommendedPosts = async(req,res) => {
  try {
    const posts = await Post.aggregate([{$sample:{size:4}}])
    res.json(posts);
  } catch (error) {
    res.status(500).json({message: "failed to fetch recommended posts."})
  }
}
export const getPost = async (req, res) => {
  const id  = req.params.id;

  try {
    const post = await Post.findById(id).populate("creator", "username profilePic");

    if (!post) {
      return res.status(404).json({ message: "No matching post found." });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error.message);
    res.status(500).json({ message: "Failed to fetch post." });
  }
};
export const toggleLike = async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "No Matching Post" });
    }

    const isLiked = post.likes.some((id) => id.toString() === userId.toString());

    post.likes = isLiked
      ? post.likes.filter((id) => id.toString() !== userId.toString())
      : [...post.likes, userId];

    await post.save();

    res.status(200).json({ likes: post.likes });
  } catch (error) {
    console.error("Toggle Like Error:", error.message);
    res.status(500).json({ message: "Failed to toggle like" });
  }
};
// Assuming Mongoose and Post model are imported
