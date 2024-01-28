<script setup lang="ts">
// TODO usar o accordeon

const persons = [
  {
    id: 1,
    name: 'John Doe',
    location: 'New York',
    profilePicture: 'https://http.cat/500.jpg'
  },
  {
    id: 2,
    name: 'Alice Smith',
    location: 'Los Angeles',
    profilePicture: 'https://http.cat/400.jpg'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    location: 'Chicago',
    profilePicture: 'https://http.cat/300.jpg'
  },
  {
    id: 4,
    name: 'Emily Davis',
    location: 'San Francisco',
    profilePicture: 'https://http.cat/200.jpg'
  },
  {
    id: 5,
    name: 'Michael Wilson',
    location: 'Miami',
    profilePicture: 'https://http.cat/100.jpg'
  }
]
</script>

<template>
  <main class="flex flex-col items-center pt-28">
    <div>
      <h1 class="pb-12 text-white text-3xl text-center">
        Consultores disponiveis para agendamento
      </h1>
      <div class="w-[1000px]">
        <input class="bg-white rounded-3xl border border-gray-600 py-2 px-3 w-full" />
      </div>
      <section class="pt-12">
        <ul class="flex flex-col gap-4">
          <li v-for="person in persons" :key="person.name">
            <div
              class="rounded-3xl w-full border border-green-400 flex gap-4 p-3 shadow-md shadow-green-400 cursor-pointer"
            >
              <div class="rounded-full">
                <img :src="person.profilePicture" class="w-20 h-20" />
              </div>
              <div class="flex flex-col justify-center gap-2">
                <span class="text-white text-3xl">{{ person.name }}</span>
                <span class="text-white">location : {{ person.location }}</span>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>
