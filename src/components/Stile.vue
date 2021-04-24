<template>
    <div class="flex items-center justify-center border border-gray-400 text-gray-400 text-xs">
        <div :style="`width: 25px; height: 25px;`" class="text-white rounded-full" :class="{'bg-red-500 border border-red-500': red == value, 'bg-blue-500 border border-blue-500': blue == value }"><span class="invisible">{{ value }}</span></div>
    </div>    
</template>

<script>
export default {
  name: 'Stile',
  props: {
    size: [Number],
    value: [Number],
    md: [Array],
    sd: [Array],
    blue: [Number],
    red: [Number]

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
