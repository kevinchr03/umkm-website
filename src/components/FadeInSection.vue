<template>
    <div ref="elementRef" :class="['fly-in', isVisible && 'fly-in-active']">
      <slot />
    </div>
  </template>
  
  <script setup>
  import useObserver from '@/composables/useObserver'
  const { elementRef, isVisible } = useObserver()
  </script>
  