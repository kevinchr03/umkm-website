<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Nav from "@/components/Navigations/Navigation.vue"
import Footer from "@/components/Navigations/Footer.vue"

const route = useRoute()

const showLayout = computed(() => !route.path.startsWith('/admin'))
</script>

<template>
  <div>
    <Nav v-if="showLayout" />
    <router-view />
    <Footer v-if="showLayout" />
  </div>
</template>
