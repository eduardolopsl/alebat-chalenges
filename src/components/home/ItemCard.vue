<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  disabled: { type: Boolean },
  isAnimated: { type: Boolean },
})

const router = useRouter()
const card = ref({})

const emits = defineEmits(['disableClick'])
const makeUnclickable = inject('makeUnclickable')

const manageRedirect = () => {
  makeUnclickable()
  emits('disableClick', props.id)
  card.value.classList.add('animated')
  setTimeout(() => {
    card.value.classList.add('grown')
    card.value.classList.remove('animated')
    router.push({ name: 'details', params: { itemId: props.id } })
  }, 2000)
}
</script>

<template>
  <article
    :class="[disabled ? 'card unclickable' : 'card', isAnimated ? 'animated' : '']"
    @click="manageRedirect"
    ref="card"
  >
    <h2 class="card__title">{{ name }}</h2>
  </article>
</template>

<style scoped lang="scss">
.card {
  backface-visibility: visible;
  width: 100%;
  min-height: 7em;
  background-color: map-get($map: $colors, $key: c-light-black);
  color: map-get($map: $colors, $key: c-principal-color);
  border-radius: 1em;
  padding: 1em;
  transition: 0.3s all ease-in-out;
  cursor: pointer;
  @include flex(column, flex-start, flex-start);
  gap: 1em;
  &:hover {
    scale: 1.05;
  }
  &__title {
    margin: 2% 0 0;
  }
}

.unclickable {
  pointer-events: none;
}

.animated {
  position: absolute;
  opacity: 1;
  z-index: 2;
  transition: all 2s;
  animation-name: rotateAndGrow;
  animation-duration: 2s;
}

.grown {
  position: absolute;
  opacity: 1;
  z-index: 2;
  border-radius: 0;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

@keyframes rotateAndGrow {
  0% {
    transform: rotateY(0deg);
    width: 20%;
    height: 20%;
    top: 5%;
    left: 5%;
  }
  100% {
    top: 0;
    left: 0;
    transform: rotateY(360deg);
    border-radius: 0;
    width: 100vw;
    height: 100vh;
  }
}
</style>
