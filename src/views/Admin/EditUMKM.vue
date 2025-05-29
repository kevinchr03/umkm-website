<template>
  <form @submit.prevent="handleSubmit" class="add-umkm-form">
    <button type="button" class="btn-back" @click="goBack">← Back</button>

    <h2>Edit UMKM</h2>

    <label>Nama UMKM <span class="highlight">*</span></label>
    <input v-model="form.name" type="text" required />

    <label>Kategori UMKM <span class="highlight">*</span></label>
    <div class="radio-group">
      <label v-for="option in categories" :key="option" class="radio-label">
        <input type="radio" name="category" :value="option" v-model="form.category" required />
        {{ option }}
      </label>
    </div>

    <label>Image of UMKM <span class="highlight">*</span></label>
    <input type="file" accept="image/*" multiple @change="handleImageUpload" required />
    <p v-if="form.images.length !== 1" class="error">Please upload exactly 1 image.</p>
    <div class="preview-images">
      <img v-for="(img, i) in imagePreviews" :key="i" :src="img" alt="Preview" />
    </div>

    <label>Deskripsi UMKM <span class="highlight">*</span></label>
    <textarea v-model="form.description" rows="4" required></textarea>

    <label>Suara UMKM (audio) <span class="highlight">*</span></label>
    <input type="file" accept="audio/*" @change="handleVoiceUpload" required />
    <p v-if="!form.voice" class="error">Please upload an audio file.</p>
    <audio v-if="voicePreview" controls :src="voicePreview"></audio>

    <label>YouTube Link ID <span class="highlight">*</span></label>
    <input type="text" v-model="form.youtubeId" placeholder="Enter YouTube video ID" required />

    <fieldset>
      <legend>Lokasi UMKM <span class="highlight">*</span></legend>
      <input placeholder="Alamat" v-model="form.location.alamat" type="text" required />
      <input
        placeholder="Latitude"
        v-model.number="form.location.latitude"
        type="number"
        step="any"
        required
      />
      <input
        placeholder="Longitude"
        v-model.number="form.location.longitude"
        type="number"
        step="any"
        required
      />
    </fieldset>

    <fieldset>
      <legend>Contact Owner <span class="highlight">*</span></legend>
      <input placeholder="Nama Owner" v-model="form.contactOwner.name" type="text" required />
      <input
        placeholder="No Telp"
        v-model="form.contactOwner.phone"
        type="tel"
        pattern="^[0-9()+\\s-]*$"
        required
      />
    </fieldset>

    <button type="submit" :disabled="isSubmitting">Add UMKM</button>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const token = localStorage.getItem('token')
if (!token) {
  console.error('No token found. Redirecting to login...')
  router.push('/admin/') // <== Redirect to /admin/
}

const categories = ['Kuliner', 'Fashion', 'Kerajinan Tangan', 'Otomotif', 'Home & Living']

const form = reactive({
  name: '',
  category: '',
  images: [],
  description: '',
  voice: null,
  youtubeId: '',
  location: {
    alamat: '',
    latitude: null,
    longitude: null,
  },
  contactOwner: {
    name: '',
    phone: '',
  },
})

const loadUMKM = (data) => {
  form.name = data.name || ''
  form.category = data.category || ''
  form.images = data.category || ''
  form.description = data.description || ''
  form.location.alamat = data.location?.alamat || ''
  form.location.latitude = data.location?.latitude ?? null
  form.location.longitude = data.location?.longitude ?? null
  form.contactOwner.name = data.contactOwner?.name || ''
  form.contactOwner.phone = data.contactOwner?.phone || ''
  existingImages.value = Array.isArray(data.images) ? [...data.images] : []
  removedExistingImages.value = []
  existingVoice.value = data.voice || null

  // Clear new uploads and previews
  form.images = []
  imagePreviews.value = []
  form.voice = null
  voicePreview.value = null
}

const imagePreviews = ref([])
const voicePreview = ref(null)
const isSubmitting = ref(false)

const handleImageUpload = (e) => {
  const files = Array.from(e.target.files)
  if (files.length !== 1) {
    form.images = []
    imagePreviews.value = []
    return
  }
  form.images = files
  imagePreviews.value = files.map((f) => URL.createObjectURL(f))
}

const handleVoiceUpload = (e) => {
  const file = e.target.files[0]
  if (file && file.type.startsWith('audio/')) {
    form.voice = file
    voicePreview.value = URL.createObjectURL(file)
  } else {
    form.voice = null
    voicePreview.value = null
  }
}

const validateForm = () => {
  return (
    form.name.trim() &&
    form.category.trim() &&
    form.images.length === 4 &&
    form.description.trim() &&
    form.voice &&
    form.youtubeId &&
    form.location.alamat.trim() &&
    form.location.latitude !== null &&
    form.location.longitude !== null &&
    form.contactOwner.name.trim() &&
    form.contactOwner.phone.trim()
  )
}

const handleSubmit = () => {
  try {
    if (!validateForm()) {
      alert('Please fill all fields correctly and upload exactly 4 images and an audio file.')
      return
    }
    isSubmitting.value = true

    setTimeout(() => {
      alert('UMKM updated successfully!')
      // Reset form
      form.name = ''
      form.category = ''
      form.images = []
      imagePreviews.value = []
      form.description = ''
      form.voice = null
      voicePreview.value = null
      form.location = { alamat: '', latitude: null, longitude: null }
      form.contactOwner = { name: '', phone: '' }
      isSubmitting.value = false
      router.push('/admin/dashboard')
    }, 1000)
  } catch (e) {
    console.log(e)
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
