<script setup lang="ts">
import { inject, ref } from 'vue'
import { Button } from '@/components/ui/button'
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
import { http } from '@/lib/request'
import type { VueCookies } from 'vue-cookies'

const { persons } = defineProps<{
  persons: string[]
}>()

const $cookies = inject<VueCookies>('$cookies')
const corretor = ref('')
const date = ref<Date>(new Date())
const startTime = ref<string>()
const endTime = ref<string>()

const onSubmit = async (e: Event) => {
  e.preventDefault()

  const dateFormat = (date: Date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  }

  const payload = {
    corretor: corretor.value,
    date: dateFormat(date.value),
    startTime: startTime.value,
    endTime: endTime.value
  }

  const jwt = $cookies?.get('JWT_TOKEN')

  const response = await http.post(
    '/scheduling',
    {
      data: payload
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
  )

  console.log(response)
}
</script>

<template>
  <form class="flex flex-col items-center justify-center p-20 gap-3" @submit="onSubmit">
    <div class="flex flex-col gap-1">
      <label>Corretor</label>
      <Select v-model="corretor">
        <SelectTrigger class="w-[280px]">
          <SelectValue placeholder="Selecione um corretor" />
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
      <DatePicker v-model="date" />
    </div>
    <div class="flex flex-col gap-1">
      <label>Hora Início</label>
      <Input
        class="w-[280px]"
        type="numeric"
        maxlength="4"
        placeholder=" -- : --"
        v-model="startTime"
      />
    </div>
    <div class="flex flex-col gap-1 mb-8">
      <label>Hora Fim</label>
      <Input
        class="w-[280px]"
        maxlength="4"
        type="numeric"
        placeholder=" -- : --"
        v-model="endTime"
      />
    </div>
    <Button class="w-64">Agendar</Button>
  </form>
</template>
