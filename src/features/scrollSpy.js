import { computed, ref } from 'vue'

const convertElementToOffset = (element) => {
  return {
    id: element.id,
    top: element.offsetTop,
    bottom: element.offsetTop + element.offsetHeight
  }
}

const mapOffset = (sectionRef) => {
  const section = sectionRef.value?.$el
  if (section) return convertElementToOffset(section)
  return {}
}

const activeLinkReducer = (scrollPosition) => {
  return (activeLink, value) => {
    if (activeLink === null) {
      if (scrollPosition >= value.top && scrollPosition < value.bottom)
        return value.id
    }
    return activeLink
  }
}

export default function (sectionRefs) {

  const sectionsOffset = computed(() => {
    return sectionRefs.map(mapOffset)
  })

  const scrollPosition = ref(window.scrollY)
  const activeLink = computed(() => sectionsOffset.value.reduce(activeLinkReducer(scrollPosition.value+60), null))

  document.addEventListener('scroll', () => {
    scrollPosition.value = window.scrollY
  })

  return {
    scrollPosition,
    activeLink
  }

}