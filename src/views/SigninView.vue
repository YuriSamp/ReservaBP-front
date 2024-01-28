<script setup lang="ts">
import { RouterLink } from 'vue-router'
import axios from 'axios'
import { ref } from 'vue'

const email = ref(null)
const password = ref(null)

console.log(email.value, password.value)

const onSubmit = async (e: Event) => {
  e.preventDefault()
  const values = {
    email: email.value,
    password: password.value
  }
  const { data } = await axios.post('http://localhost:8000/signin', { ...values })
  console.log(data)
}
</script>

<template>
  <main class="flex h-[100vh] justify-center items-center">
    <div class="flex items-center justify-center w-80">
      <form class="flex flex-col gap-4 w-full" @submit="onSubmit">
        <h2 class="flex justify-center text-3xl text-white">Welcome back</h2>
        <div class="flex flex-col gap-2">
          <label>Email</label>
          <input
            name="email"
            v-model="email"
            required
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Password</label>
          <input
            name="password"
            type="password"
            v-model="password"
            required
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
          />
        </div>
        <button class="w-full bg-[#379968] text-white h-10 rounded-md">Sign in</button>
        <p>
          Don't have an account?
          <RouterLink to="/signup">Sign up now</RouterLink>
        </p>
      </form>
    </div>
  </main>
</template>
