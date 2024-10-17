<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useRouteStore } from '../store/useRoute.ts'
import { useRouter } from 'vue-router'
import { fixedRouting } from '../router'
import { useSidebarStore } from '../store/useSidebar.ts'
const router = useRouter()
const routeStore = useRouteStore()
const sidebarStore = useSidebarStore()
const { routes } = toRefs(routeStore)
const menuItems = computed(() => routes.value)

const navigate = (route: any) => {
  router.push(route.path)
}
</script>

<template>
  <div
    class="h-full flex-shrink-0 transition-all w-auto overflow-hidden relative max-md:p-3.5 max-md:absolute max-md:top-0 z-50"
    :class="[sidebarStore.Expanded ? 'max-md:left-0' : 'max-md:-left-[20rem]']"
  >
    <div class="w-[18rem] rounded-xl border border-gray-200 dark:border-gray-700 h-full bg-slate-50 dark:bg-gray-800 flex flex-col">
      <a class="px-6 py-4 flex gap-3.5 items-center flex-shrink-0">
        <Skeleton shape="circle" size="2rem"></Skeleton>
        <span class="font-bold dark:text-white">SEMOP</span>
      </a>
      <div class="h-[1px] box-border mx-6 bg-gray-200 dark:bg-gray-700" style="width: calc(100% - 3rem)" />
      <ul class="w-full h-full p-6 flex flex-col gap-2 scrollbar scrollbar-thin overflow-y-auto">
        <li @click="navigate(item)" v-for="item in menuItems" class="cursor-pointer">
          <div
            class="px-3 box-border py-2 flex items-center gap-2 text-gray-600 dark:text-gray-300 border"
            :class="[
              item.meta.active
                ? 'bg-white dark:bg-gray-700 rounded-lg border-gray-200 dark:border-gray-600 shadow-sm text-gray-900 dark:text-white'
                : 'hover:bg-white dark:hover:bg-gray-700 hover:rounded-lg border-transparent hover:border-gray-200 dark:hover:border-gray-600',
            ]"
          >
            <i :class="item.meta.icon"></i>
            <span class="flex-1">{{ item.meta.title }}</span>
            <i v-if="item.meta.collapsible" class="pi pi-angle-down"></i>
          </div>

          <div v-if="item.children && item.meta.active && item.meta.collapsible" class="pl-1.5 mt-2 box-border w-full">
            <div
              v-for="item2 in item.children"
              @click.stop="navigate(item2)"
              class="text-base px-3 box-border py-2 flex items-center gap-2"
              :class="[item2.meta.active ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400']"
            >
              <div
                class="w-2 h-2 rounded-full border mr-2"
                :class="[
                  item2.meta.active
                    ? 'bg-gray-900 dark:bg-white border-gray-900 dark:border-white'
                    : 'bg-transparent border-gray-500 dark:border-gray-400'
                ]"
              ></div>
              {{ item2.meta.title }}
            </div>
          </div>
        </li>
      </ul>
      <ul class="w-full px-6 py-3 flex flex-col gap-2">
        <li @click="navigate(item)" v-for="item in fixedRouting" class="cursor-pointer">
          <div
            class="px-3 box-border py-2 flex items-center gap-2 text-gray-600 dark:text-gray-300 border"
            :class="[
              routeStore.active.meta.title === item.meta.title
                ? 'bg-white dark:bg-gray-700 rounded-lg border-gray-200 dark:border-gray-600 shadow-sm text-gray-900 dark:text-white'
                : 'hover:bg-white dark:hover:bg-gray-700 hover:rounded-lg border-transparent hover:border-gray-200 dark:hover:border-gray-600',
            ]"
          >
            <i :class="item.meta.icon"></i>
            <span class="flex-1">{{ item.meta.title }}</span>
          </div>
        </li>
      </ul>
      <div class="h-[1px] box-border mx-6 bg-gray-200 dark:bg-gray-700" style="width: calc(100% - 3rem)" />
      <div class="p-6 flex items-center gap-3">
        <Skeleton shape="circle" size="2.5rem"></Skeleton>
        <div class="flex flex-col justify-between text-xs h-full">
          <span class="font-bold dark:text-white">Amy</span>
          <span class="dark:text-gray-300">Admin</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>