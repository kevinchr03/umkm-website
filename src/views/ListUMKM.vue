<template>
  <div class="list-umkm-container">
    <div class="blur-circle top-left"></div>
    <div class="blur-circle bottom-right"></div>

    <h1 class="umkm-title">List UMKM</h1>
    <div v-if="loading" class="spinner"></div>

    <div class="umkm-cards-row">
      <div class="umkm-card" v-for="(umkm, index) in umkmList" :key="index">
        <div class="play-button" @click="playAudio(index)">
          <div class="play-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 6L38 24L10 42V6Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="play-text">Play Sound</div>
          <audio :ref="(el) => (audioRefs[index] = el)" :src="umkm.suaraUmkm" />
        </div>
        <div class="umkm-detail">
          <a v-bind:href="`/detail-umkm/${umkm._id}`">Lihat Detail UMKM</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_KEY
const umkmList = ref([])
const audioRefs = ref([])
const loading = ref(false)
const fetchUmkm = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_URL}/umkm/`)
    umkmList.value = response.data.data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const playAudio = (index) => {
  const audio = audioRefs.value[index]
  if (audio) {
    audio.currentTime = 0
    audio.play()
  }
}

onMounted(() => {
  fetchUmkm()
})
</script>

<style scoped>
.list-umkm-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 60px 20px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.umkm-title {
  text-align: center;
  margin-bottom: 80px;
  font-size: 2.5rem;
}

.umkm-cards-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  padding: 0 20px;
  justify-items: center;
}

.umkm-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 250px;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
}

.umkm-card:hover {
  transform: translateY(-5px);
}

.play-button {
  padding: 1.2rem 2rem;
  background-color: #c72a09;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  gap: 10px;
  width: 100%;
}

.play-text {
  font-size: 1.2rem;
  text-align: center;
}

.umkm-detail a {
  text-decoration: none;
  color: #084b83;
  font-weight: 500;
}

@media (max-width: 768px) {
  .umkm-title {
    font-size: 2rem;
    margin-bottom: 32px;
  }

  .umkm-card {
    width: 100%;
    max-width: 300px;
  }

  .play-button {
    padding: 1rem;
    font-size: 1rem;
  }

  .play-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .umkm-title {
    font-size: 1.6rem;
  }

  .umkm-cards-row {
    gap: 24px;
  }

  .umkm-card {
    padding: 12px;
  }
}
</style>
