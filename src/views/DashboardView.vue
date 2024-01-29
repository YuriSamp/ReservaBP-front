<script setup lang="ts">
import { onMounted, inject, ref } from 'vue'
import type { VueCookies } from 'vue-cookies'
import { http } from '@/lib/request'

type user = {
  id: number
  name: string
  location: string
  profilePicture: string
}

const $cookies = inject<VueCookies>('$cookies')
const persons = ref<user[] | null>(null)

onMounted(async () => {
  try {
    const jwt = $cookies?.get('JWT_TOKEN')

    if (!jwt) {
      return
    }

    const { data } = await http.get('/users', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    persons.value = data
    console.log(data)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <main class="flex flex-col items-center pt-28">
    <div>
      <h1 class="pb-12 text-3xl text-center">Consultores disponiveis para agendamento</h1>
      <div class="w-[1000px]">
        <input class="rounded-3xl border border-gray-600 py-2 px-3 w-full" />
      </div>
      <section class="pt-12">
        <ul class="flex flex-col gap-4">
          <li v-for="person in persons" :key="person.id">
            <div
              class="rounded-3xl w-full border border-green-400 flex gap-4 p-3 shadow-md shadow-green-400 cursor-pointer"
            >
              <div class="rounded-full">
                <img :src="person.profilePicture" class="w-20 h-20" />
              </div>
              <div class="flex flex-col justify-center gap-2">
                <span class="text-3xl">{{ person.name }}</span>
                <span>location : {{ person.location }}</span>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>
