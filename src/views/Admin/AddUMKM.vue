<template>
  <form @submit.prevent="handleSubmit" class="add-umkm-form">
    <button type="button" class="btn-back" @click="goBack">← Back</button>

    <h2>Add UMKM</h2>

    <label>Nama UMKM <span class="highlight">*</span></label>
    <input v-model="form.namaUmkm" type="text" required />

    <label>Kategori UMKM <span class="highlight">*</span></label>
    <div class="radio-group">
      <label v-for="option in categories" :key="option" class="radio-label">
        <input
          type="radio"
          name="kategoriUmkm"
          :value="option"
          v-model="form.kategoriUmkm"
          required
        />
        {{ option }}
      </label>
    </div>

    <label>Image of UMKM <span class="highlight">*</span></label>
    <input type="file" @change="handleImageUpload" ref="imageInput" accept="image/*" />
    <p v-if="form.gambarUmkm.length !== 1" class="error">Please upload exactly 1 image.</p>
    <div class="preview-images">
      <img v-for="(img, i) in imagePreviews" :key="i" :src="img" alt="Preview" />
    </div>

    <label>Deskripsi UMKM <span class="highlight">*</span></label>
    <textarea v-model="form.deskripsiUmkm" rows="4" required></textarea>

    <label>Suara UMKM (audio) <span class="highlight">*</span></label>
    <input type="file" @change="handleVoiceUpload" ref="voiceInput" accept="audio/*" />
    <p v-if="!form.suaraUmkm" class="error">Please upload an audio file.</p>
    <audio v-if="voicePreview" controls :src="voicePreview"></audio>

    <label>YouTube Link ID <span class="highlight">*</span></label>
    <input type="text" v-model="form.videoUmkm" placeholder="Enter YouTube video ID" required />

    <fieldset>
      <legend>Lokasi UMKM <span class="highlight">*</span></legend>
      <input placeholder="Alamat" v-model="form.lokasi.alamat" type="text" required />
      <input
        placeholder="Latitude"
        v-model.number="form.lokasi.latitude"
        type="number"
        step="any"
        required
      />
      <input
        placeholder="Longitude"
        v-model.number="form.lokasi.longitude"
        type="number"
        step="any"
        required
      />
    </fieldset>

    <fieldset>
      <legend>Contact Owner <span class="highlight">*</span></legend>
      <input placeholder="Nama Owner" v-model="form.contactOwner.namaOwner" type="text" required />
      <input
        placeholder="No Telp"
        v-model="form.contactOwner.noTelp"
        type="tel"
        pattern="^[0-9+()-\\s]*$"
        required
      />
    </fieldset>

    <button type="submit" :disabled="isSubmitting">Add UMKM</button>
  </form>
</template>

<script setup>
import axios from 'axios'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const imageInput = ref(null)
const voiceInput = ref(null)
const router = useRouter()

const token = localStorage.getItem('token')
if (!token) {
  console.error('No token found. Redirecting to login...')
  router.push('/admin/')
}

const API_URL = 'https://1b58-2a02-4780-59-b144-00-1.ngrok-free.app'

const categories = ['Kuliner', 'Fashion', 'Kerajinan Tangan', 'Otomotif', 'Home & Living']

const form = reactive({
  namaUmkm: '',
  kategoriUmkm: '',
  gambarUmkm: [],
  deskripsiUmkm: '',
  suaraUmkm: null,
  videoUmkm: '',
  lokasi: {
    alamat: '',
    latitude: null,
    longitude: null,
  },
  contactOwner: {
    namaOwner: '',
    noTelp: '',
  },
})

const imagePreviews = ref([])
const voicePreview = ref(null)
const isSubmitting = ref(false)

const handleImageUpload = (e) => {
  const files = Array.from(e.target.files)
  if (files.length !== 1) {
    form.gambarUmkm = []
    imagePreviews.value = []
    return
  }
  form.gambarUmkm = files
  imagePreviews.value = files.map((f) => URL.createObjectURL(f))
}

const handleVoiceUpload = (e) => {
  const file = e.target.files[0]
  if (file && file.type.startsWith('audio/')) {
    form.suaraUmkm = file
    voicePreview.value = URL.createObjectURL(file)
  } else {
    form.suaraUmkm = null
    voicePreview.value = null
  }
}

const validateForm = () => {
  return (
    form.namaUmkm.trim() &&
    form.kategoriUmkm.trim() &&
    form.gambarUmkm.length === 1 &&
    form.deskripsiUmkm.trim() &&
    form.suaraUmkm &&
    form.videoUmkm.trim() &&
    form.lokasi.alamat.trim() &&
    form.lokasi.latitude !== null &&
    form.lokasi.longitude !== null &&
    form.contactOwner.namaOwner.trim() &&
    form.contactOwner.noTelp.trim()
  )
}

