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
import { http } from '@/lib/request'
import type { VueCookies } from 'vue-cookies'
import type { User } from '@/lib/user'
import router from '@/router'

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

  const response = await http.put(`/user/${user?.id}`, payload, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })

  console.log(response)
}

const onDelete = async () => {
  try {
    await http.delete(`/user/${user?.id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    $cookies?.remove('JWT_TOKEN')
    router.push('/signup')
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div class="flex flex-col gap-3 items-center justify-center">
    <form class="flex flex-col items-center justify-center pt-20 gap-3" @submit="onSubmit">
      <div class="flex gap-8">
        <div class="flex flex-col gap-1">
          <label>Role</label>
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
          <Input class="w-[280px]" type="email" v-model="email" />
        </div>
      </div>
      <div class="flex gap-8">
        <div class="flex flex-col gap-1">
          <label>Name</label>
          <Input class="w-[280px]" v-model="name" />
        </div>
        <div class="flex flex-col gap-1">
          <label>Profile picture</label>
          <Input class="w-[280px]" v-model="profilePicture" />
        </div>
      </div>
      <div class="flex gap-8">
        <div class="flex flex-col gap-1">
          <label>Your new Password </label>
          <Input
            type="password"
            v-model="password"
            class="w-[280px]"
            placeholder="your coolest password"
          />
        </div>
        <div class="flex flex-col gap-1 mb-8">
          <label>Confirm the password </label>
          <Input
            type="password"
            v-model="confirmPassword"
            class="w-[280px]"
            placeholder="confirm your coolest password"
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
