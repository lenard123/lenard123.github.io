<template>
    <div>
        <ckeditor :editor="customCKEditor" v-model="data" :config="config"/>
    </div>
</template>

<script>
import { customCKEditor } from '@/util'
import { ref, watch } from 'vue'

export default {

  props: {
    modelValue: String
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {

    const data = ref(props.modelValue)

    watch(() => data.value, () => {
        emit('update:modelValue', data.value)
    })

    const config =  {
        
        toolbar: {
            items: [
                '|',
                'heading',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                'alignment',
                'codeBlock',
                'highlight',
                'underline',
                'horizontalLine',
                'code'
            ]
        },
        language: 'en',
        image: {
            toolbar: [
                'imageTextAlternative',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side'
            ]
        },
        licenseKey: '',        
    }

    return {  data, customCKEditor, config }
  }

}
</script>