<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'
import { inject, ref } from 'vue'
import { useToast } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import type { VueCookies } from 'vue-cookies'

const email = ref(null)
const password = ref(null)
const confirmPassword = ref(null)
const router = useRouter()
const { toast } = useToast()
const $cookies = inject<VueCookies>('$cookies')

const onSubmit = async (e: Event) => {
  e.preventDefault()
  try {
    const values = {
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    }
    const { data: jwtToken } = await axios.post('http://localhost:8000/signin', { ...values })
    $cookies?.set('JWT_TOKEN', jwtToken, '1h')
    router.push('/dashboard')
  } catch (error) {
    toast({
      title: 'Scheduled: Catch up',
      description: 'Friday, February 10, 2023 at 5:57 PM'
    })
  }
}
</script>

<template>
  <main class="flex h-full justify-center items-center overflow-y-hidden">
    <div class="h-full flex items-center justify-center w-80">
      <form class="flex flex-col gap-4 w-full" @submit="onSubmit">
        <h2 class="flex justify-center text-3xl">Create an account</h2>
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
            placeholder="your coolest password"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Confirm the password *</label>
          <input
            name="confirmPassword"
            type="password"
            v-model="confirmPassword"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="your coolest password"
          />
        </div>
        <Button>Sign up</Button>
        <p>
          Have an account?
          <RouterLink to="/" class="text-[#00bd7e]">Sign in now</RouterLink>
        </p>
      </form>
    </div>
  </main>
</template>
