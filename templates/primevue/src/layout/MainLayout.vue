<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import {useNavStore} from '../store/useNav.ts'
const navStore = useNavStore()
</script>

<template>
  <div class="w-screen h-screen overflow-hidden box-border p-5 flex gap-5">
    <Sidebar></Sidebar>
    <main @click="navStore.close()" class="w-full h-full flex flex-col gap-6">
      <Header></Header>
      <div class="flex-1"><router-view></router-view></div>
      <Footer></Footer>
    </main>
  </div>
</template>

<style scoped></style>
