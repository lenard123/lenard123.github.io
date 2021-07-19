export default {
    data: () => ({
        PAGE_STATE: ''
    }),

    methods: {
        setPageLoading: function() {
            this.PAGE_STATE = 'LOADING'
        },

        setPageSuccess: function() {
            this.PAGE_STATE = 'SUCCESS'
        },

        setPageError: function() {
            this.PAGE_STATE = 'ERROR'
        }
    },

    computed: {
        isPageLoading: function() {
            return this.PAGE_STATE === 'LOADING'
        },

        isPageSuccess: function() {
            return this.PAGE_STATE === 'SUCCESS'
        },

        isPageError: function() {
            return this.PAGE_STATE === 'ERROR'
        }
    }
}