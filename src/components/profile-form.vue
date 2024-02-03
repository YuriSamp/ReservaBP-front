<script setup lang="ts">
import { inject, ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { HttpError, http } from '@/lib/request'
import type { VueCookies } from 'vue-cookies'
import type { User } from '@/lib/user'
import router from '@/router'
import { useToast } from './ui/toast'

const { user } = defineProps<{
  user?: User
}>()

const $cookies = inject<VueCookies>('$cookies')
const name = ref(user?.name)
const role = ref(user?.role)
const email = ref(user?.email)
const profilePicture = ref(user?.profilePicture)
const password = ref<string>()
const confirmPassword = ref<string>()
const roles = ['Corretor de seguro', 'Cliente']
const { toast } = useToast()

const jwt = $cookies?.get('JWT_TOKEN')

const onSubmit = async (e: Event) => {
  e.preventDefault()

  const payload = {
    name: name.value,
    role: role.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    profilePicture: profilePicture.value
  }

  try {
    const response = await http.put(`/user/${user?.id}`, payload, {
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
        title: err.response?.data
      })
    }
  }
}

const onDelete = async () => {
  await http.delete(`/user/${user?.id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  $cookies?.remove('JWT_TOKEN')
  router.push('/signup')
}
</script>

<template>
  <div class="flex flex-col gap-3 items-center justify-center">
    <form class="flex flex-col items-center justify-center pt-20 gap-3" @submit="onSubmit">
      <div class="flex gap-8">
        <div class="flex flex-col gap-1">
          <label>Cargo</label>
          <Select v-model="role">
            <SelectTrigger class="w-[280px]">
              <SelectValue placeholder="Selecione seu cargo" />
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
          <Input class="w-[280px]" type="email" v-model="email" />
        </div>
      </div>
      <div class="flex gap-8">
        <div class="flex flex-col gap-1">
          <label>Nome</label>
          <Input class="w-[280px]" v-model="name" />
        </div>
        <div class="flex flex-col gap-1">
          <label>Foto de perfil</label>
          <Input class="w-[280px]" v-model="profilePicture" />
        </div>
      </div>
      <div class="flex gap-8">
        <div class="flex flex-col gap-1">
          <label>Senha </label>
          <Input
            type="password"
            v-model="password"
            class="w-[280px]"
            placeholder="uma senha legal"
          />
        </div>
        <div class="flex flex-col gap-1 mb-8">
          <label>Confirme a senha</label>
          <Input
            type="password"
            v-model="confirmPassword"
            class="w-[280px]"
            placeholder="outra senha legal"
          />
        </div>
      </div>
      <Button class="w-[580px]" type="submit">Alterar seu perfil</Button>
    </form>
    <AlertDialog>
      <AlertDialogTrigger>
        <Button class="w-[580px]" variant="destructive">Excluir seu perfil</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita, você <strong>permanentemente deletará</strong> o seu
            usuário do banco de dados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction @click="onDelete">Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
