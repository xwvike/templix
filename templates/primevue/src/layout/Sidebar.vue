<script setup lang="ts">
import { ref } from 'vue'
import { useRouteStore } from '../store/useRoute.ts'
import { useRouter } from 'vue-router'
import { useNavStore } from '../store/useNav.ts'
const router = useRouter()
const routeStore = useRouteStore()
const menuItems = ref(routeStore.routes)
const navStore = useNavStore()

const navigate = (route: any) => {
  routeStore.toggleActive(route.meta._id)
  router.push(route.path)
}
</script>

<template>
  <div
    class="h-full flex-shrink-0 transition-all w-auto overflow-hidden relative max-md:p-3.5 max-md:absolute max-md:top-0"
    :class="[navStore.Expanded ? 'max-md:left-0' : 'max-md:-left-[20rem]']"
  >
    <div class="w-[18rem] rounded-xl border border-surface-100 h-full bg-slate-50 flex flex-col">
      <a class="px-6 py-4 flex gap-3.5 items-center flex-shrink-0">
        <Skeleton shape="circle" size="2rem"></Skeleton>
        <span class="font-bold">SEMOP</span>
      </a>
      <div style="width: calc(100% - 3rem)" class="h-[1px] box-border mx-6 bg-gray-200" />
      <ul class="w-full h-full p-6 flex flex-col gap-2">
        <li @click="navigate(item)" v-for="item in menuItems" class="cursor-pointer">
          <div
            class="px-3 box-border py-2 flex items-center gap-2 text-surface-600 border"
            :class="[
              item.meta.active
                ? 'bg-white rounded-lg border-inherit shadow-sm text-surface-900'
                : 'hover:bg-white hover:rounded-lg  border-transparent hover:border-inherit',
            ]"
          >
            <i :class="item.meta.icon"></i><span class="flex-1">{{ item.meta.title }}</span
            ><i v-if="item.meta.collapsible" class="pi pi-angle-down"></i>
          </div>

          <div v-if="item.children && item.meta.active && item.meta.collapsible" class="pl-1.5 mt-2 box-border w-full">
            <div
              v-for="item2 in item.children"
              @click.stop="navigate(item2)"
              class="text-base px-3 box-border py-2 flex items-center gap-2"
              :class="[item2.meta.active ? 'text-surface-900' : 'text-surface-500']"
            >
              <div
                class="w-2 h-2 rounded-full border mr-2"
                :class="[item2.meta.active ? 'bg-surface-900 border-surface-900' : 'bg-transparent border-surface-500']"
              ></div>
              {{ item2.meta.title }}
            </div>
          </div>
        </li>
      </ul>
      <ul class="w-full px-6 py-3 flex flex-col gap-2">
        <li @click="navigate('Help')" class="cursor-pointer">
          <div
            class="px-3 box-border py-2 flex items-center gap-2 text-surface-600 border"
            :class="[
              routeStore.active === 'Help'
                ? 'bg-white rounded-lg border-inherit shadow-sm text-surface-900'
                : 'hover:bg-white hover:rounded-lg  border-transparent hover:border-inherit',
            ]"
          >
            <i class="pi pi-question-circle"></i><span class="flex-1">Help</span>
          </div>
        </li>
        <li @click="navigate('Settings')" class="cursor-pointer">
          <div
            class="px-3 box-border py-2 flex items-center gap-2 text-surface-600 border"
            :class="[
              routeStore.active === 'Settings'
                ? 'bg-white rounded-lg border-inherit shadow-sm text-surface-900'
                : 'hover:bg-white hover:rounded-lg  border-transparent hover:border-inherit',
            ]"
          >
            <i class="pi pi-cog"></i><span class="flex-1">Settings</span>
          </div>
        </li>
      </ul>
      <div style="width: calc(100% - 3rem)" class="h-[1px] box-border mx-6 bg-gray-200" />
      <div class="p-6 flex items-center gap-3">
        <Skeleton shape="circle" size="2.5rem"></Skeleton>
        <div class="flex flex-col justify-between text-xs h-full">
          <span class="font-bold">Amy</span>
          <span>Admin</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
