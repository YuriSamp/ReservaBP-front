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

const roles = ['Corretor de seguro', 'Cliente']

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
  <main class="flex h-full justify-center items-center overflow-y-hidden">
    <div class="h-full flex items-center justify-center w-80">
      <form class="flex flex-col gap-4 w-full" @submit="onSubmit">
        <h2 class="flex justify-center text-3xl">Crie uma conta</h2>
        <div class="flex flex-col gap-1">
          <label>Cargo</label>
          <Select v-model="role">
            <SelectTrigger class="w-full bg-transparent rounded-md border border-gray-600">
              <SelectValue placeholder="Selecione seu cargo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup v-for="role in roles" :key="role">
                <SelectItem :value="role" class="cursor-pointer"> {{ role }} </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="flex flex-col gap-2">
          <label>Email </label>
          <Input
            name="email"
            v-model="email"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="emailteste123@gmail.com"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Nome </label>
          <Input
            name="name"
            type="text"
            v-model="name"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="Yuri "
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Foto de perfil</label>
          <Input
            v-model="profilePicture"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="coloque sua url do github.png"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Senha </label>
          <Input
            name="password"
            type="password"
            v-model="password"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="uma senha legal"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Confirme a senha </label>
          <Input
            name="confirmPassword"
            type="password"
            v-model="confirmPassword"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="umsa senha legal"
          />
        </div>
        <Button>Criar conta</Button>
        <p>
          Tem uma conta?
          <RouterLink to="/" class="text-[#00bd7e]">Entrar agora</RouterLink>
        </p>
      </form>
    </div>
  </main>
</template>
