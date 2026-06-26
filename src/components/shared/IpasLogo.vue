<script setup lang="ts">
withDefaults(
  defineProps<{
    height?: number | string;
    alt?: string;
  }>(),
  {
    height: 36,
    alt: 'Ipas RDC',
  },
);
</script>

<template>
  <img
    src="/ipasdrc_logo.svg"
    :alt="alt"
    class="ipas-logo"
    :style="{ height: typeof height === 'number' ? `${height}px` : height }"
  />
</template>

<style scoped>
.ipas-logo {
  width: auto;
  max-width: 100%;
  display: block;
}
</style>
