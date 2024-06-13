<script setup>
import { ref, computed, watchEffect } from 'vue'
import { getAllItems } from '@/services/itemsApiServices'

const items = ref([])

watchEffect(async () => {
  try {
    const fetchedItems = await getAllItems()
    console.log(fetchedItems)
    items.value = fetchedItems
  } catch (error) {
    console.error('Error fetching items:', error)
  }
})
</script>

<template>
  <section v-if="items">
    <h1>Items</h1>
    <ul v-for="(item, index) in items" :key="index">
      {{
        item.name
      }}
    </ul>
  </section>
</template>

<style scoped lang="scss"></style>
