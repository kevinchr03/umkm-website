<template>
  <div class="hero-container" id="home">
    <div class="left-side">
      <div class="hero-text">
        <h1 class="heading">SUARA</h1>
        <h1 class="heading">KELILING.</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const words = ['Tampil', 'Terdengar', 'Terjangkau']
const displayText = ref('')
let wordIndex = 0
let charIndex = 0
let isDeleting = false

function typeEffect() {
  const currentWord = words[wordIndex]
  const delay = isDeleting ? 50 : 100

  if (!isDeleting) {
    displayText.value = currentWord.substring(0, charIndex + 1)
    charIndex++
    if (charIndex === currentWord.length) {
      isDeleting = true
      setTimeout(typeEffect, 1500) // wait before deleting
      return
    }
  } else {
    displayText.value = currentWord.substring(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      isDeleting = false
      wordIndex = (wordIndex + 1) % words.length
    }
  }
  setTimeout(typeEffect, delay)
}

onMounted(() => {
  typeEffect()
})
</script>

<style>
.hero-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  background-image: url('@/assets/images/Cowhide.png');
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.hero-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  gap: 0; /* <-- Add this line to eliminate spacing */
  margin: 0;
  padding: 0;
}

.heading {
  font-size: 200px;
  font-weight: 900;
  color: #c72a09;
  line-height: 1;
  text-align: center;
  letter-spacing: -5px;
  margin: 0;
  padding: 0;
}

.hero-text h1:nth-child(2) {
  margin-top: -30px; /* Adjust this value to bring them closer */
}


.cursor {
  display: inline-block;
  animation: blink 1s steps(2, start) infinite;
  color: #c72a09;
}
@keyframes blink {
  to {
    visibility: hidden;
  }
}

.blur-circle {
  position: absolute;
  width: 300px;
  height: 300px;
  background-color: #c72a09;
  border-radius: 50%;
  filter: blur(200px);
  -webkit-filter: blur(200px);
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  will-change: filter;
}

.top-left {
  top: -150px;
  left: -120px;
}
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4f46e5; /* indigo-600 or any accent color */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.bottom-right {
  bottom: -150px;
  right: -120px;
}

@media (max-width: 1024px) {
  .hero-container {
    flex-direction: row; /* Maintain row layout */
    align-items: center;
    padding: 60px 2rem;
    height: auto;
  }

  .heading {
    font-size: 100px;
    line-height: 1.3;
    max-width: 100%;
  }

  .subtitle {
    font-size: 18px;
    max-width: 100%;
    text-align: justify;
  }

  .CTA-Button {
    font-size: 16px;
    padding: 12px 24px;
  }

  .card-wrapper {
    width: 80%; /* Reduce card size on tablets */
    height: auto;
    max-width: 280px; /* Slightly smaller card */
    margin: 0 auto;
  }

  .card-wrapper .card {
    width: 100%; /* Ensure it occupies the card wrapper width */
  }

  .card-wrapper .card-image {
    height: auto;
    width: 100%;
  }

  .card-wrapper .dashed-line {
    top: 70px;
    left: 80px;
    background-size: 85% 85%;
  }

  .dot {
    width: 16px;
    height: 16px;
  }

  .dot-tr {
    top: 10px;
    right: -20px;
  }

  .dot-bl {
    bottom: -15px;
    left: 15px;
  }
}

@media (max-width: 480px) {
  .heading {
    font-size: 48px;
  }

  .subtitle {
    font-size: 16px;
    text-align: justify;
  }

  .CTA-Button {
    font-size: 14px;
    padding: 10px 20px;
  }

  .card-wrapper {
    max-width: 280px;
  }

  .card-wrapper .dashed-line {
    top: 40px;
    left: 35px;
    background-size: 90% 90%;
  }

  .dot-bl {
    left: 5px;
  }
}

@media (max-width: 768px) {
  .hero-container {
    display: block;
  }
}
</style>
