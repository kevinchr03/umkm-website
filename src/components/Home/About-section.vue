<template>
  <div class="about-container" id="about">
    <h1 class="about-header">Tentang <span class="highlight">suarakeliling.</span></h1>
    <p class="about-text">
      <span class="highlight">suarakeliling.</span> adalah platform digital yang membantu UMKM
      tampil lebih mudah ditemukan dan didengar. Dengan profil usaha lengkap, suara khas, QR Code,
      dan integrasi peta, pelanggan dapat langsung menemukan lokasi UMKM di sekitar mereka. Kami
      hadir untuk mendukung promosi UMKM secara interaktif, praktis, dan terjangkau.
    </p>
  </div>
</template>

<style scoped>
.about-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.highlight {
  color: #c72a09;
}

.about-header {
  font-size: 2.5rem;
  text-align: center;
  margin: 0 0 1rem 0;
}

.about-text {
  font-size: 1.25rem;
  text-align: center;
  padding: 0 5rem;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .about-header {
    font-size: 2rem;
  }
  .about-text {
    font-size: 1.125rem;
    padding: 0 2rem;
  }
}

@media (max-width: 768px) {
  .about-header {
    font-size: 1.75rem;
  }
  .about-text {
    font-size: 1rem;
    padding: 0 1.5rem;
  }
}

@media (max-width: 480px) {
  .about-header {
    font-size: 1.5rem;
  }
  .about-text {
    font-size: 0.95rem;
    padding: 0 1rem;
  }
}
</style>
