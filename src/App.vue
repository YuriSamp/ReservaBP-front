<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <div class="max-h-0">
    <Toaster />
  </div>
  <RouterView />
</template>
