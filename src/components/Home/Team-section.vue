<template>
  <div class="team-container" id="team-profile">
    <div class="team-left">
      <h1 class="team-heading">Kenali Tim Kami</h1>
      <p class="team-text">
        Di balik SuaraKeliling, terdapat tim kreatif dan berdedikasi yang berkomitmen untuk
        memberdayakan UMKM melalui teknologi. Kami berasal dari berbagai latar belakang, namun
        memiliki visi yang sama: menjadikan suara UMKM terdengar lebih luas dan lebih dekat dengan
        masyarakat.
      </p>
    </div>

    <div class="team-right">
      <div class="image-carousel">
        <div class="carousel-track" ref="track1">
          <div class="carousel-image" v-for="(img, index) in [...images1, ...images1]" :key="index">
            <img :src="img" alt="Team Member" />
          </div>
        </div>
      </div>

      <div class="image-carousel">
        <div class="carousel-track track-reverse" ref="track2">
          <div class="carousel-image" v-for="(img, index) in [...images2, ...images2]" :key="index">
            <img :src="img" alt="Team Member" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import img1 from '@/assets/images/team/Card Jesslyn.png'
import img2 from '@/assets/images/team/Card Keisya.png'
import img3 from '@/assets/images/team/Card Satria.png'
import img4 from '@/assets/images/team/Card Sebriya.png'
import img5 from '@/assets/images/team/Card Shafira.png'
import img6 from '@/assets/images/team/Card Tiffany.png'

const images1 = [img1, img2, img3]
const images2 = [img4, img5, img6]

// Refs for carousel containers
const track1 = ref(null)
const track2 = ref(null)

const scrollCarousel = (trackRef, images, duration = 3000) => {
  let currentIndex = 0

  const moveCarousel = () => {
    const track = trackRef.value
    const image = track?.querySelector('.carousel-image')

    if (!track || !image) return

    const imageWidth = image.offsetWidth

    currentIndex++

    track.style.transition = 'transform 0.6s ease-in-out'
    track.style.transform = `translateX(-${currentIndex * imageWidth}px)`

    // When done scrolling all original images, reset position
    if (currentIndex >= images.length) {
      setTimeout(() => {
        track.style.transition = 'none'
        track.style.transform = 'translateX(0)'
        currentIndex = 0
      }, 600) // Match transition duration
    }
  }

  setInterval(moveCarousel, duration)
}

onMounted(() => {
  scrollCarousel(track1, images1)
  scrollCarousel(track2, images2)
})
</script>

<style scoped>
.team-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
  justify-content: space-between;
  padding: 6rem 4rem;
  background-color: rgba(199, 42, 9, 0.77);
}

.team-left {
  flex: 1 1 400px;
  max-width: 600px;
  margin-right: 100px;
}

.team-heading {
  color: white;
  font-size: 3rem;
  margin-bottom: 1rem;
}

.team-text {
  color: white;
  font-size: 1.125rem;
  line-height: 1.6;
  text-align: justify;
}

.team-right {
  flex: 1 1 300px;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.image-carousel {
  width: 100%;
  max-width: 300px;
  height: auto;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
}

.carousel-track {
  display: flex;
  transition: transform 0.6s ease-in-out;
}

.carousel-image {
  flex-shrink: 0;
  width: 100%;
  max-width: 300px;
  margin: 0;
  padding: 0;
  aspect-ratio: 3 / 4; /* maintains 300x400 proportion */
}

.carousel-track:hover {
  animation-play-state: paused;
}

.carousel-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.track-reverse {
  animation-direction: reverse;
}

/* Responsive breakpoints */
@media (max-width: 1024px) {
  .team-container {
    flex-direction: column;
    padding: 4rem 2rem;
    align-items: center;
  }

  .team-left,
  .team-right {
    max-width: 100%;
    text-align: center;
  }

  .team-text {
    text-align: center;
  }

  .team-heading {
    font-size: 2.5rem;
  }
}

@media (max-width: 600px) {
  .team-left {
    margin: 0 auto;
    text-align: center;
  }
  .team-heading {
    font-size: 2rem;
  }

  .team-text {
    font-size: 1rem;
  }

  .image-carousel {
    width: 100%;
    max-width: 300px;
    /* max-height: 100px; */
    margin: 0 auto;
  }
  /* 
  .carousel-image {
    width: 100%;
  } */
}
</style>
