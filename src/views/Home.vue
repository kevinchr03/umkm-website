<template>
  <FadeInSection>
    <HeroSection />
  </FadeInSection>

  <Banner />

  <FadeInSection>
    <AboutSection />
  </FadeInSection>

  <FadeInSection>
    <TeamProfile />
  </FadeInSection>

  <FadeInSection>
    <MapSection />
  </FadeInSection>

  <Banner />

  <FadeInSection>
    <FAQSection />
  </FadeInSection>
</template>

<script setup>
import FadeInSection from '@/components/FadeInSection.vue'
import HeroSection from '@/components/Home/Hero-Section.vue'
import Banner from '@/components/Home/Banner.vue'
import AboutSection from '@/components/Home/About-section.vue'
import TeamProfile from '@/components/Home/Team-section.vue'
import MapSection from '@/components/Home/Map-Section.vue'
import FAQSection from '@/components/Home/FAQ-Section.vue'

import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const scrollToSection = (id) => {
  setTimeout(() => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

onMounted(() => {
  if (route.query.section) {
    scrollToSection(route.query.section)
  }
})

watch(() => route.query.section, (newVal) => {
  if (newVal) {
    scrollToSection(newVal)
  }
})
</script>
