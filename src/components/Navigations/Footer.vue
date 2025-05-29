<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const scrollToSection = (id) => {
  setTimeout(() => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

onMounted(() => {
  const section = route.query.section
  if (section) scrollToSection(section)
})

const navigateTo = (section) => {
  if (!section) {
    if (route.path !== '/') {
      router.push('/').then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return
  }

  if (route.path !== '/') {
    router.push({ path: '/', query: { section } })
  } else {
    scrollToSection(section)
  }
}


const navigatePage = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="footer-container">
    <div class="top-part">
      <a @click.prevent="navigateTo('')">
        <img src="@/components/icons/logo-invert.png" alt="logo inverted" class="logo-img" />
      </a>

      <div class="content-container">
        <ul class="footer-ul">
          <li><a @click.prevent="navigateTo('about')">About</a></li>
          <li><a @click.prevent="navigateTo('team-profile')">Team Profile</a></li>
          <li><a @click.prevent="navigateTo('map-umkm')">Map UMKM</a></li>
          <li><a href="/list-umkm">List UMKM</a></li>
          <li><a @click.prevent="navigateTo('faq')">FAQ</a></li>
        </ul>
      </div>
    </div>
    <div class="middle-part"></div>
    <div class="lower-part">
      <div class="credit-text">© 2025 suarakeliling.</div>
      <div class="icons">
        <a href="#" class="icon call"></a>
        <a href="#" class="icon gmail"></a>
      </div>
    </div>
  </div>
</template>
<style>
.footer-container {
  display: flex;
  flex-direction: column;
  padding: 40px 60px;
  background-color: #c72a09;
  width: 100%;
  box-sizing: border-box;
}

.top-part {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.logo-img {
  width: 100px;
  height: auto;
}

/* Footer navigation list */
.footer-ul {
  display: flex;
  gap: 80px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.footer-ul li {
  font-size: 16px;
}

.footer-ul li a {
  color: white;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;
}

/* Underline hover effect like nav */
.footer-ul li a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 2.5px;
  background-color: white;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.footer-ul li a:hover {
  color: #ffcccb; /* lighter red for hover */
}

.footer-ul li a:hover::after {
  transform: scaleX(1);
}

.middle-part {
  width: 100%;
  height: 1px;
  background-color: white;
  margin: 40px 0;
}

.lower-part {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
}

.credit-text {
  color: white;
  font-size: 16px;
}

/* Icon styles */
.icons {
  display: flex;
  gap: 20px;
}

.icon {
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex; /* flex center */
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.icon:hover {
  background-color: #ffcccb; /* subtle hover effect */
}

/* Responsive */

@media (max-width: 1024px) {
  .footer-container {
    padding: 30px 40px;
  }

  .logo-img {
    width: 80px;
  }

  .footer-ul {
    gap: 40px;
  }

  .footer-ul li {
    font-size: 14px;
  }

  .credit-text {
    font-size: 14px;
  }

  .icon {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .logo-img {
    width: 50px;
  }
  .footer-container {
    padding: 20px 20px;
  }

  .footer-ul {
    gap: 15px;
  }

  .footer-ul li {
    font-size: 8px;
  }

  .credit-text {
    font-size: 12px;
  }

  .icon {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }
}
</style>
