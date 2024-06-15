<script setup>
import { ref, provide } from 'vue'
import ItemList from '@/components/home/ItemList.vue'
import RedirectionImg from '@/components/home/RedirectionImg.vue'

const imagesData = [
  {
    imgSrc:
      'https://ih0.redbubble.net/image.1700939694.8485/raf,360x360,075,t,fafafa:ca443f4786.jpg',
    redirection: 'https://www.youtube.com/watch?v=o-YzIok4Im4',
  },
  {
    imgSrc: '/img/rodri.webp',
    redirection: 'https://www.youtube.com/watch?v=8FZ4A6PrxUE',
  },
  {
    imgSrc: '/img/puch.webp',
    redirection: 'https://www.youtube.com/watch?v=QEV3FNFwJWQ',
  },
  {
    imgSrc: '/img/borja.webp',
    redirection: 'https://www.youtube.com/watch?v=GnhTAZ5TJE8',
  },
]

const unclickable = ref(false)

const imgRedirect = (redirection) => {
  window.location.href = redirection
}

const makeImagesUnclickable = () => {
  unclickable.value = true
}

provide('makeUnclickable', makeImagesUnclickable)
</script>

<template>
  <main class="home">
    <ItemList class="home__list"></ItemList>
    <aside class="home__aside">
      <RedirectionImg
        v-for="(image, index) in imagesData"
        :img-src="image.imgSrc"
        :redirection="image.redirection"
        :unclickable="unclickable"
        @img-redirection="imgRedirect"
        :key="index"
      />
    </aside>
  </main>
</template>

<style scoped lang="scss">
.home {
  height: 50em;
  padding: 3em;
  @include flex(row, flex-start, flex-start);
  gap: 5em;
  @include responsive() {
    gap: 1.5em;
  }
  &__title {
    padding: 0 0 0.5em;
  }
  &__aside {
    width: 25em;
    height: 100%;
    @include flex(row, center, center);
    flex-wrap: wrap;
    gap: 2em;
    @include responsive() {
      width: 5em;
    }
  }
}
</style>