const handleSubmit = async () => {
  if (!validateForm()) {
    alert('Please fill all fields correctly and upload exactly 1 image and an audio file.')

    // Clear image and audio preview states
    form.gambarUmkm = []
    imagePreviews.value = []
    form.suaraUmkm = null
    voicePreview.value = null

    // 🧼 Also clear the actual <input> file values
    if (imageInput.value) imageInput.value.value = ''
    if (voiceInput.value) voiceInput.value.value = ''

    return
  }

  isSubmitting.value = true

  const token = localStorage.getItem('token')
  if (!token) {
    alert('Authentication token not found. Please log in again.')
    router.push('/admin/')
    return
  }

  try {
    const formData = new FormData()
    formData.append('namaUmkm', form.namaUmkm)
    formData.append('kategoriUmkm', form.kategoriUmkm)
    formData.append('deskripsiUmkm', form.deskripsiUmkm)
    formData.append('videoUmkm', form.videoUmkm)

    // Append nested location fields separately:
    formData.append('lokasi.alamat', form.lokasi.alamat)
    formData.append('lokasi.latitude', form.lokasi.latitude)
    formData.append('lokasi.longitude', form.lokasi.longitude)

    // Append nested contact fields separately:
    formData.append('contact.namaOwner', form.contactOwner.namaOwner)
    formData.append('contact.noTelp', form.contactOwner.noTelp)

    // Append exactly 1 image file
    formData.append('gambarUmkm', form.gambarUmkm[0])

    // Append voice file
    formData.append('suaraUmkm', form.suaraUmkm)
    for (const pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1])
    }

    await axios.post(`${API_URL}/umkm/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    alert('UMKM added successfully!')

    // Reset form
    form.namaUmkm = ''
    form.kategoriUmkm = ''
    form.gambarUmkm = []
    imagePreviews.value = []
    form.deskripsiUmkm = ''
    form.suaraUmkm = null
    voicePreview.value = null
    form.videoUmkm = ''
    form.lokasi = { alamat: '', latitude: null, longitude: null }
    form.contactOwner = { namaOwner: '', noTelp: '' }
    isSubmitting.value = false

    router.push('/admin/dashboard')
  } catch (e) {
    console.error('Error submitting UMKM:', e)

    if (e.response) {
      console.log('Response data:', e.response.data)
      if (e.response.data.errors) {
        const messages = e.response.data.errors.map((err) => `${err.path}: ${err.msg}`).join('\n')
        alert(`Validation errors:\n${messages}`)
      } else if (typeof e.response.data === 'string') {
        alert(`Server error: ${e.response.data}`)
      } else {
        alert('Failed to submit UMKM. Please try again later.')
      }
    } else {
      alert('No response from server.')
    }
    isSubmitting.value = false
  }
}

const goBack = () => {
  router.push('/admin/dashboard')
}
</script>

<style scoped>
.add-umkm-form {
  max-width: 480px;
  margin: 0 auto;
  padding: 24px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgb(199 42 9 / 0.15);
  position: relative;
}

.btn-back {
  background: none;
  border: none;
  color: #c72a09;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 18px;
  transition: color 0.3s ease;
}

.btn-back:hover {
  color: #a32607;
}

h2 {
  text-align: center;
  color: #c72a09;
  margin-bottom: 20px;
  font-weight: 700;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
  color: #333;
}

input[type='text'],
input[type='number'],
input[type='tel'],
textarea,
input[type='file'] {
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input[type='text']:focus,
input[type='number']:focus,
input[type='tel']:focus,
textarea:focus,
input[type='file']:focus {
  border-color: #c72a09;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.preview-images {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.preview-images img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #ccc;
}

audio {
  display: block;
  margin-bottom: 16px;
  width: 100%;
}

.error {
  font-size: 13px;
  color: #d9534f;
  margin-top: -12px;
  margin-bottom: 16px;
}

fieldset {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 14px 20px;
  margin-bottom: 20px;
}

legend {
  padding: 0 10px;
  font-weight: 700;
  color: #c72a09;
}

button[type='submit'] {
  width: 100%;
  background-color: #c72a09;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  padding: 12px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type='submit']:disabled {
  background-color: #9e2b0c99;
  cursor: not-allowed;
}

button[type='submit']:hover:not(:disabled) {
  background-color: #a32607;
}
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.radio-label {
  font-weight: 600;
  color: #333;
  cursor: pointer;
  user-select: none;
}

.radio-label input[type='radio'] {
  margin-right: 6px;
  cursor: pointer;
}
</style>
