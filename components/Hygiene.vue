<template>
  <div>
    <h2
      id="subtitle"
      class="mb-8 md:mb-12 font-medium text-center text-4xl md:text-5xl text-black"
    >
      Dran denken!
    </h2>
    <div class="hygiene-container grid grid-cols-2 gap-2 mx-8">
        <div class="h-28 md:h-48 w-28 md:w-48 my-4 place-self-center">
            <img class="w-100 h-3/4 mx-auto mb-2" :src="require(`~/assets/svgs/hygiene-2.svg`)"/>  
            <div class="text-sm md:text-lg mx-auto text-center">Abstand halten</div>  
        </div>        
        <div class="h-28 md:h-48 w-28 md:w-48 my-4 place-self-center">
            <img class="w-100 h-3/4 mx-auto mb-2" :src="require(`~/assets/svgs/hygiene-1.svg`)"/>
            <div class="text-sm md:text-lg mx-auto text-center">Hande gründlich waschen</div> 
        </div>
        <div class="h-28 md:h-48 w-28 md:w-48 my-4 place-self-center">
            <img class="w-100 h-3/4 mx-auto mb-2" :src="require(`~/assets/svgs/hygiene-3.svg`)"/>
            <div class="text-sm md:text-lg mx-auto text-center">Mund-Nasen-Schutz tragen</div> 
        </div>
        <div class="h-28 md:h-48 w-28 md:w-48 my-4 place-self-center">
            <img class="w-100 h-3/4 mx-auto mb-2" :src="require(`~/assets/svgs/hygiene-5.svg`)"/>
            <div class="text-sm md:text-lg mx-auto text-center">Zuhause bleiben</div> 
        </div>
        <div class="h-28 md:h-48 w-28 md:w-48 my-4 place-self-center">
            <img class="w-100 h-3/4 mx-auto mb-2" :src="require(`~/assets/svgs/hygiene-4.svg`)"/>
            <div class="text-sm md:text-lg mx-auto text-center">Desinfizieren</div> 
        </div>
        <div class="h-28 md:h-48 w-28 md:w-48 my-4 place-self-center">
            <img class="w-100 h-3/4 mx-auto mb-2" :src="require(`~/assets/svgs/hygiene-6.svg`)"/>
            <div class="text-sm md:text-lg mx-auto text-center">vielleicht impfen</div> 
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>