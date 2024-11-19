const Blog = require("../schema/blog.js");

// Insert a new blog
async function insert(req, res) {
    const body = req.body;

    // Check for required fields
    if (!body.title || !body.author || !body.content) {
        return res.status(400).json({ error: "Missing required fields: title, author, content" });
    }

    try {
        // Create and save a new blog post
        const newBlog = await Blog.create({
            title: body.title,
            author: body.author,
            content: body.content,
        });

        // Respond with the created blog post
        return res.json({ message: "Insert successful", blog: newBlog });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

// Get all blogs
async function getall(req, res) {
    try {
        const allBlogs = await Blog.find({});
        return res.json({ posts: allBlogs });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Get a single blog by title
async function getone(req, res) {
    const  id  = req.params.id; // Use query params for getting a specific blog
   console.log(id);
    if (!id) {
        return res.status(400).json({ error: "Title is required" });
    }

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        return res.json({ post: blog });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Get filtered blogs by title and author
async function getfiltered(req, res) {
    const {title,author} = req.params;

    if ( !author) {
        return res.status(400).json({ error: "Both title and author are required" });
    }

    try {
        const blog = await Blog.findOne({ title: title,author});
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        return res.json({ post: blog });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Delete a blog by title
async function deleteoneblog(req, res) {
    const  id  = req.params.id;

    if (!id) {
        return res.status(400).json({ error: "Title is required" });
    }

    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (deletedBlog.deletedCount === 0) {
            return res.status(404).json({ error: "Blog not found" });
        }
        return res.json({ message: "Blog deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
async function deleteauthor(req, res) {
    const  id = req.params.author;

    if (!id) {
        return res.status(400).json({ error: "Title is required" });
    }

    try {
        const deletedBlog = await Blog.deleteOne({author:id});
        if (deletedBlog.deletedCount === 0) {
            return res.status(404).json({ error: "Blog not found" });
        }
        return res.json({ message: "Blog deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Update an existing blog by title
async function updateoneblog(req, res) {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }

    try {
        const updatedBlog = await Blog.findOneAndUpdate(
            { title }, 
            { content },
            { new: true } // Returns the updated blog document
        );

        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        return res.json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Create a new blog (PUT request)
async function putnewblog(req, res) {
    const {id,title, author, content } = req.body;

    if (!title || !author || !content) {
        return res.status(400).json({ error: "Missing required fields: title, author, content" });
    }
    console.log(req.params.id);
  
        const updateblog=await Blog.findByIdAndUpdate(
            req.params.id,{title,content,author},{new:true,},
        );
        console.log(updateblog);

        return res.json({blog:updateblog});
}

module.exports = {
    insert,
    getall,
    getone,
    getfiltered,
    updateoneblog,
    putnewblog,
    deleteoneblog,deleteauthor,
};
