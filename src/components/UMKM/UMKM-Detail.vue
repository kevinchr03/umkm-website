<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()

const apiKey = import.meta.env.VITE_MAPS_API_KEY
const API_URL = 'https://1b58-2a02-4780-59-b144-00-1.ngrok-free.app'
const umkmId = route.params.id
const router = useRouter() // <-- this is for navigation

const map = ref(null)

const nightModeStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
]

const umkmData = ref({
  name: '',
  category: '',
  description: '',
  location: '',
  imageUrl: '',
  videoUrl: '',
  mapCoords: { lat: 0, lng: 0 },
})

const url = ref('')
const loading = ref(false)
const fetchUmkmById = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_URL}/umkm/${umkmId}`)
    const data = response.data.data
    if (!data) {
      // If no data found for this ID, redirect to NotFound page
      router.push({ name: 'NotFound' })
      return
    }
    umkmData.value = {
      name: data.namaUmkm,
      category: data.kategoriUmkm,
      description: data.deskripsiUmkm,
      location: data.lokasiId.alamat || '',
      imageUrl: data.gambarUmkm,
      videoUrl: data.suaraUmkm,
      mapCoords: {
        lat: parseFloat(data.lokasiId.latitude),
        lng: parseFloat(data.lokasiId.longitude),
      },
      contact: {
        namaOwner: data.contactId.namaOwner,
        noTelp: data.contactId.noTelp,
      },
    }

    // Update video URL if YouTube
    url.value = `https://www.youtube.com/embed/${data.videoUmkm}`
    initializeMap()

    console.log('Image URL:', umkmData.value.imageUrl)
  } catch (e) {
    router.push({ name: 'NotFound' })
    console.error('Failed to fetch UMKM by ID:', e)
  } finally {
    loading.value = false
  }
}

const initializeMap = () => {
  const mapElement = map.value

  if (!mapElement) return

  const googleMap = new google.maps.Map(mapElement, {
    center: umkmData.value.mapCoords,
    zoom: 14,
    styles: nightModeStyle,
  })

  const svgIcon = {
    url:
      'data:image/svg+xml;charset=UTF-8,' +
      encodeURIComponent(`
      <svg width="169" height="240" viewBox="0 0 169 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M169 84.5C169 131.168 130.271 225.333 84.5 239.417C38.7292 225.333 0 131.168 0 84.5C0 37.8319 37.8319 0 84.5 0C131.168 0 169 37.8319 169 84.5Z" fill="white"/>
        <g filter="url(#filter0_d_2136_106)">
          <circle cx="84.5" cy="84.5" r="63.5" fill="#C72A09" />
          <circle cx="84.5" cy="84.5" r="63" stroke="black" />
        </g>
        <defs>
          <filter id="filter0_d_2136_106" x="17" y="21" width="135" height="135" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2136_106"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2136_106" result="shape"/>
          </filter>
        </defs>
      </svg>
    `),
    scaledSize: new google.maps.Size(30, 45),
    anchor: new google.maps.Point(15, 45),
  }

  const marker = new google.maps.Marker({
    position: umkmData.value.mapCoords,
    map: googleMap,
    title: umkmData.value.namaUmkm,
    icon: svgIcon,
  })

  const infoWindow = new google.maps.InfoWindow({
    content: `
  <div style="font-family: Arial, sans-serif; max-width: 250px; padding: 10px;">
    <h3 style="margin: 0 0 8px; color: #2c3e50;">${umkmData.value.name}</h3>
    <p style="margin: 4px 0; color: #34495e;"><strong>Alamat:</strong> ${umkmData.value.location}</p>
    <p style="margin: 4px 0; color: #34495e;"><strong>Nama Pemilik:</strong> ${umkmData.value.contact.namaOwner}</p>
    <p style="margin: 4px 0; color: #34495e;">
      <strong>No. Telpon:</strong> 
      <a href="tel:${umkmData.value.contact.noTelp}" style="color: #2980b9; text-decoration: none;">
        ${umkmData.value.contact.noTelp}
      </a>
    </p>
  </div>
`,
  })

  marker.addListener('click', () => {
    infoWindow.open(googleMap, marker)
  })
}

