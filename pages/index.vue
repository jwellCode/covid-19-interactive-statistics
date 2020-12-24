<template>
  <main>
  </main>
</template>

<script>
import Vue from "vue"
import { getPageHead } from "~/utils"

import Particles from "particles.vue"
Vue.use(Particles)

export default {
  head() {
    return getPageHead({
      instance: this,
      title: null,
    })
  },
}
</script>
