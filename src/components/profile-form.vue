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

const $cookies = inject<VueCookies>('$cookies')

const name = ref<string | undefined>()
const role = ref<string | undefined>()
const email = ref<string | undefined>()

const roles = ['Consultor', 'Cliente']

const onSubmit = async (e: Event) => {
  e.preventDefault()

  const payload = {
    name: name.value,
    role: role.value,
    email: email.value
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
      <label>Consultor</label>
      <Select v-model="role">
        <SelectTrigger class="w-[280px]">
          <SelectValue placeholder="Selecione seu papel" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup v-for="role in roles" :key="role">
            <SelectItem :value="role" class="cursor-pointer"> {{ role }} </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div class="flex flex-col gap-1">
      <label>Email</label>
      <Input class="w-[280px]" type="numeric" v-model="email" />
    </div>
    <div class="flex flex-col gap-1 mb-8">
      <label>Nome</label>
      <Input class="w-[280px]" type="numeric" v-model="name" />
    </div>
    <Button class="w-64">Agendar</Button>
  </form>
</template>
