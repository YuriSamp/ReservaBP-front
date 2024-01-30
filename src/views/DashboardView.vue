<script setup lang="ts">
import { onMounted, inject, ref } from 'vue'
import type { VueCookies } from 'vue-cookies'
import { http } from '@/lib/request'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/navbar.vue'
import DatePicker from '@/components/date-picker.vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

type user = {
  id: number
  name: string
  location: string
  profilePicture: string
}

const $cookies = inject<VueCookies>('$cookies')
const persons = ref<string[] | null>(null)

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
      <form class="flex flex-col items-center justify-center p-20 gap-3">
        <div class="flex flex-col gap-1">
          <label>Consultor</label>
          <Select>
            <SelectTrigger class="w-[280px]">
              <SelectValue placeholder="Selecione um consultor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup v-for="person in persons" :key="person">
                <SelectItem :value="person" class="cursor-pointer"> {{ person }} </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="flex flex-col gap-1">
          <label>Data</label>
          <DatePicker />
        </div>
        <div class="flex flex-col gap-1">
          <label>Hora Início</label>
          <Input class="w-[280px]" type="numeric" placeholder=" -- : --" />
        </div>
        <div class="flex flex-col gap-1 mb-8">
          <label>Hora Fim</label>
          <Input class="w-[280px]" maxlength="4" type="numeric" placeholder=" -- : --" />
        </div>
        <Button class="w-64">Agendar</Button>
      </form>
    </section>
  </main>
</template>
