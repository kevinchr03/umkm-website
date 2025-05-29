<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="login">
      <h2>Admin Login</h2>
      <div v-if="error" class="error-alert">Wrong credentials</div>

      <div class="form-group">
        <label for="username">Username</label>
        <input type="username" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref(false)
const API_URL = import.meta.env.VITE_API_KEY

const login = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      name: username.value,
      password: password.value
    })

    const token = response.data.data.token

    if (token) {
      localStorage.setItem('token', token)
      error.value = false
      alert("Login Successful")
      router.push('/admin/dashboard')
    } else {
      // Handle missing token scenario
      error.value = true
      console.error('Login failed: No token returned')
    }
  } catch (e) {
    error.value = true
    console.error('Login error:', e)
  }
}

</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
  padding: 20px;
  box-sizing: border-box;
}

.login-form {
  background-color: #fff;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

.login-form h2 {
  margin-bottom: 24px;
  text-align: center;
  color: #c72a09;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

input[type='username'],
input[type='password'],
.login-button {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}

input[type='text']:focus,
input[type='password']:focus {
  border-color: #c72a09;
  outline: none;
}

.login-button {
  margin-top: 10px;
  background-color: #c72a09;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #a72008;
}

.error-alert {
  background-color: #ffe0e0;
  color: #c72a09;
  border: 1px solid #c72a09;
  padding: 10px;
  margin-bottom: 16px;
  border-radius: 5px;
  text-align: center;
  font-weight: 500;
}
</style>
