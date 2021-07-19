import { reactive, ref } from 'vue'
import { getPosts } from '@/firebase/post.js'

export default function(filter) {
    const posts = reactive([])
    const fetchState = ref('INIT')

    const fetchPosts = () => {
        fetchState.value = 'LOADING'

        getPosts(filter).then((result) => {
            posts.splice(0)
            result.forEach((post) => posts.push(post))
            fetchState.value = 'SUCCESS'
        }).catch(error => {
            console.log(error)
            fetchState.value = 'ERROR'
        })
    }

    return { posts, fetchPosts, fetchState }
}
