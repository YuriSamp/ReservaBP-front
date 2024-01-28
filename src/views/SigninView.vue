<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Form, Field } from 'vee-validate'
import axios from 'axios'

const onSubmit = async (values: any) => {
  const { data } = await axios.post('http://localhost:8000/signin', { values })
  console.log(data)
}
</script>

<template>
  <main class="flex h-full justify-center items-center">
    <div class="flex items-center justify-center w-80">
      <Form class="flex flex-col gap-4 w-full" @submit="onSubmit">
        <h2 class="flex justify-center text-3xl text-white">Welcome back</h2>
        <div class="flex flex-col gap-2">
          <label>Email</label>
          <Field name="Email" class="bg-transparent rounded-md border border-gray-600 py-1 px-3" />
        </div>
        <div class="flex flex-col gap-2">
          <label>Password</label>
          <Field
            name="Password"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
          />
        </div>
        <button class="w-full bg-[#379968] text-white h-10 rounded-md">Sign in</button>
        <p>
          Don't have an account?
          <RouterLink to="/signup">Sign up now</RouterLink>
        </p>
      </Form>
    </div>
  </main>
</template>
