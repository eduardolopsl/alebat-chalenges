<script setup>
import { ref, watchEffect } from 'vue'
import { getAllItems } from '@/services/itemsApiServices'
import GoBackBtn from '@/components/item-detail/GoBackBtn.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  itemId: { type: String, required: true },
})

const router = useRouter()

const id = Number(props.itemId)

if (isNaN(id)) {
  router.push({ name: 'home' })
}

const item = ref([])
const content = ref({})
const previousBodyColor = document.body.style.backgroundColor

document.body.style.backgroundColor = 'rgba(30, 41, 59, 1)'

watchEffect(async () => {
  try {
    const fetchedItems = await getAllItems()
    const filteredItem = fetchedItems.filter((item) => item.id === id)
    item.value = filteredItem[0]
  } catch (error) {
    console.error('Error fetching items:', error)
  }
})

const redirectBack = (block) => {
  document.body.style.transition = 'all 1s'
  document.body.style.backgroundColor = previousBodyColor
  block.style.transition = 'all 1s'
  block.style.opacity = 0
  content.value.style.transition = 'all 1s'
  content.value.style.opacity = 0

  setTimeout(() => {
    document.body.style.transition = ''
    router.push({ name: 'home' })
  }, 1000)
}
</script>

<template>
  <header class="header">
    <GoBackBtn @go-back="redirectBack">Volver</GoBackBtn>
  </header>
  <main class="item" ref="content">
    <h1 class="item__title">{{ item.name }}</h1>
    <p class="item__description">{{ item.description }}</p>
  </main>
</template>

<style lang="scss" scoped>
.header {
  width: 5em;
  margin: 1em;
}

.item {
  @include flex(column, flex-start);
  margin: 0 1em;
  gap: 2em;
  &__title {
    color: map-get($map: $colors, $key: c-principal-color);
    font-size: 2rem;
  }
}
</style>
