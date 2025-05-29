<template>
  <div class="faq-container" id="faq">
    <!-- Left Section -->
    <div class="faq-left">
      <h2>Pertanyaan yang Sering Diajukan (FAQ)</h2>
      <p>
        Temukan jawaban atas pertanyaan umum seputar penggunaan SuaraKeliling, mulai dari cara
        mendaftarkan UMKM hingga fitur QR Code dan peta lokasi. Kami hadir untuk membantu Anda
        memahami layanan kami dengan lebih mudah.
      </p>
    </div>

    <!-- Right Section -->
    <div class="faq-right">
      <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
        <div class="faq-question">
          <h3>
            <span v-html="highlightSuarakeliling(faq.question)"></span>
            <button @click="toggleFAQ(index)">
              {{ openIndex === index ? '-' : '+' }}
            </button>
          </h3>
        </div>

        <!-- Animated answer section -->
        <transition name="fade-slide">
          <div v-if="openIndex === index" class="faq-answer">
            <p v-html="faq.answer"></p>
          </div>
        </transition>
        <hr />
      </div>
    </div>
    <div class="blur-circle bottom-right-2"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openIndex: null,
      faqs: [
        {
          question: 'Apa itu suarakeliling?',
          answer:
            'SuaraKeliling adalah platform digital yang membantu UMKM menampilkan profil usaha mereka, lengkap dengan suara khas, lokasi peta, dan akses melalui QR Code.',
        },
        {
          question: 'Apa fungsi suara dalam profil UMKM saya?',
          answer:
            'Fungsi suara adalah untuk memberikan identitas unik dan meningkatkan kedekatan emosional dengan pelanggan.',
        },
        {
          question: 'Bagaimana cara kerja QR Code di SuaraKeliling?',
          answer:
            'QR Code dapat dipindai oleh pelanggan untuk langsung mengakses profil UMKM Anda lengkap dengan suara, peta, dan informasi lainnya.',
        },
        {
          question: 'Apakah pendaftaran di SuaraKeliling berbayar?',
          answer:
            'Untuk saat ini, pendaftaran di SuaraKeliling <strong>gratis</strong> bagi semua UMKM.',
        },
      ],
    }
  },
  methods: {
    toggleFAQ(index) {
      this.openIndex = this.openIndex === index ? null : index
    },
    highlightSuarakeliling(text) {
      const regex = /(suarakeliling)/gi // case-insensitive match
      return text.replace(regex, '<span class="highlight">$1</span>')
    },
  },
}
</script>

<style scoped>
.faq-container {
  display: flex;
  flex-direction: row;
  position: relative;
  gap: 2rem;
  padding: 6rem 4rem;
  flex-wrap: wrap;
  overflow: hidden;
  max-width: 100vw;
}

.faq-left,
.faq-right {
  flex: 1;
  min-width: 300px;
}

.faq-left h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.faq-left p {
  color: #555;
  line-height: 1.6;
  text-align: justify;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question h3 {
  font-size: 1.1rem;
  font-weight: normal;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question button {
  font-size: 1.5rem;
  background-color: transparent;
  border: none;
  color: black;
  cursor: pointer;
  margin-left: 1rem;
}

.faq-answer {
  color: #555;
  line-height: 1.5;
  text-align: justify;
}
/* FAQ Slide/Fade Animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.bottom-right-2 {
  position: absolute;
  right: -100px; /* Push it further inside */
  bottom: -100px;
}


@media (max-width: 768px) {
  .faq-container {
    flex-direction: column;
    padding: 4rem 2rem;
  }
  .faq-question h3 {
    font-size: 0.8rem;
  }
  .faq-left p {
    color: #555;
    line-height: 1.6;
    text-align: justify;
    font-size: 14px;
  }

  .faq-answer {
    font-size: 12px;
    margin-bottom: 10px;
  }
}
</style>
