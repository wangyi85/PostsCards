import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {memo, useCallback, useEffect} from "react";
import axios from "axios";
import {normalize, SERVER_URL} from "../consts/consts";
import {connect} from "react-redux";
import {
    addComment,
    addPost,
    removeComment,
    removePost,
    setComments,
    setPosts,
    updateComment,
    updatePost
} from "../store/actions/info";
import PostCard from "../components/PostCard";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const Posts = memo(props => {
    useEffect(() => {
        fetchPosts();
        fetchComments();
    }, []);

    const fetchPosts = () => {
        try {
            axios.get(`${SERVER_URL}posts`).then(res => {
                props.setPosts(res.data);
            })
        } catch (e) {
            console.log(e);
        }
    }

    const fetchComments = () => {
        try {
            axios.get(`${SERVER_URL}comments`).then(res => {
                props.setComments(res.data);
            })
        } catch (e) {
            console.log(e);
        }
    }

    const goBack = () => {
        props.navigation.goBack(null);
        return true;
    }

    const addNewCard = useCallback(() => {
        const maxId = Math.max(...props.posts.reduce((acc, curr) => [...acc, curr.id], []));
        const newPost = {
            id: maxId + 1,
            title: `Post ${maxId + 1}`,
            body: `This is the body string for post ${maxId + 1}`
        }
        try {
            axios.post(`${SERVER_URL}posts`, JSON.stringify(newPost), {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(res => {
                props.addPost(res.data);
            })
        } catch (e) {
            console.log(e)
        }
    })

    const deletePost = useCallback((id) => {
        try {
            axios.delete(`${SERVER_URL}posts/${id}`).then(res => {
                props.removePost(id)
            })
        } catch (e) {
            console.log(e);
        }
    })

    const deleteComment = useCallback((id) => {
        try {
            axios.delete(`${SERVER_URL}comments/${id}`).then(res => {
                props.removeComment(id)
            })
        } catch (e) {
            console.log(e);
        }
    })

    const savePost = useCallback(async (newPost) => {
        try {
            const result = await putAsync(newPost);
            props.updatePost(newPost);
            if (result.data !== undefined) return 'success'
            else return 'failure'
        } catch (e) {
            console.log(e)
            return 'failure'
        }
    })

    const saveComment = useCallback(async (newComment) => {
        try {
            const result = await putCommentAsync(newComment);
            props.updateComment(newComment);
            if (result.data !== undefined) return 'success'
            else return 'failure'
        } catch (e) {
            console.log(e)
            return 'failure'
        }
    })

    const putAsync = (newPost) => new Promise((resolve, reject) => {
        axios.put(`${SERVER_URL}posts/${newPost.id}`, newPost).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
    const putCommentAsync = (newComment) => new Promise((resolve, reject) => {
        axios.put(`${SERVER_URL}comments/${newComment.id}`, newComment).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })

    const submitComment = useCallback((comment) => {
        const maxId = Math.max(...props.comments.reduce((acc, curr) => [...acc, curr.id], []));
        const newComment = {
            id: maxId + 1,
            text: comment.text,
            postId: comment.postId
        }
        try {
            axios.post(`${SERVER_URL}comments`, JSON.stringify(newComment), {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(res => {
                props.addComment(res.data);
            })
        } catch (e) {
            console.log(e)
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTitlePanel}>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={goBack}
                    >
                        <SimpleLineIcons name={'arrow-left'} color={'white'} size={normalize(20)} />
                    </TouchableOpacity>
                    <Text style={styles.headerTxt}>Posts</Text>
                </View>
                <TouchableOpacity
                    style={styles.newBtn}
                    onPress={addNewCard}
                >
                    <SimpleLineIcons name={'plus'} color={'white'} size={normalize(14)} />
                    <Text style={styles.newBtnTxt}>New</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{flex: 1}}
                numColumns={1}
                contentContainerStyle={{paddingBottom: normalize(20)}}
                data={props.posts}
                renderItem={({item}) => (
                    <PostCard
                        post={item}
                        comments={props.comments.filter(c => c.postId === item.id)}
                        savePost={savePost}
                        deletePost={deletePost}
                        deleteComment={deleteComment}
                        saveComment={saveComment}
                        submitComment={submitComment}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
})

export default connect(
    state => ({
        posts: state.infoReducer.posts,
        comments: state.infoReducer.comments
    }),
    dispatch => ({
        setPosts: (posts) => dispatch(setPosts(posts)),
        addPost: (post) => dispatch(addPost(post)),
        removePost: (id) => dispatch(removePost(id)),
        updatePost: (newPost) => dispatch(updatePost(newPost)),
        setComments: (comments) => dispatch(setComments(comments)),
        removeComment: (id) => dispatch(removeComment(id)),
        updateComment: (newComment) => dispatch(updateComment(newComment)),
        addComment: (newComment) => dispatch(addComment(newComment))
    })
)(Posts);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818'
    },
    header: {
        width: '100%',
        paddingTop: normalize(20),
        paddingBottom: normalize(10),
        paddingHorizontal: normalize(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: normalize(10)
    },
    headerTitlePanel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    headerTxt: {
        color: 'white',
        fontSize: normalize(26),
        marginLeft: normalize(30)
    },
    backBtn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    newBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(4),
        backgroundColor: 'green',
        borderRadius: normalize(5)
    },
    newBtnTxt: {
        color: 'white',
        fontSize: normalize(14),
        marginLeft: normalize(7)
    }
})
