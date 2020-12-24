<template>
  <header
    class="w-full bg-gradient-to-r from-pink-600 to-purple-600 overflow-hidden banner"
  >
    <Particles :options="particlesOptions" id="particles" />
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
  position: absolute;
  top: -35vh;
  left: -15%;
  border-radius: 50%;
  width: 130%;
  height: 100vh;
  background: #000;
  background: linear-gradient(90deg, #97266d, #434190);
}
</style>