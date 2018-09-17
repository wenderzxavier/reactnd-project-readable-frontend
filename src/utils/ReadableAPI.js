const api = "http://localhost:3001"

// Generate a unique token for the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const getAllCat = () =>
    fetch(`${api}/categories`, { headers })
        .then((res) => res.json())
        .then((data) => data.categories)
        .catch((err) => console.log(err))

export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then((res) => res.json())
        .catch((err) => console.log(err))

export const getPostsCat = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
        .then((res) => res.json())
        .catch((err) => console.log(err))

export const addPostAPI = (postData) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))

export const getPost = (id) =>
    fetch(`${api}/posts/${id}`, { headers })
        .then((res) => res.json())
        .catch((err) => console.log(err))

export const setPostVote = (id, vote) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify({ 'option': vote })
    })
        .then((res) => { res.json() })
        .then(data => data)
        .catch((err) => console.log(err))

export const editPost = (id, data) =>
    fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))

export const delPost = (id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers: headers
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))


export const getCommentsAPI = (id) =>
    fetch(`${api}/posts/${id}/comments`, { headers })
        .then((res) => res.json())
        .catch((err) => console.log(err))


export const addCommentAPI = (data) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))

export const getComment = (id) =>
    fetch(`${api}/comments/${id}`, { headers })
        .then((res) => res.json())
        .catch((err) => console.log(err))

export const setCommentVote = (id, vote) =>
    fetch(`${api}/comments/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'option': vote })
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))

export const editComment = (id, data) =>
    fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))

export const delComment = (id) =>
    fetch(`${api}/comments/${id}`, {
        method: 'DELETE',
        headers: headers
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))
