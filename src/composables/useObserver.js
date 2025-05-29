import { onMounted, ref } from 'vue'

export default function useObserver(animationClass = 'fly-in') {
  const isVisible = ref(false)
  const elementRef = ref(null)

  onMounted(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect() // remove if you want repeated animation
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.value) {
      observer.observe(elementRef.value)
    }
  })

  return {
    elementRef,
    isVisible,
  }
}
