<script setup lang="ts">
import { computed } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import { useDashboardStore } from '@/stores/dashboard/dashboard';
import sidebarItems from './sidebarItem';
//@ts-ignore
import NavGroup from './NavGroup/index.vue';
//@ts-ignore
import NavItem from './NavItem/index.vue';
//@ts-ignore
import NavCollapse from './NavCollapse/NavCollapse.vue';
import ExtraBox from './extrabox/ExtraBox.vue';
import Moreoption from './MoreOption/Moreoption.vue';
import IpasLogo from '@/components/shared/IpasLogo.vue';
//@ts-ignore
import Logo from '../logo/Logo.vue';
// import { useAuthStore } from '@/stores/auth';
import { Icon } from '@iconify/vue';


const customizer = useCustomizerStore();
const dashboardStore = useDashboardStore();

const sidebarMenu = computed(() => {
  const items = [...sidebarItems];
  if (dashboardStore.isSuperAdmin) {
    items.push({
      title: 'Comptes admin',
      icon: 'solar:shield-user-linear',
      BgColor: 'warning',
      to: '/dashboard/admin-users',
    });
  }
  return items;
});
// const authStore = useAuthStore();
</script>

<template>
   
        <v-navigation-drawer left v-model="customizer.Sidebar_drawer" rail-width="70" app
            class="leftSidebar ml-sm-5 mt-sm-5 bg-containerBg" elevation="10" :rail="customizer.mini_sidebar"
            expand-on-hover width="270">
            <div class="pa-5 pl-4">
                <IpasLogo :height="customizer.mini_sidebar ? 28 : 36" class="mb-2" />
                <h2 v-show="!customizer.mini_sidebar" class="text-subtitle-1 font-weight-bold mb-0">Solola na nga Admin</h2>
            </div>
            <!-- ---------------------------------------------- -->
            <!---Navigation -->
            <!-- ---------------------------------------------- -->
            <perfect-scrollbar class="scrollnavbar bg-containerBg overflow-y-hidden">

                <v-list class="py-4 px-4 bg-containerBg">
                    <!---Menu Loop -->
                    <template v-for="(item, i) in sidebarMenu">
                        <!---Item Sub Header -->
                        <NavGroup :item="item" v-if="item.header" :key="item.title" />
                        <!---If Has Child -->
                        <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
                        <!---Single Item-->
                        <NavItem :item="item" v-else class="leftPadding" />
                        <!---End Single Item-->
                    </template>
                    <!-- <Moreoption/> -->
                </v-list>
                <div class="pa-6 px-4 userbottom bg-containerBg mt-10">
                    <ExtraBox />
                </div>
            </perfect-scrollbar>
        </v-navigation-drawer>
        
</template>
