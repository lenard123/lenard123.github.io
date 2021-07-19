
import { ref, computed } from 'vue'

export default function() {
    const PAGE_STATE = ref('INIT')


    const setPageLoading = () => PAGE_STATE.value = 'LOADING'
    const setPageSuccess = () => PAGE_STATE.value = 'SUCCESS'
    const setPageError = () => PAGE_STATE.value = 'ERROR'

    const setPageStatus = (status) => PAGE_STATE.value = status

    const isPageLoading = computed(() => PAGE_STATE.value === 'LOADING')
    const isPageSuccess = computed(() => PAGE_STATE.value === 'SUCCESS')
    const isPageError = computed(() => PAGE_STATE.value === 'ERROR')

    const isPageStatus = (status) => PAGE_STATE.value === status

    return {
        setPageLoading,
        setPageSuccess,
        setPageError,
        isPageSuccess,
        isPageLoading,
        isPageError,

        setPageStatus,
        isPageStatus
    }
}