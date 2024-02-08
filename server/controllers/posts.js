import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()

        res.status(200).json(postMessages)
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new PostMessage(post)

    try {
        await newPost.save()

        res.status(201).json(newPost)
    } catch (err) {
        res.status(409).json({
            message: err.message
        })
    }
}

export const deletePost = async (req, res) => {
    const postId = req.body.id

    try {
        const post = await PostMessage.findById(postId)

        await post.deleteOne({
            id: postId
        })

        res.status(200).json({ message: "Post deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
