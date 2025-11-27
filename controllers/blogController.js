const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
const getBlogPosts = async (req, res, next) => {
  try {
    const posts = await BlogPost.find({})
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog post with comments
// @route   GET /api/blog/:id
// @access  Public
const getBlogPostById = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username');

    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    // Get comments for this post
    const comments = await Comment.find({ post: req.params.id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json({
      ...post.toObject(),
      comments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a blog post
// @route   POST /api/blog
// @access  Private
const createBlogPost = async (req, res, next) => {
  try {
    const { title, content, excerpt, coverImage, tags } = req.body;

    const post = await BlogPost.create({
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      coverImage,
      tags,
      author: req.user._id
    });

    const populatedPost = await BlogPost.findById(post._id).populate('author', 'username');
    res.status(201).json(populatedPost);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a blog post
// @route   PUT /api/blog/:id
// @access  Private (Author only)
const updateBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this post');
    }

    const { title, content, excerpt, coverImage, tags } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;
    post.excerpt = excerpt !== undefined ? excerpt : post.excerpt;
    post.coverImage = coverImage !== undefined ? coverImage : post.coverImage;
    post.tags = tags || post.tags;

    const updatedPost = await post.save();
    const populatedPost = await BlogPost.findById(updatedPost._id).populate('author', 'username');
    res.json(populatedPost);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blog/:id
// @access  Private (Author only)
const deleteBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this post');
    }

    // Delete all comments associated with this post
    await Comment.deleteMany({ post: req.params.id });

    await BlogPost.deleteOne({ _id: req.params.id });
    res.json({ message: 'Blog post removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
};
