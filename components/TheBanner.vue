<template>
  <header class="banner">
    <Particles :options="particlesOptions" id="particles" class="canvas" />
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
  top: -35vh;
  left: -15%;
  border-radius: 50%;
  width: 130%;
  height: 100vh;
  @apply overflow-hidden;
  @apply relative;
  @apply bg-gradient-to-r;
  @apply from-pink-800;
  @apply to-indigo-800;
}

.canvas {
  top: 35vh;
  width: 100%;
  height: 65%;
  @apply absolute;
}
</style>