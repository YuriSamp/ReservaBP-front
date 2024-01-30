<script setup lang="ts">
import { onMounted, inject, ref } from 'vue'
import type { VueCookies } from 'vue-cookies'
import { http } from '@/lib/request'
import Navbar from '@/components/navbar.vue'
import profileForm from '@/components/profile-form.vue'

type user = {
  id: number
  name: string
  location: string
  profilePicture: string
}

const $cookies = inject<VueCookies>('$cookies')
const persons = ref<string[]>([])

onMounted(async () => {
  try {
    const jwt = $cookies?.get('JWT_TOKEN')

    if (!jwt) {
      return
    }

    const { data } = await http.get<user[]>('/users', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    persons.value = data.map((person) => person.name)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <main class="flex flex-col items-center min-h-screen">
    <Navbar />
    <section>
      <h1 class="pb-12 text-3xl text-center">Change your profile</h1>
    </section>
    <section class="flex items-center justify-center h-full">
      <profileForm />
    </section>
  </main>
</template>
