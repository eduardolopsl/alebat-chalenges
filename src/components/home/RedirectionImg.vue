<script setup>
defineProps({
  imgSrc: { type: String, required: true },
  redirection: { type: String, required: true },
  unclickable: { type: Boolean, required: true },
})
</script>

<template>
  <img
    :src="imgSrc"
    @click="$emit('imgRedirection', redirection)"
    :class="unclickable ? 'image unclickable' : 'image'"
  />
</template>

<style scoped lang="scss">
.image {
  border-radius: 50%;
  cursor: pointer;
  width: 10em;
  height: 10em;
  transition: all 0.3s ease-in;
  @include responsive() {
    width: 5em;
    height: 5em;
  }
  &:hover {
    scale: 1.1;
  }
}

.unclickable {
  pointer-events: none;
}
</style>
