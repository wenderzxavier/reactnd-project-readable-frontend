import { getAllPosts, getAllCat, addPost, setPostVote, editPost, getAllComments, setCommentVote, editComment, delPost, addComment, editComment } from "../utils/ReadableAPI";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const CHANGE_SORT = "CHANGE_SORT";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const ADD_POST = "ADD_POST";
export const UP_VOTE_POST = "UP_VOTE_POST";
export const DOWN_VOTE_POST = "DOWN_VOTE_POST";
export const UPDATE_POST_REDUX = "UPDATE_POST_REDUX";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const UP_VOTE_COMMENT = "UP_VOTE_COMMENT";
export const DOWN_VOTE_COMMENT = "DOWN_VOTE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const POST_COMMENT_UPDATE_DELETE = "POST_COMMENT_UPDATE_DELETE";
export const DELETE_POST = "DELETE_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const POST_COMMENT_UPDATE_ADD = "POST_COMMENT_UPDATE_ADD";
export const UPDATE_COMMENT = "UPDATE_COMMENT";


export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

export function fetchP () {

    return function (dispatch) {
        return getAllPosts().then(
            posts => dispatch(receivePosts(posts))
        );
    };
}

export function changeSort (sortValue) {
    return {
        type: CHANGE_SORT,
        sortValue
    }
}

export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
});


export function fetchC () {

    return function (dispatch) {
        return getAllCat().then(
            categories => dispatch(receiveCategories(categories))
        );
    };
}

function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export const addPostRedux = post => dispatch =>
    addPost(post).then(dispatch(addPost(post)));

function upVotePost(id) {
    return {
        type: UP_VOTE_POST,
        id
    };
}

function downVotePost(id) {
    return {
        type: DOWN_VOTE_POST,
        id
    };
}

export const updateVote = (id, vote) => dispatch => {
    setPostVote(id, vote)
    if(vote === "upVote") {
        dispatch(upVotePost(id))
    } else {
        dispatch(downVotePost(id))
    }
}

function updatePostRedux(post) {
    return {
        type: UPDATE_POST_REDUX,
        post
    };
}

export function updatePost(id, post) {
    return function(dispatch) {
        editPost(id, post).then(post => dispatch(updatePostRedux(post)));
    };
}

export function getAllComments(id) {
    return function(dispatch) {
        getAllComments(id).then(comments => dispatch(receiveComments(comments)));
    };
}

function receiveComments(comments) {
    return {
        type: RECEIVE_COMMENTS,
        comments
    };
}

function upVoteComment(id) {
    return {
        type: UP_VOTE_COMMENT,
        id
    };
}

function downVoteComment(id) {
    return {
        type: DOWN_VOTE_COMMENT,
        id
    };
}

export const updateCommentVote = (id, vote) => dispatch => {
    setCommentVote(id, vote)
    if(vote === "upVote") {
        dispatch(upVoteComment(id))
    } else {
        dispatch(downVoteComment(id))
    }
}

function deleteComment(id) {
    return {
        type: DELETE_COMMENT,
        id
    };
}

function postCommentUpdateDelete(id) {
    return {
        type: POST_COMMENT_UPDATE_DELETE,
        id
    }
}

export const deleteCommentRedux = id => dispatch =>
    delComment(id).then(response => {
        const parentId = response.parentId;
        dispatch(deleteComment(id))
        dispatch(postCommentUpdateDelete(parentId))
    });

function deletePost(id) {
    return {
        type: DELETE_POST,
        id
    };
}

export const deletePostRedux = id => dispatch =>
    delPost(id).then(dispatch(deletePost(id)));

function postCommentUpdateAdd(id) {
    return {
        type: POST_COMMENT_UPDATE_ADD,
        id
    }
}

function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const addCommentRedux = comment => dispatch =>
    addComment(comment).then(response => {
        const parentId = response.parentId;
        comment.voteScore = 1;
        dispatch(addComment(comment))
        dispatch(postCommentUpdateAdd(parentId))
    });

function updateComment(comment) {
    return {
        type: UPDATE_COMMENT,
        comment
    };
}

export function updateCommentRedux(id, comment) {
    return function(dispatch) {
        editComment(id, comment).then(comment => dispatch(updateComment(comment)));
    };
}