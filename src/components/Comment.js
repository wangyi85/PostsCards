import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {memo, useCallback, useState} from "react";
import {normalize} from "../consts/consts";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const Comment = memo(props => {
    const [isEditable, setEditable] = useState(false);
    const [comment, setComment] = useState('');

    const onChangeComment = useCallback((value) => setComment(value));
    const toggleEdit = useCallback(() => setEditable(!isEditable))
    const saveComment = async () => {
        const result = await props.saveComment({
            id: props.comment.id,
            text: comment === '' ? props.comment.text : comment,
            postId: props.comment.postId
        })
        if (result === 'success') {
            setEditable(false);
        } else {
            alert('Failed: Error found!');
        }
    }

    return (
        <TouchableOpacity
            style={styles.container}
        >
            {
                isEditable ?
                    <TextInput style={styles.commentInput} defaultValue={props.comment.text} onChangeText={onChangeComment} />
                    :
                    <Text style={styles.comment}>{comment === '' ? props.comment.text : comment}</Text>
            }
            <View style={styles.actionPanel}>
                {
                    isEditable ?
                        <TouchableOpacity
                            style={styles.editBtn}
                            onPress={saveComment}
                        >
                            <Ionicons name={'save-outline'} color={'green'} size={normalize(10)} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={styles.editBtn}
                            onPress={toggleEdit}
                        >
                            <SimpleLineIcons name={'pencil'} color={'green'} size={normalize(10)} />
                        </TouchableOpacity>
                }
                {
                    isEditable &&
                    <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={toggleEdit}
                    >
                        <SimpleLineIcons name={'ban'} color={'yellow'} size={normalize(10)} />
                    </TouchableOpacity>
                }
                <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => props.deleteComment(props.comment.id)}
                >
                    <SimpleLineIcons name={'trash'} color={'red'} size={normalize(10)} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
})

export default Comment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(5),
        marginVertical: normalize(5),
        borderRadius: normalize(10),
        borderWidth: normalize(2),
        borderColor: '#EEEEEE55',
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    comment: {
        fontSize: normalize(16),
        color: '#ccc',
    },
    commentInput: {
        flex: 1,
        padding: normalize(5),
        marginRight: normalize(10),
        borderRadius: normalize(5),
        borderWidth: normalize(2),
        borderColor: '#ccc',
        color: '#ccc',
        fontSize: normalize(16),
    },
    actionPanel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    editBtn: {
        width: normalize(20),
        height: normalize(20),
        borderRadius: normalize(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: normalize(2),
        borderColor: 'green'
    },
    deleteBtn: {
        width: normalize(20),
        height: normalize(20),
        borderRadius: normalize(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: normalize(2),
        borderColor: 'red',
        marginLeft: normalize(10)
    },
    cancelBtn: {
        width: normalize(20),
        height: normalize(20),
        borderRadius: normalize(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: normalize(2),
        borderColor: 'yellow',
        marginLeft: normalize(10)
    }
})
