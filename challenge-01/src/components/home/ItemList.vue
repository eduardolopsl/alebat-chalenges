<script setup>
import { ref, watchEffect } from 'vue'
import { getAllItems } from '@/services/itemsApiServices'
import ItemCard from '@/components/home/ItemCard.vue'

const items = ref([])
const animatedItem = ref(false)
const disabled = ref(false)

watchEffect(async () => {
  try {
    const fetchedItems = await getAllItems()
    items.value = fetchedItems
  } catch (error) {
    console.error('Error fetching items:', error)
  }
})

const setDisabled = (itemId) => {
  disabled.value = true
  animatedItem.value = itemId
}
</script>

<template>
  <section v-if="items" class="list">
    <ItemCard
      v-for="(item, index) in items"
      :key="index"
      v-bind="item"
      :is-animated="animatedItem === item.id"
      :disabled="disabled"
      @disable-click="setDisabled"
    >
    </ItemCard>
  </section>
</template>

<style scoped lang="scss">
.list {
  width: 45em;
  @include flex(column, flex-start, flex-start);
  gap: 0.75em;
  @include responsive() {
    width: 10em;
  }
}
</style>
