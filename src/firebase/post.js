import { db, FieldValue } from './index.js'


const convertDocument = doc => ({id: doc.id, ...doc.data()})

const convertTags = (tags) => {
    const arrayTag = tags.split(',')
        .map(tag => tag.trim().toUpperCase())
        .filter(tag => tag.length > 0)
    return [...new Set(arrayTag)]
}

export const getPosts = async (filter) => {

    let query = db.collection('posts')

    if (filter) query = db.collection('posts').where('status', '==', filter)

    const snapshot = await query.where('status', '!=', 'deleted').orderBy('status').orderBy('createdAt', 'desc').get({source: 'server'})
    return snapshot.docs.map(convertDocument)
}

export const getPost = async (id) => {
    let post = null
    const data = await Promise.all([
        db.collection('posts').doc(id).get(),
        db.collection('posts').doc(id).collection('content').doc('content').get(),
    ])

    post = data[0].data()
    post.id = id
    post.content = data[1].data().value

    // const post = await db.collection('posts').doc(id).get()
    // const content = await db.collection('contents').doc(post.id).get()
    // post.content = content.data().content
    return post
}

export const createPost = async({title, description, content, status, tags}) => {

    const batch = db.batch()

    const postRef = db.collection('posts').doc()
    const contentRef = postRef.collection('content').doc('content')

    batch.set(postRef, {title, description, createdAt: FieldValue.serverTimestamp(), status, tags:convertTags(tags)})
    batch.set(contentRef, {value: content})

    await batch.commit()
}

export const updatePost = async({title, description, createdAt, content, status, id, tags}) => {
    const batch = db.batch()

    const postRef = db.collection('posts').doc(id)
    const contentRef = postRef.collection('content').doc('content')

    batch.set(postRef, {title,createdAt, description, status, tags:convertTags(tags)})
    batch.set(contentRef, {value: content})

    await batch.commit()

}

export const deletePost = async(id) => {
    await db.collection('posts').doc(id).delete()
}