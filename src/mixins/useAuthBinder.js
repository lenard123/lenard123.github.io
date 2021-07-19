import { useStore } from 'vuex'
import { computed, watch } from 'vue'

export default function() {
    const store = useStore()
    const hasInitialized = computed(() => store.state.hasInitialized)
    const hasUser = computed(() => store.state.user !== null)

    const userChanged = (cb) => {
        watch(() => hasUser.value, () => {
            cb(hasUser.value)
        })

        watch(() => hasInitialized.value, () =>{
            cb(hasUser.value)
        })
    }

    if (!hasInitialized.value) {
        store.dispatch('bindAuth')
    }

    return { hasInitialized, hasUser, userChanged }
}