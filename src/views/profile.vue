<script setup lang="ts">
import Navbar from '@/components/navbar.vue'
import profileForm from '@/components/profile-form.vue'
</script>

<template>
  <main class="flex flex-col items-center min-h-screen">
    <Navbar />
    <section>
      <h1 class="pb-12 text-3xl text-center">Change your profile</h1>
    </section>
    <section class="flex items-center justify-center h-full">
      <profileForm />
    </section>
  </main>
</template>
