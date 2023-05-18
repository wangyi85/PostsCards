import comment from "../../components/Comment";

const initialState = {
    posts: [],
    comments: []
}

const infoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                ...state,
                posts: action.posts
            }
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts, action.post]
            }
        case 'REMOVE_POST':
            return {
                ...state,
                posts: [...state.posts.filter(item => item.id !== action.id)]
            }
        case 'UPDATE_POST':
            return {
                ...state,
                posts: state.posts.map(item =>
                    item.id === action.newPost.id ?
                        {...item, title: action.newPost.title, body: action.newPost.body}
                        : item
                )
            }
        case 'SET_COMMENTS':
            return {
                ...state,
                comments: action.comments
            }
        case 'REMOVE_COMMENT':
            return {
                ...state,
                comments: [...state.comments.filter(item => item.id !== action.id)]
            }
        case 'UPDATE_COMMENT':
            return {
                ...state,
                comments: state.comments.map(item =>
                    item.id === action.newComment.id ?
                        {...item, text: action.newComment.text}
                        : item
                )
            }
        case 'ADD_COMMENT':
            return {
                ...state,
                comments: [...state.comments, action.newComment]
            }
        default:
            return state;
    }
}

export default infoReducer
