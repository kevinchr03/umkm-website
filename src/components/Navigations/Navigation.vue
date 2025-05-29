<template>
  <div class="nav-container">
    <div class="logo">
      <a @click.prevent="navigateTo('')">
        <img src="@/components/icons/logo-ori.png" alt="Logo" class="logo-img" />
      </a>
    </div>

    <div class="hamburger" @click="toggleMenu">
      <span :class="{ open: isMenuOpen }"></span>
      <span :class="{ open: isMenuOpen }"></span>
      <span :class="{ open: isMenuOpen }"></span>
    </div>

    <div :class="['content-container', { open: isMenuOpen }]">
      <ul>
        <li><a @click.prevent="navigateTo('about')">About</a></li>
        <li><a @click.prevent="navigateTo('team-profile')">Team Profile</a></li>
        <li><a @click.prevent="navigateTo('map-umkm')">Map UMKM</a></li>
        <li><a @click="navigatePage('/list-umkm')">List UMKM</a></li>
        <li><a @click="navigatePage('/admin')">List UgfMKM</a></li>
        <li><a @click.prevent="navigateTo('faq')">FAQ</a></li>
      </ul>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const route = useRoute()
const router = useRouter()

// Scroll helper
const scrollToSection = (id) => {
  setTimeout(() => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

// Navigate to homepage & section
const navigateTo = (section) => {
  isMenuOpen.value = false

  if (route.path !== '/') {
    router.push({ path: '/', query: { section } })
  } else {
    scrollToSection(section)
  }
}

// For external pages
const navigatePage = (path) => {
  isMenuOpen.value = false
  router.push(path)
}
</script>


<style scoped>
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background-color: white;
  position: relative;
  z-index: 9999;
}

.logo-img {
  width: 100px;
  height: auto;
}

/* Desktop Nav */
.content-container {
  display: flex;
}

.content-container ul {
  display: flex;
  gap: 80px;
}

.content-container ul li {
  list-style: none;
}

.content-container ul li a {
  position: relative;
  text-decoration: none;
  color: black;
  overflow: hidden;
}

/* Underline on hover */
.content-container ul li a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 100%;
  height: 2.5px;
  background-color: #c72a09;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
}

.content-container ul li a:hover::after {
  transform: scaleX(1);
}

/* Hamburger Button */
.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: black;
  transition: 0.3s;
}

.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.hamburger span.open:nth-child(2) {
  opacity: 0;
}

.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(8px, -8px);
}
@media (max-width: 1024px) {
  .logo-img {
    width: 80px;
    height: auto;
  }

  .content-container ul {
    font-size: 16px;
    gap: 40px;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .logo-img {
    width: 60px;
    height: auto;
  }
  .hamburger {
    display: flex;
  }

  .content-container {
    position: absolute;
    top: 70px;
    right: 0;
    background-color: white;
    flex-direction: column;
    width: 100%;
    padding: 20px 0;
    transform: translateY(-200%);
    transition: transform 0.3s ease;
  }

  .content-container.open {
    transform: translateY(0);
  }

  .content-container ul {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
}
</style>
