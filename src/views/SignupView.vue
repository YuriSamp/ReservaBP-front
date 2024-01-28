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
    <div class="h-full flex items-center justify-center w-80">
      <Form class="flex flex-col gap-4 w-full" @submit="onSubmit">
        <h2 class="flex justify-center text-3xl text-white">Create an account</h2>
        <div class="flex flex-col gap-2">
          <label>Email</label>
          <Field name="Email" class="bg-transparent rounded-md border border-gray-600 py-1 px-3" />
        </div>
        <div class="flex flex-col gap-2">
          <label>Password</label>
          <Field
            name="Password"
            type="password"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label>Confirm the password</label>
          <Field
            name="ConfirmPassword"
            type="password"
            class="bg-transparent rounded-md border border-gray-600 py-1 px-3"
          />
        </div>
        <button class="w-full bg-[#379968] text-white h-10 rounded-md">Sign up</button>
        <p>
          Have an account?
          <RouterLink to="/signin">Sign in now</RouterLink>
        </p>
      </Form>
    </div>
  </main>
</template>
