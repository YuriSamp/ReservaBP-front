<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { inject, ref } from 'vue'
import { useToast } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import type { VueCookies } from 'vue-cookies'
import { http, HttpError } from '@/lib/request'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

const email = ref<string>()
const password = ref<string>()
const confirmPassword = ref<string>()
const role = ref<string>()
const profilePicture = ref<string>()
const name = ref<string>()
const router = useRouter()
const { toast } = useToast()
const $cookies = inject<VueCookies>('$cookies')

const roles = ['Consultor', 'Cliente']

const onSubmit = async (e: Event) => {
  e.preventDefault()
  try {
    const values = {
      name: name.value,
      role: role.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      profilePicture: profilePicture.value
    }

    const { data: token } = await http.post('/signup', { ...values })
    $cookies?.set('JWT_TOKEN', token, '1h')
    router.push('/scheduling')
  } catch (error) {
    if (error instanceof HttpError) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: error.response?.data.mensage
      })
    }
  }
}
</script>

<template>
  <main class="flex h-full justify-center items-center overflow-y-hidden">
    <div class="h-full flex items-center justify-center w-80">
      <form class="flex flex-col gap-4 w-full" @submit="onSubmit">
        <h2 class="flex justify-center text-3xl">Create an account</h2>
        <div class="flex flex-col gap-1">
          <label>Role</label>
          <Select v-model="role">
            <SelectTrigger class="w-full bg-transparent rounded-md border border-gray-600">
              <SelectValue placeholder="Selecione seu papel" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup v-for="role in roles" :key="role">
                <SelectItem :value="role" class="cursor-pointer"> {{ role }} </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="flex flex-col gap-2">
          <label>Email *</label>
          <Input
            name="email"
            v-model="email"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="Jhon Doe"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Nome *</label>
          <Input
            name="email"
            v-model="name"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Profile picture</label>
          <Input
            name="email"
            v-model="profilePicture"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="place an url"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Password *</label>
          <Input
            name="password"
            type="password"
            v-model="password"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="your coolest password"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Confirm the password *</label>
          <Input
            name="confirmPassword"
            type="password"
            v-model="confirmPassword"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="your coolest password"
          />
        </div>
        <Button>Sign up</Button>
        <p>
          Have an account?
          <RouterLink to="/" class="text-[#00bd7e]">Sign in now</RouterLink>
        </p>
      </form>
    </div>
  </main>
</template>
