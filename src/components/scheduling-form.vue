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
import { HttpError, http } from '@/lib/request'
import { formatToDate } from '@/lib/date-format'
import { generateTimeArray } from '@/lib/generate-times'
import type { VueCookies } from 'vue-cookies'
import { useToast } from './ui/toast'

const { persons, client } = defineProps<{
  persons: { email: string; name: string }[]
  client: { email: string; name: string }
}>()

const $cookies = inject<VueCookies>('$cookies')
const corretor = ref('')
const date = ref<Date>(new Date())
const startTime = ref<string>()
const endTime = ref<string>()
const times = generateTimeArray()
const { toast } = useToast()

const onSubmit = async (e: Event) => {
  e.preventDefault()

  // O componente do calendario não tem o required
  if (!date.value) {
    toast({
      variant: 'destructive',
      title: 'Por favor selecione uma data'
    })
  }

  const payload = {
    cliente: client?.email,
    corretor: persons.find((person) => person.name === corretor.value)?.email,
    date: date.value,
    startTime: formatToDate(date.value, startTime.value),
    endTime: formatToDate(date.value, endTime.value)
  }

  const jwt = $cookies?.get('JWT_TOKEN')

  try {
    const response = await http.post('/scheduling', payload, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })

    toast({
      description: response.data
    })
  } catch (err) {
    if (err instanceof HttpError) {
      toast({
        variant: 'destructive',
        description: err.response?.data
      })
    }
  }
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
          <SelectGroup v-for="person in persons" :key="person.email">
            <SelectItem :value="person.name" class="cursor-pointer"> {{ person.name }} </SelectItem>
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
      <Select v-model="startTime" required>
        <SelectTrigger class="w-[280px]">
          <SelectValue placeholder="Selecione uma horario" />
        </SelectTrigger>
        <SelectContent class="max-h-72">
          <SelectGroup v-for="time in times" :key="time">
            <SelectItem :value="time" class="cursor-pointer"> {{ time }} </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div class="flex flex-col gap-1 mb-8">
      <label>Hora Fim</label>
      <Select v-model="endTime">
        <SelectTrigger class="w-[280px]">
          <SelectValue placeholder="Selecione um horario" />
        </SelectTrigger>
        <SelectContent class="max-h-72">
          <SelectGroup v-for="time in times" :key="time">
            <SelectItem :value="time" class="cursor-pointer"> {{ time }} </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <Button class="w-64">Agendar</Button>
  </form>
</template>
