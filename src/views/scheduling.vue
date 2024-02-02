<script setup lang="ts">
import { onMounted, inject, ref } from 'vue'
import type { VueCookies } from 'vue-cookies'
import { http } from '@/lib/request'
import Navbar from '@/components/navbar.vue'
import schedulingForm from '@/components/scheduling-form.vue'
import router from '@/router'

type user = {
  id: number
  name: string
  email: string
  profilePicture: string
}

const $cookies = inject<VueCookies>('$cookies')
const persons = ref<string[]>([])
const userData = ref<user>()

const fetchAllUsers = async () => {
  const jwt = $cookies?.get('JWT_TOKEN')

  if (!jwt) {
    return
  }

  const { data } = await http.get<user[]>('/users', {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })

  console.log({ allUsers: data })
  persons.value = data.map((person) => person.name)
}

const fetchMyUser = async () => {
  const jwt = $cookies?.get('JWT_TOKEN')

  // if (!jwt) router.push('/')

  const { data } = await http.get<user>('/user/me', {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })

  console.log({ myData: data })
  userData.value = data
}

onMounted(async () => {
  try {
    await fetchAllUsers()
    await fetchMyUser()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <main class="flex flex-col items-center bg-[#f9f5f2] min-h-screen">
    <Navbar :profile-picture="userData?.profilePicture" />
    <section>
      <h1 class="pb-12 text-3xl text-center">Scheduling your appointment</h1>
    </section>
    <section class="flex items-center justify-center h-full">
      <schedulingForm :persons="persons" />
    </section>
  </main>
</template>
