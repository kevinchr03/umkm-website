<template>
    <div class="error-page">
      <div class="error-content fly-in">
        <img
          src="@/assets/images/robot_centered.png"
          alt="Ilustrasi Error"
          class="error-image"
        />
        <h1 class="error-title">Oops! Terjadi kesalahan</h1>
        <p class="error-message">
          Halaman yang kamu cari mungkin sudah dihapus atau sedang tidak tersedia.
        </p>
        <router-link to="/" class="home-button">Kembali ke Beranda</router-link>
      </div>
    </div>
  </template>
  
  <style scoped>
  @keyframes flyIn {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .fly-in {
    animation: flyIn 0.8s ease-out forwards;
  }
  
  .error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    padding: 20px;
    background-color: #f9fafb;
    text-align: center;
  }
  
  .error-content {
    max-width: 500px;
    opacity: 0; /* Start hidden to animate in */
  }
  
  .error-image {
    width: 100%;
    max-width: 300px;
    margin: 0 auto 30px;
  }
  
  .error-title {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 10px;
  }
  
  .error-message {
    font-size: 1rem;
    color: #4b5563;
    margin-bottom: 30px;
  }
  
  .home-button {
    display: inline-block;
    background-color: #c72a09;
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.3s;
  }
  
  .home-button:hover {
    background-color: #b83939;
  }
  </style>
  