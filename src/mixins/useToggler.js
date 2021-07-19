
import { ref, computed } from 'vue'

export default function(initial_state = false) {

    const state = ref(initial_state)

    const toggle = () => {
        state.value = !state.value
    }

    const setOn = () => {
        state.value = true
    }

    const setOff = () => {
        state.value = false
    }

    const isOn = computed( () => state.value)
    const isOff = computed( () => !state.value)

    return { toggle, setOn, setOff, isOn, isOff }
}