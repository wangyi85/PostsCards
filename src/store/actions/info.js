export const setPosts = (posts) => {
    return {
        type: 'SET_POSTS',
        posts: posts
    }
}

export const addPost = (post) => {
    return {
        type: 'ADD_POST',
        post: post
    }
}

export const removePost = (id) => {
    return {
        type: 'REMOVE_POST',
        id: id
    }
}

export const updatePost = (newPost) => {
    return {
        type: 'UPDATE_POST',
        newPost: newPost
    }
}

export const setComments = (comments) => {
    return {
        type: 'SET_COMMENTS',
        comments: comments
    }
}

export const removeComment = (id) => {
    return {
        type: 'REMOVE_COMMENT',
        id: id
    }
}

export const updateComment = (newComment) => {
    return {
        type: 'UPDATE_COMMENT',
        newComment: newComment
    }
}

export const addComment = newComment => {
    return {
        type: 'ADD_COMMENT',
        newComment: newComment
    }
}
