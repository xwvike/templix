<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import { useSidebarStore } from '../store/useSidebar.ts'
const sidebarStore = useSidebarStore()
</script>

<template>
  <div class="w-screen h-screen overflow-hidden box-border p-5 flex gap-5">
    <Sidebar></Sidebar>
    <main @click="sidebarStore.close()" class="w-full h-full flex flex-col gap-6 min-w-0">
      <Header></Header>
      <div class="flex-1 overflow-auto scrollbar scrollbar-thin">
        <router-view v-slot="{ Component, route }">
          <keep-alive>
            <component :is="Component" :key="route.meta._id" />
          </keep-alive>
        </router-view>
      </div>
      <Footer></Footer>
    </main>
  </div>
</template>

<style scoped></style>
