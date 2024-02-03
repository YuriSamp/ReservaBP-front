<script setup lang="ts">
import Navbar from '@/components/navbar.vue'
import profileForm from '@/components/profile-form.vue'
import { HttpError, http } from '@/lib/request'
import { inject, onMounted, ref } from 'vue'
import type { VueCookies } from 'vue-cookies'
import type { User } from '@/lib/user'
import router from '@/router'
import { MoveLeft } from 'lucide-vue-next'

const userData = ref<User>()
const $cookies = inject<VueCookies>('$cookies')

const fetchMyUser = async () => {
  const jwt = $cookies?.get('JWT_TOKEN')

  if (!jwt) router.push('/')

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
    <div class="mb-7">
      <RouterLink to="/scheduling">
        <MoveLeft />
      </RouterLink>
    </div>
    <section>
      <h1 class="pb-12 text-3xl text-center">Mude seu perfil</h1>
    </section>
    <section class="flex items-center justify-center h-full">
      <profileForm v-if="userData" :user="userData" />
    </section>
  </main>
</template>
