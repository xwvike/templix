<script setup lang="ts">
import { ref } from 'vue'

const products = ref([
  { code: '244wgerg2', name: 'Blue T-Shirt', category: 'Clothing', quantity: 25 },
  { code: '244wgerg2', name: 'Blue T-Shirt', category: 'Clothing', quantity: 25 },
  { code: '244wgerg2', name: 'Blue T-Shirt', category: 'Clothing', quantity: 25 },
  { code: '244wgerg2', name: 'Blue T-Shirt', category: 'Clothing', quantity: 25 },
  { code: '244wgerg2', name: 'Blue T-Shirt', category: 'Clothing', quantity: 25 },
  { code: '244wgerg2', name: 'Blue T-Shirt', category: 'Clothing', quantity: 25 },
  { code: '244wgerg2', name: 'Blue T-Shirt', category: 'Clothing', quantity: 25 },
])
</script>

<template>
  <div class="flex items-center gap-5">
    <InputText></InputText>
    <Button>search</Button>
  </div>
  <DataTable :value="products" tableStyle="min-width: 50rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
  </DataTable>
</template>

<style scoped></style>
