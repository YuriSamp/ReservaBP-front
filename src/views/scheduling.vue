<script setup lang="ts">
import { onMounted, inject, ref } from 'vue'
import type { VueCookies } from 'vue-cookies'
import { HttpError, http } from '@/lib/request'
import Navbar from '@/components/navbar.vue'
import schedulingForm from '@/components/scheduling-form.vue'
import router from '@/router'

type user = {
  id: number
  role: string
  name: string
  email: string
  profilePicture: string
}

const $cookies = inject<VueCookies>('$cookies')
const persons = ref<{ email: string; name: string }[]>([])
const userData = ref<user>()
const clientData = ref<{ email: string; name: string }>()

const fetchAllUsers = async () => {
  const jwt = $cookies?.get('JWT_TOKEN')

  const { data } = await http.get<user[]>('/users', {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })

  persons.value = data
    .filter((person) => person.role === 'Corretor de seguro')
    .map((person) => ({ name: person.name, email: person.email }))
}

const fetchMyUser = async () => {
  const jwt = $cookies?.get('JWT_TOKEN')

  const { data } = await http.get<user>('/user/me', {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })

  userData.value = data
  clientData.value = { name: data.name, email: data.email }
}

onMounted(async () => {
  try {
    await fetchAllUsers()
    await fetchMyUser()
  } catch (err) {
    if (err instanceof HttpError) {
      if (err.response?.status === 401) {
        router.push('/')
      }
    }
  }
})
</script>

<template>
  <main class="flex flex-col min-h-screen md:px-56 xl:px-96">
    <Navbar :profile-picture="userData?.profilePicture" />
    <section class="mt-7">
      <h1 class="pb-12 text-3xl text-center">Agende sua consulta</h1>
    </section>
    <section class="flex items-center justify-center h-full">
      <schedulingForm v-if="clientData" :persons="persons" :client="clientData" />
    </section>
  </main>
</template>
