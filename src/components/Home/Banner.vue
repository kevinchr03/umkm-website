<script setup>
const banner = [
  'suarakeliling.',
  'suarakeliling.',
  'suarakeliling.',
  'suarakeliling.',
  'suarakeliling.',
  'suarakeliling.',
  'suarakeliling.',

]
</script>

<template>
  <div class="banner-container">
    <div class="banner-content">
      <ul class="banner-list">
        <li v-for="(item, index) in banner" :key="index" class="banner-item">
            {{ item }}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18V5L21 3V16"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 21C7.65685 21 9 19.6569 9 18C9 16.3431 7.65685 15 6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18 19C19.6569 19 21 17.6569 21 16C21 14.3431 19.6569 13 18 13C16.3431 13 15 14.3431 15 16C15 17.6569 16.3431 19 18 19Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.banner-container {
  width: 100%;
  background-color: #c72a09;
  z-index: 999;
  padding: 30px 40px;
  overflow-x: hidden;
  box-sizing: border-box;
}

.banner-content {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  overflow-x: hidden;
}

.banner-list {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 60px;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.banner-list::-webkit-scrollbar {
  display: none;
}

.banner-item {
  display: inline-flex;
  align-items: center;
  gap: 40px;
  flex-shrink: 0;
  font-size: 1rem; /* Default size */
}

.banner-item svg {
  width: 24px;
  height: 24px;
}

@media (max-width: 1024px) {
  .banner-container {
    padding: 20px 20px;
  }

  .banner-item {
    font-size: 0.8rem; /* Smaller text on mobile */
  }

  .banner-item svg {
    width: 16px;  /* Smaller icon */
    height: 16px;
  }
}

</style>
