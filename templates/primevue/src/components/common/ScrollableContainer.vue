<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const props = defineProps({
  scrollAmount: { type: Number, default: 200 },
  scrollBehavior: { type: String, default: 'smooth' },
  showButtons: { type: Boolean, default: true },
  showScrollbar: { type: Boolean, default: false },
  gap: { type: Number, default: 8 },
  containerClass: { type: String, default: '' },
  wrapperClass: { type: String, default: '' },
})
const emit = defineEmits(['scroll'])
const containerRef = ref(null)
const slotRef = ref(null)
const showLeftButton = ref(false)
const showRightButton = ref(true)
const scrollLeft = ref(0)

const checkScrollButtons = () => {
  const container = containerRef.value
  if (!container) return
  showLeftButton.value = container.scrollLeft > 0
  showRightButton.value = container.scrollLeft < container.scrollWidth - container.clientWidth - 1
}

let resizeObserver
let slotResizeObserver
let slotWidth = 0
onMounted(() => {
  const container = containerRef.value
  const slot = slotRef.value
  if (container) {
    resizeObserver = new ResizeObserver(() => {
      checkScrollButtons()
    })
    resizeObserver.observe(container)
  }
  if (slot) {
    slotResizeObserver = new ResizeObserver((entries) => {
      if (entries.length === 0) return
      if (entries[0]['contentRect']['width'] > slotWidth) {
        container.scrollTo({
          left: container.scrollLeft + entries[0]['contentRect']['width'] - slotWidth,
          behavior: props.scrollBehavior,
        })
      }
      slotWidth = entries[0]['contentRect']['width']
      checkScrollButtons()
    })
    slotResizeObserver.observe(slot)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  if (slotResizeObserver) {
    slotResizeObserver.disconnect()
  }
})

const containerScroll = () => {
  checkScrollButtons()
}

const handleScroll = (direction) => {
  const container = containerRef.value
  if (!container) return
  const newScrollLeft =
    direction === 'left' ? container.scrollLeft - props.scrollAmount : container.scrollLeft + props.scrollAmount
  container.scrollTo({
    left: newScrollLeft,
    behavior: props.scrollBehavior,
  })
  emit('scroll', { target: container })
}
</script>
<template>
  <div class="relative w-full" :class="containerClass">
    <div v-if="showButtons && showLeftButton" class="absolute h-full left-0 top-0 z-10" @click="handleScroll('left')">
      <slot name="left-button">
        <div class="default-button">
          <i class="pi pi-angle-left"></i>
        </div>
      </slot>
    </div>
    <div
      ref="containerRef"
      class="overflow-x-auto whitespace-nowrap px-2 scrollbar"
      :class="[wrapperClass, { 'scrollbar-none': !showScrollbar }]"
      @scroll="containerScroll"
    >
      <div ref="slotRef" class="inline-flex" :style="{ gap: `${gap}px` }">
        <slot></slot>
      </div>
    </div>
    <div
      v-if="showButtons && showRightButton"
      class="absolute h-full right-0 top-0 z-10"
      @click="handleScroll('right')"
    >
      <slot name="right-button">
        <div class="default-button">
          <i class="pi pi-angle-right"></i>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.default-button {
  @apply h-full bg-white dark:bg-zinc-900 transition-all duration-200 w-10 flex items-center cursor-pointer justify-center;
}
</style>
