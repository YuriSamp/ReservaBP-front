<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { inject } from 'vue'
import type { VueCookies } from 'vue-cookies'
import { useRouter } from 'vue-router'
import { LogOut, User } from 'lucide-vue-next'

const router = useRouter()
const $cookies = inject<VueCookies>('$cookies')

const exitFunction = () => {
  const cookieWasRemoved = $cookies?.remove('JWT_TOKEN')

  if (cookieWasRemoved) router.push('/')
}
</script>

<template>
  <div class="py-4 mb-14 px-96 flex justify-between w-full items-center">
    <span class="text-2xl text-green-600 font-bold">RESERVA BP</span>
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          ><Avatar class="cursor-pointer hover:scale-110 duration-200">
            <AvatarImage src="https://github.com/taleshy1.png" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem class="flex gap-2 cursor-pointer" @click="exitFunction">
            <User :size="16" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem class="flex gap-2 cursor-pointer" @click="exitFunction">
            <LogOut :size="16" />
            <span>Exit</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
