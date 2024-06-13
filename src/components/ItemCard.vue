<script setup>
const props = defineProps({
  name: { type: String, required: true },
  description: { type: String, required: true },
})
</script>

<template>
  <article>
    <h2>{{ name }}</h2>
    <p>{{ description }}</p>
  </article>
</template>
