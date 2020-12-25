<template>
  <main id="main" class="w-full max-w-screen-lg mx-auto px-4"></main>
</template>

<script>
import { getPageHead } from "~/utils"

export default {
  head() {
    return getPageHead({
      instance: this,
      title: null,
    })
  },
}
</script>
