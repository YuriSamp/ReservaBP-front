<script setup lang="ts">
import { onMounted, inject, ref } from 'vue'
import type { VueCookies } from 'vue-cookies'
import { http } from '@/lib/request'
import Navbar from '@/components/navbar.vue'
import schedulingForm from '@/components/scheduling-form.vue'

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
  <main class="flex flex-col items-center bg-[#f9f5f2] min-h-screen">
    <Navbar />
    <section>
      <h1 class="pb-12 text-3xl text-center">Scheduling your appointment</h1>
    </section>
    <section class="flex items-center justify-center h-full">
      <schedulingForm :persons="persons" />
    </section>
  </main>
</template>