onMounted(() => {
  if (!window.google) {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
    script.async = true
    script.defer = true
    script.onload = fetchUmkmById
    document.head.appendChild(script)
  } else {
    fetchUmkmById()
  }
})
</script>

<template>
  <div class="umkm-detail-container">
    <div v-if="loading" class="spinner"></div>

    <div class="blur-circle top-left"></div>
    <div class="blur-circle bottom-right"></div>
    <!-- UMKM Top Section -->
    <div class="umkm-top">
      <!-- Images -->
      <div class="umkm-images">
        <div class="main-image">
          <img :src="umkmData.imageUrl" alt="UMKM Image" />
        </div>
      </div>

      <!-- Text Info -->
      <div class="umkm-info">
        <span class="umkm-category">{{ umkmData.category }}</span>
        <h2 class="umkm-title">{{ umkmData.name }}</h2>
        <div class="umkm-location">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
            />
          </svg>
          <span>{{ umkmData.location }}</span>
        </div>
        <p class="umkm-description">
          {{ umkmData.description }}
        </p>
      </div>
    </div>

    <!-- Location Map Section -->
    <div class="umkm-lower-section">
      <div class="umkm-video-section">
        <h3>Video UMKM</h3>
        <div class="umkm-video-wrapper">
          <iframe
            class="yt-video"
            :src="url"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div class="umkm-location-section">
        <h3>Lokasi UMKM</h3>
        <div ref="map" class="map-image"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Container */
.umkm-detail-container {
  padding: 100px 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: sans-serif;
  position: relative;
  /* overflow: hidden; */
  box-sizing: border-box;
}

/* Top Section */
.umkm-top {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 80px;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.main-image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  aspect-ratio: 2/ 1;
  object-fit: contain;
  display: block;
  background-color: #f0f0f0;
}
/* Image Section */
.umkm-images {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 999;
}

.main-image {
  background: linear-gradient(45deg, #ccc, #eee);
  width: 100%;
  max-width: 100%;
  border-radius: 4px;
  aspect-ratio: 2/ 1;
  min-height: 150px; /* Prevent collapsing */
  /* Optional: Add background-size to scale nicely */
  background-size: cover;
  background-position: center;
}
/* Info Section */
.umkm-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.umkm-category {
  color: #c72a09;
  font-weight: bold;
}

.umkm-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.yt-video {
  width: 100%;
  max-width: 500px;
  height: 800px; /* or a fixed height if needed */
  aspect-ratio: 9 / 16;
}
.umkm-location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #555;
}

.umkm-description {
  color: #666;
  line-height: 1.6;
  margin-top: 10px;
  text-align: justify;
}

/* Lower Section (Map + Video) */
.umkm-lower-section {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.umkm-location-section,
.umkm-video-section {
  flex: 1;
  min-width: 300px;

  display: flex; /* Add this */
  flex-direction: column;
  justify-content: center; /* centers horizontally */
  align-items: center; /* centers vertically */
  /* optionally, if text is multiline, add: */
  text-align: center; /* centers text inside */
}

.map-image {
  width: 100%;
  height: 800px;
  border-radius: 4px;
  min-height: 300px;
}

/* Section Titles */
h3 {
  font-size: 1.8rem;
  margin-bottom: 30px;
}

/* Mobile (<= 768px) */
@media (max-width: 768px) {
  .umkm-top {
    flex-direction: column;
    gap: 20px;
  }

  .main-image {
    aspect-ratio: 4 / 1;
  }

  .umkm-lower-section {
    flex-direction: column;
    gap: 20px;
  }

  .umkm-location-section,
  .umkm-video-section {
    width: 100%;
    min-width: unset;
    align-items: stretch; /* full width content */
  }

  .map-image,
  .yt-video {
    width: 100%;
    height: auto;
  }
}

/* Extra Small (<= 480px) */
@media (max-width: 480px) {
  .umkm-images {
    width: 100% !important;
    max-width: 100% !important;
  }
  .main-image {
    width: 100% !important;
    max-width: 100% !important;
    min-height: 150px;
    aspect-ratio: auto !important; /* Remove fixed aspect ratio on small screens */
  }

  .map-image {
    height: 300px;
  }
  .yt-video {
    height: 300px;
  }

  .umkm-title {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
  }
}
</style>
