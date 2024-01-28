<script setup lang="ts">
import { RouterLink } from 'vue-router'
import axios from 'axios'
import { ref } from 'vue'

const email = ref(null)
const password = ref(null)
const confirmPassword = ref(null)

const onSubmit = async (e: Event) => {
  e.preventDefault()
  const values = {
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  }
  const { status } = await axios.post('http://localhost:8000/signin', { ...values })
  console.log(status)
}
</script>

<template>
  <main class="flex h-full justify-center items-center overflow-y-hidden">
    <div class="h-full flex items-center justify-center w-80">
      <form class="flex flex-col gap-4 w-full" @submit="onSubmit">
        <h2 class="flex justify-center text-3xl text-white">Create an account</h2>
        <div class="flex flex-col gap-2">
          <label>Email *</label>
          <input
            name="email"
            v-model="email"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="Jhon Doe"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Nome *</label>
          <input
            name="email"
            v-model="email"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Profile picture</label>
          <input
            name="email"
            v-model="email"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="place an url"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Password *</label>
          <input
            name="password"
            type="password"
            v-model="password"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="my coolest password"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Confirm the password *</label>
          <input
            name="confirmPassword"
            type="password"
            v-model="confirmPassword"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="my coolest password"
          />
        </div>
        <button class="w-full bg-[#379968] text-white h-10 rounded-md">Sign up</button>
        <p>
          Have an account?
          <RouterLink to="/" class="text-[#00bd7e]">Sign in now</RouterLink>
        </p>
      </form>
    </div>
  </main>
</template>
