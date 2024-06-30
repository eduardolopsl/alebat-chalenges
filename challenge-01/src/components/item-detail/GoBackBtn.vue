<script setup>
import { ref } from 'vue'
import BackArrow from '@/components/svg/BackArrow.vue'

const block = ref({})
</script>

<template>
  <header @click="$emit('goBack', block)" class="button" ref="block">
    <BackArrow class="button__image"></BackArrow>
    <p class="button__text"><slot></slot></p>
  </header>
</template>

<style scoped lang="scss">
.button {
  @include flex();
  gap: 1em;
  cursor: pointer;
  &__image {
    width: 1em;
    height: 1em;
  }
  &__text {
    font-size: 1.2em;
  }
}
</style>
