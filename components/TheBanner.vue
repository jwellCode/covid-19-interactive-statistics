<template>
  <header class="banner">
    <Particles :options="particlesOptions" id="particles" class="canvas" />

    <div class="text text-center">
      <h1 class="text-white text-6xl font-bold mb-4">COVID-19 Datastory</h1>
      <h2 class="text-white text-3xl font-medium leading-normal">Klimaeffekte auf die Ausbreitung des SARS-CoV-2 Virus</h2>
      <a href="#main">Erfahren Sie mehr</a>
    </div>
  </header>
</template>

<script>
import Vue from "vue"
import Particles from "particles.vue"

import virusSvg from "~/assets/svgs/virus.svg"

Vue.use(Particles)

export default {
  data() {
    return {
      particlesOptions: {
        fpsLimit: 60,
        particles: {
          collisions: {
            enable: true,
          },
          move: {
            enable: true,
            outMode: "out",
            speed: 4,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 16,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "image",
            image: {
              src: virusSvg,
            },
          },
          size: {
            random: true,
            value: 100,
          },
        },
        detectRetina: true,
      },
    }
  },
}
</script>

<style scoped>
.banner {
  @apply relative;
  @apply bg-gradient-to-r;
  @apply from-pink-800;
  @apply to-indigo-800;
  @apply overflow-hidden;
  left: -15%;
  top: -35vh;
  width: 130%;
  height: 100vh;
  border-radius: 50%;
}

.canvas {
  @apply absolute;
  top: 35vh;
  width: 100%;
  height: 65%;
}

.text {
  @apply absolute;
  top: 60vh;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
