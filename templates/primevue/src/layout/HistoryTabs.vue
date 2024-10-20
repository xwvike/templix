<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useRouteStore } from '../store/useRoute.ts'
import ScrollableContainer from '../components/common/ScrollableContainer.vue'

const routeStore = useRouteStore()
console.log(routeStore)
const router = useRouter()
const { history, active } = toRefs(routeStore)

const removeHistory = (item: any) => {
  routeStore.deleteHistory(item)
}

const routeEvent = (item: any) => {
  router.push({ name: item.name })
}
</script>

<template>
  <ScrollableContainer class="w-5/6 min-w-0">
    <Chip
      @click="routeEvent(item)"
      v-for="item in history"
      class="cursor-pointer transition-colors duration-200 dark:border-gray-600"
      :class="[
        active._id === item._id
          ? '!bg-primary dark:!bg-primary'
          : 'hover:bg-gray-200 dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-gray-200',
      ]"
    >
      <span class="text-primary" :class="[active._id === item._id ? 'text-white dark:text-black' : '']">{{
        item.label
      }}</span>
      <i
        @click.stop="removeHistory(item)"
        class="pi pi-times p-0.5 rounded-sm text-primary transition-colors duration-200"
        :class="[active._id === item._id ? 'text-white dark:text-black' : '']"
      ></i>
    </Chip>
  </ScrollableContainer>
</template>

<style scoped></style>
