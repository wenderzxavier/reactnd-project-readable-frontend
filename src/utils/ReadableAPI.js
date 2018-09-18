const API = "http://localhost:3001"

// Generate a unique token for the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = new Headers({
    'Authorization': token,
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
})

export function fetchPosts() {
    return fetch(`${API}/posts`, { headers: headers })
        .then(response => response.json())
}

export function fetchSinglePost(id) {
    return fetch(`${API}/posts/${id}`, { headers: headers })
        .then(response => response.json())
}

export function fetchCategories() {
    return fetch(`${API}/categories`, { headers: headers })
        .then(response => response.json())
}

export const addPostAPI = post =>
    fetch(`${API}/posts`, {
        method: "post",
        headers: headers,
        body: JSON.stringify(post)
    }).then(res => res.json());

export const updateVotePost = (postId, vote) =>
    fetch(`${API}/posts/${postId}`, {
        method: `post`,
        headers: headers,
        body: JSON.stringify({ 'option': vote })
    }).then(res => res.json()).then(data => data)

export const updatePostAPI = (id, post) =>
    fetch(`${API}/posts/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(post)
    }).then(res => res.json());

export function getCommentsAPI(id) {
    return fetch(`${API}/posts/${id}/comments`, { headers: headers })
        .then(response => response.json())
}

export const updateCommentVoteAPI = (commentId, vote) =>
    fetch(`${API}/comments/${commentId}`, {
        method: `post`,
        headers: headers,
        body: JSON.stringify({ 'option': vote })
    }).then(res => res.json()).then(data => data)

export const deleteCommentAPI = id =>
    fetch(`${API}/comments/${id}`, {
        method: "DELETE",
        headers: headers
    })
        .then(res => res.json())
        .then(data => data);

export const deletePostAPI = id =>
    fetch(`${API}/posts/${id}`, {
        method: "DELETE",
        headers: headers
    })
        .then(res => res.json())
        .then(data => data);

export const addCommentAPI = comment =>
    fetch(`${API}/comments`, {
        method: "post",
        headers: headers,
        body: JSON.stringify(comment)
    }).then(res => res.json());

export const updateCommentAPI = (id, comment) =>
    fetch(`${API}/comments/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(comment)
    }).then(res => res.json());
