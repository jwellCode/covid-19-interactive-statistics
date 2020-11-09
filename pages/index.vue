<template>
  <main
    class="w-full max-w-screen-lg mx-auto px-4 flex justify-center items-center"
  >
    <div class="w-full">
      <OptimizedImage image="virus.jpg" alt="COVID-19 Virus" />
    </div>
  </main>
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
