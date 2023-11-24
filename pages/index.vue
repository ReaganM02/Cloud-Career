<script lang="ts" setup>
import type { fileURLToPath } from 'url'

const files = ref<FileList | null>(null)
const uploadedPaths = ref<string[] | null>(null)

function handleFile (e:Event) {
  files.value = (e.target as HTMLInputElement).files!
}

async function handleSubmit () {
  console.log('hit')
  const fd = new FormData()
  if (files.value) {
    Array.from(files.value).forEach((file, index:number) => {
      fd.append(`index${index}`, file)
    })
  }
  const data = await $fetch<string[]>('/api/user/file', {
    method: 'POST',
    body: fd
  })

  uploadedPaths.value = data
  
}

</script>
<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="file" multiple @change="handleFile($event)">
      <button type="submit">
        Submit
      </button>
    </form>
    <div v-for="path in uploadedPaths" :key='path'>
      <img :src="path" />
    </div>
  </div>
</template>
<style scoped lang="css">

</style>
