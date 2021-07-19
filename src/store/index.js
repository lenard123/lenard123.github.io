
import { createStore } from 'vuex'
import { auth } from '@/firebase/index.js'
import { getPosts } from '@/firebase/post.js'
import { onMessageChanged } from '@/firebase/message.js'

const store = createStore({
    state: () => ({
        user: null,
        hasInitialized: false,
        posts: null,
        messages: [],
    }),

    mutations: {
        SET_USER: (state, user) => {
            state.user = user
            state.hasInitialized = true
        },

        SET_POSTS: (state, posts) => {
            state.posts = posts
        },

        UPDATE_MESSAGES: (state, {newIndex, oldIndex, doc, type}) => {
            const data = {id: doc.id, ...doc.data()}
            switch(type) {
                case 'added':
                    state.messages.splice(newIndex, 0, data);
                    break;
                case 'modified':
                    state.messages.splice(oldIndex, 1)
                    state.messages.splice(newIndex, 0, data);
                    break;
                case 'removed':
                    state.messages.splice(oldIndex, 1)
                    break;
            }
        },        
    },

    getters: {

        messages: state => { 
            // [{email, name, message, createdAt}]
            //[email,[{name, message, createdAt}]]
            const allMessages = []
            state.messages.forEach(message => {
                let userMessage = allMessages.find(item => item.email === message.email)
                if (userMessage) {
                    userMessage.messages.push(message)
                } else {
                    allMessages.push({email: message.email, messages: [message]})
                }
            })
            return allMessages
        },

        tags: state => {
            const tags = []
            if (state.posts !== null) {
                state.posts.forEach(post => {
                    post.tags.forEach(tag => {
                        let _tag = tags.find(item => item.name === tag)
                        if (_tag) {
                            tag.count++
                        } else {
                            tags.push({name: tag, count: 1})
                        }
                    })
                })
            }
            return tags
        }
    },

    actions: {
        bindAuth: ({ commit }) => {
            auth.onAuthStateChanged(user => {
                commit('SET_USER', user)
            })
        },

        login: async (context, { email, password}) => {
            await auth.signInWithEmailAndPassword(email, password)
        },

        fetchPosts: async ({ commit, state }) => {
            if (state.posts === null) { 
                commit('SET_POSTS', await getPosts('published'))
            }
        },

        bindMessage: ({ commit }) => {

            onMessageChanged(snapshot => {
                snapshot.docChanges().forEach(change => {
                    commit('UPDATE_MESSAGES', change)
                })
            })

            // db.collection('messages').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            //     snapshot.docChanges().forEach(change => {
            //         commit('UPDATE_MESSAGES', change)
            //     })
            // })
            // db.collection('posts').onSnapshot( ref => {
            //     ref.docChanges().forEach(change => {
            //         commit('CHANGE_POSTS', change)
            //     })
            // })            
        }
    }
})

export default store
/*import { createStore } from 'vuex'
import { db, auth, FieldValue } from '@/firebase/index.js'

const store = createStore({
    state: () => ({
        user: null,
        init: true,
        posts: []
    }),

    mutations: {
        SET_USER: (state, user) => {
            state.user = user
            state.init = false
        },

        CHANGE_POSTS: (state, { newIndex, oldIndex, doc, type }) => {

            const post = { id: doc.id, ...doc.data() }

            if (type === 'added') {

                state.posts.splice(newIndex, 0, post)

            } else if (type === 'modified') {

                state.posts.splice(oldIndex, 1)
                state.posts.splice(newIndex, 0, post)

            } else if (type === 'removed' ) {

                state.posts.splice(oldIndex, 1)

            }
        },

        ADD_POST: (state, post) => {
            state.posts.push(post)
        }
    },

    getters: {
        post: (state) => {
            return (id) => {
                return state.posts.find(post => post.id === id)
            }
        }        
    },

    actions: {

        bindAuth: ({ commit }) =>{
            auth.onAuthStateChanged(user => {
                commit('SET_USER', user)
            })
        },

        bindPosts: ({ commit }) => {
            db.collection('posts').onSnapshot( ref => {
                ref.docChanges().forEach(change => {
                    commit('CHANGE_POSTS', change)
                })
            })
        },

        fetchPosts: async ({ commit }) => {
            const snapshot = await db.collection('posts').get({source: 'server'})
            snapshot.docs.forEach(doc => {
                commit('ADD_POST', {id: doc.id, ...doc.data()})
            })
            // return new Promise((resolve, reject) => {
            //     db.collection('posts').get({source: 'server'}).then(snapshot => {
            //         window.snapshot = snapshot
            //         console.log('called')
            //         snapshot.docs.forEach(doc => commit('ADD_POST', {id: doc.id, ...doc.data()}))
            //         resolve()
            //     }).catch(reject)

                // try {
                //     const postsDocuments = await db.collection('posts').get()
                //     postsDocuments.docs.forEach(doc => {
                //         const { id } = doc.id
                //         commit('ADD_POST', Object.assign(doc.data(), {id}))
                //     })
                //     resolve()                    
                // } catch (error) {
                //     reject(error)
                // }
            //})
        },

        createPost: (context, {title, description, content}) => {

            const batch = db.batch()
            const postsRef = db.collection('posts')
            const contentsRef = db.collection('contents')

            const postRef = postsRef.doc()
            const contentRef = contentsRef.doc()

            batch.set(postRef, {
                title, 
                description, 
                contentRef: `contents/${contentRef.id}`,
                createdAt: FieldValue.serverTimestamp()
            })
            batch.set(contentRef, {content})

            batch.commit()
        },

        getPost: async (context, id) => {
            const post = context.state.posts.find(post => post.id === id) || (await db.collection('posts').doc(id).get()).data()
            post.content = (await db.doc(post.contentRef).get()).data().content
            return post
        },

        login: async (context, { email, password}) => {
            await auth.signInWithEmailAndPassword(email, password)
        },

        logout: () => {
            auth.signOut()
        }
    }
})

export default store*/