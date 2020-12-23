<template>
  <div id="main">
    <svg class="banner overflow-hidden">
      <clipPath id="banner">
        <path d="M0,0h3840v1296c-1920,432,-1920,432,-3840,0v-1296z"/>
      </clipPath>
    </svg>
    <div  id="app">
      <Particles
        id="tsparticles"
        :options="{
          
          fpsLimit: 60,
          interactivity: {
            detectsOn: 'canvas',
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: '#ffffff',
            },
            links: {
              color: '#ffffff',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: 'none',
              enable: true,
              outMode: 'bounce',
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'circle',
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }"
      />
    </div>
  </div>
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
