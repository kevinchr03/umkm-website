<template>
  <div class="map-container" id="map-umkm">
    <h1 class="map-header">UMKM Di Sekitar <span class="highlight">Surabaya</span>.</h1>
    <div ref="map" class="map" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const apiKey = import.meta.env.VITE_MAPS_API_KEY
const map = ref(null)
const umkmList = ref([])

// Add protocol to API_URL for axios to work correctly
const API_URL = 'https://1b58-2a02-4780-59-b144-00-1.ngrok-free.app'

// Night mode style unchanged...

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

// Fetch UMKM data from API
const fetchUmkm = async () => {
  try {
    const response = await axios.get(`${API_URL}/umkm/`)
    umkmList.value = response.data.data
    console.log('Fetched UMKM locations:', umkmList.value)
  } catch (error) {
    console.error('Failed to fetch UMKM:', error)
  }
}

// Initialize map and markers based on fetched data
function initializeMap() {
  map.value = new google.maps.Map(document.querySelector('#map-umkm .map'), {
    center: { lat: -7.2575, lng: 112.7521 }, // default center
    zoom: 14,
    styles: nightModeStyle,
  })

  const svgMarker = `
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
  `

  const svgIcon = {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgMarker),
    scaledSize: new google.maps.Size(20, 36),
    anchor: new google.maps.Point(10, 36), // Adjusted anchor to match scaled size
  }

  // Place markers using actual UMKM data
  umkmList.value.forEach((item) => {
  if (item.lokasiId?.latitude && item.lokasiId?.longitude) {
    const lat = parseFloat(item.lokasiId.latitude)
    const lng = parseFloat(item.lokasiId.longitude)
    const title = item.namaUmkm || 'UMKM Location'

    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: map.value,
      title,
      icon: svgIcon,
    })

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 250px; padding: 10px;">
          <h3 style="margin: 0 0 8px; color: #2c3e50;">${item.namaUmkm || 'UMKM'}</h3>
          <p style="margin: 4px 0; color: #34495e;"><strong>Alamat:</strong> ${item.lokasiId.alamat || 'N/A'}</p>
          <p style="margin: 4px 0; color: #34495e;"><strong>Nama Pemilik:</strong> ${item.contactId?.namaOwner || 'N/A'}</p>
          <p style="margin: 4px 0; color: #34495e;">
            <strong>No. Telpon:</strong> 
            <a href="tel:${item.contactId?.noTelp || '#'}" style="color: #2980b9; text-decoration: none;">
              ${item.contactId?.noTelp || '-'}
            </a>
          </p>
        </div>
      `,
    })

    marker.addListener('click', () => {
      infoWindow.open(map.value, marker)
    })
  }
})


  // Optional: recenter map to first UMKM location if exists
  if (umkmList.value.length > 0 && umkmList.value[0].lokasiId) {
    const firstLat = parseFloat(umkmList.value[0].lokasiId.latitude)
    const firstLng = parseFloat(umkmList.value[0].lokasiId.longitude)
    map.value.setCenter({ lat: firstLat, lng: firstLng })
  }
}

onMounted(async () => {
  await fetchUmkm() // wait for data to fetch before map init

  // Load Google Maps script if not already loaded
  if (!window.google) {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
    script.async = true
    script.defer = true
    script.onload = initializeMap
    document.head.appendChild(script)
  } else {
    initializeMap()
  }
})
</script>

<style>
.map-container {
  padding: 70px 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/images/Cowhide.png');
  background-size: cover;
  background-position: center;
}

.map-header {
  text-align: center;
  margin-bottom: 40px;
  background-color: black;
  color: white;
  padding: 10px 20px;
}

.map {
  width: 100%;
  max-width: 1000px;
  height: 450px;
  border-radius: 6px;
}

.highlight {
  color: #c72a09;
}
</style>
