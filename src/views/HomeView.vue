<script setup lang="ts">
import { useCustomizerStore } from '@/stores/customizer';
import TheWelcome from '../components/TheWelcome.vue'
import CongratsCard from "@/components/dashboard/CongratulationsCardView.vue";
import VerticalHeader from '@/layouts/full/vertical-header/VerticalHeader.vue';
import VerticalSidebar from '@/layouts/full/vertical-sidebar/VerticalSidebar.vue';
import HorizontalHeader from '@/layouts/full/horizontal-header/HorizontalHeader.vue';
import HorizontalSidebar from '@/layouts/full/horizontal-sidebar/HorizontalSidebar.vue';

const customizer = useCustomizerStore();
</script>

<template>
  <main>
    <VerticalSidebar v-if="!customizer.setHorizontalLayout" />
            <div :class="customizer.boxed ? 'maxWidth' : 'full-header'"><VerticalHeader v-if="!customizer.setHorizontalLayout" /></div>
            <div :class="customizer.boxed ? 'maxWidth' : 'full-header'"><HorizontalHeader v-if="customizer.setHorizontalLayout" /></div>
            <HorizontalSidebar v-if="customizer.setHorizontalLayout" />
    <v-row>
      <CongratsCard />
    </v-row>    
  </main>
</template>
