<script setup lang="ts">
import Navbar from '@/components/navbar.vue'
import profileForm from '@/components/profile-form.vue'
import { http } from '@/lib/request'
import { inject, onMounted, ref } from 'vue'
import type { VueCookies } from 'vue-cookies'
import type { User } from '@/lib/user'

const userData = ref<User>()
const $cookies = inject<VueCookies>('$cookies')

const fetchMyUser = async () => {
  const jwt = $cookies?.get('JWT_TOKEN')

  if (!jwt) return

  const { data } = await http.get<User>('/user/me', {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })

  userData.value = data
}

onMounted(async () => {
  try {
    await fetchMyUser()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <main class="flex flex-col items-center min-h-screen">
    <Navbar :profile-picture="userData?.profilePicture" />
    <section>
      <h1 class="pb-12 text-3xl text-center">Change your profile</h1>
    </section>
    <section class="flex items-center justify-center h-full">
      <profileForm v-if="userData" :user="userData" />
    </section>
  </main>
</template>
