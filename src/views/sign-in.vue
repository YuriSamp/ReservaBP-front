<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { inject, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import type { VueCookies } from 'vue-cookies'
import { http, HttpError } from '@/lib/request'
import { Input } from '@/components/ui/input'

const email = ref<string>('')
const password = ref<string>('')
const router = useRouter()
const { toast } = useToast()
const $cookies = inject<VueCookies>('$cookies')

const onSubmit = async (e: Event) => {
  e.preventDefault()

  try {
    const values = {
      email: email.value,
      password: password.value
    }

    const { data: jwtToken } = await http.post('/signin', { ...values })
    $cookies?.set('JWT_TOKEN', jwtToken, '1h')
    router.push('/scheduling')
  } catch (err) {
    if (err instanceof HttpError) {
      toast({
        variant: 'destructive',
        title: err.response?.data
      })
    }
  }
}
</script>

<template>
  <main class="flex h-full justify-center items-center">
    <div class="flex items-center justify-center w-80">
      <form class="flex flex-col gap-4 w-full" @submit="onSubmit">
        <h2 class="flex justify-center text-3xl">Bem vindo</h2>
        <div class="flex flex-col gap-2">
          <label>Email</label>
          <Input
            v-model="email"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="emailteste@gmail.com"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Senha</label>
          <Input
            type="password"
            v-model="password"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
            placeholder="sua senha"
          />
        </div>
        <Button>Entrar</Button>
        <p>
          Não tem uma conta?
          <RouterLink to="/signup" class="text-[#00bd7e]">Crie agora</RouterLink>
        </p>
      </form>
    </div>
  </main>
</template>
