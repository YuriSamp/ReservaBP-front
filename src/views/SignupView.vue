<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="flex h-full justify-center items-center">
    <div class="h-full flex items-center justify-center w-80">
      <div class="flex flex-col gap-4 w-full">
        <h2 class="flex justify-center text-3xl text-white">Create an account</h2>
        <div class="flex flex-col gap-2">
          <label>Email</label>
          <input class="bg-transparent rounded-md border border-gray-600 py-1 px-3" />
        </div>
        <div class="flex flex-col gap-2">
          <label>Password</label>
          <input class="bg-transparent rounded-md border border-gray-600 py-1 px-3" />
        </div>
        <div class="flex flex-col gap-2">
          <label>Confirm the password</label>
          <input class="bg-transparent rounded-md border border-gray-600 py-1 px-3" />
        </div>
        <button class="w-full bg-[#379968] text-white h-10 rounded-md">Sign up</button>
        <p>
          Have an account?
          <RouterLink to="/signin">Sign in now</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>
