<script setup lang="ts">
import { reactive, ref } from 'vue'
import http from '../../utils/http.ts'

const userData = reactive({
  user: null,
  repos: null,
})
const expandedRows = ref({})

const fetchRepos = async () => {
  try {
    userData.repos = await http.get('/users/yyx990803/repos')
  } catch (err) {
    console.error(err)
  }
}
const fetchUser = async () => {
  try {
    userData.user = await http.get('/users/yyx990803','',{ loading: false })
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="flex gap-10 mb-5">
    <Button @click="fetchRepos" label="pull repos" />
    <Button @click="fetchUser" label="pull user" />
  </div>
  <div v-if="userData.user" class="flex items-center gap-5">
    <img :src="userData.user.avatar_url" class="w-20 h-20 rounded-full" />
    <span>{{ userData.user.name }}</span>
    <Textarea v-model="userData.user.bio" rows="5" cols="30" />
  </div>
  <DataTable
    v-if="userData.repos"
    dataKey="id"
    :expandedRows="expandedRows"
    :value="userData.repos"
    tableStyle="min-width: 50rem"
  >
    <Column field="id" header="id"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="created_at" header="created_at"></Column>
    <Column field="url" header="url"></Column>
  </DataTable>
</template>

<style scoped></style>
