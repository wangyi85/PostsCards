import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {memo, useCallback, useState} from "react";
import {normalize} from "../consts/consts";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Comment from "./Comment";

const PostCard = memo(props => {
    const [isEditable, setEditable] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [comment, setComment] = useState('');

    const onEdit = useCallback(() => {
        setEditable(!isEditable);
    })
    const onChangeTitle = useCallback((value) => {
        setTitle(value);
    }, [title]);
    const onChangeBody = useCallback((value) => {
        setBody(value)
    }, [body])
    const onChangeComment = useCallback((value) => {
        setComment(value)
    }, [comment])
    const onSave = async () => {
        const result = await props.savePost({
            id: props.post.id,
            title: title === '' ? props.post.title : title,
            body: body === '' ? props.post.body : body
        })
        if (result === 'success') {
            setEditable(false);
        } else {
            alert('Failed: Error found!');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {
                    isEditable ?
                        <TextInput style={styles.titleInput} defaultValue={props.post.title} onChangeText={onChangeTitle} />
                        : <Text style={styles.title}>{title === '' ? props.post.title : title}</Text>
                }
                <View style={styles.actionPanel}>
                    <TouchableOpacity
                        style={styles.editBtn}
                        onPress={isEditable?onSave:onEdit}
                    >
                        {
                            isEditable ?
                                <Ionicons name={'save-outline'} color={'green'} size={normalize(10)} />
                                : <SimpleLineIcons name={'pencil'} color={'green'} size={normalize(10)} />
                        }
                        <Text style={styles.editTxt}>{isEditable ? 'Save' : 'Edit'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => props.deletePost(props.post.id)}
                    >
                        <SimpleLineIcons name={'trash'} color={'red'} size={normalize(10)} />
                        <Text style={styles.deleteTxt}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bodyPanel}>
                {
                    isEditable ?
                        <TextInput
                            style={styles.bodyInput}
                            defaultValue={props.post.body}
                            multiline={true}
                            textAlignVertical={'top'}
                            numberOfLines={3}
                            onChangeText={onChangeBody}
                        />
                        : <Text style={styles.bodyTxt}>{body === '' ? props.post.body : body}</Text>
                }
            </View>
            <View style={styles.commentPanel}>
                <View style={styles.commentHeaderPanel}>
                    <Text style={styles.commentTitle}>Comments: </Text>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={() => props.submitComment({
                            text: comment,
                            postId: props.post.id
                        })}
                    >
                        <SimpleLineIcons name={'paper-plane'} color={'white'} size={normalize(10)} />
                        <Text style={styles.submitTxt}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', marginBottom: normalize(10)}}>
                    <TextInput
                        style={styles.commentInput}
                        multiline={true}
                        numberOfLines={2}
                        textAlignVertical={'top'}
                        placeholder={'New Comment'}
                        placeholderTextColor={'#EEEEEE55'}
                        onChangeText={onChangeComment}
                    />
                </View>
                <View style={{width: '100%'}}>
                    {
                        props.comments.map((item, index) => {
                            return (
                                <Comment
                                    key={index}
                                    comment={item}
                                    deleteComment={props.deleteComment}
                                    saveComment={props.saveComment}
                                />
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
})

export default PostCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: normalize(20),
        marginTop: normalize(20),
        borderWidth: normalize(2),
        borderColor: '#999',
        elevation: 5,
        borderRadius: normalize(10)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: normalize(10),
        paddingVertical: normalize(5),
        borderBottomWidth: normalize(2),
        borderBottomColor: '#999'
    },
    title: {
        fontSize: normalize(24),
        fontWeight: 'bold',
        color: 'white'
    },
    titleInput: {
        flex: 1,
        padding: normalize(5),
        borderRadius: normalize(5),
        borderWidth: normalize(2),
        borderColor: '#aaa',
        color: 'white',
        fontSize: normalize(24),
        marginRight: normalize(15)
    },
    actionPanel: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    editBtn: {
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(3),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize(30),
        borderColor: 'green',
        borderWidth: normalize(2),
        elevation: 3
    },
    editTxt: {
        fontSize: normalize(10),
        color: 'green',
        marginLeft: normalize(5)
    },
    deleteBtn: {
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(3),
        marginLeft: normalize(10),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize(30),
        borderWidth: normalize(2),
        borderColor: 'red',
        elevation: 3
    },
    deleteTxt: {
        fontSize: normalize(10),
        color: 'red',
        marginLeft: normalize(5)
    },
    bodyPanel: {
        marginHorizontal: normalize(10),
        marginTop: normalize(5),
        marginBottom: normalize(10)
    },
    bodyTxt: {
        color: '#ccc',
        fontSize: normalize(16)
    },
    bodyInput: {
        flex: 1,
        padding: normalize(5),
        borderRadius: normalize(5),
        borderWidth: normalize(2),
        borderColor: '#ccc',
        color: 'white',
        fontSize: normalize(16),
    },
    commentPanel: {
        marginHorizontal: normalize(10),
        marginTop: normalize(5),
        marginBottom: normalize(10),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    commentHeaderPanel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    commentTitle: {
        flex: 1,
        fontSize: normalize(20),
        color: 'white'
    },
    submitBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(3),
        backgroundColor: 'purple',
        borderRadius: normalize(30),
    },
    submitTxt: {
        marginLeft: normalize(5),
        color: 'white',
        fontSize: normalize(10)
    },
    commentInput: {
        flex: 1,
        padding: normalize(5),
        marginTop: normalize(10),
        borderRadius: normalize(5),
        borderWidth: normalize(2),
        borderColor: '#ccc',
        color: '#ccc',
        fontSize: normalize(16),
    }
})
