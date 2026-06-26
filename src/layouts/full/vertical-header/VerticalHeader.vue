<script setup lang="ts">
import { ref, watch, computed,onBeforeMount  } from 'vue';
import { useCustomizerStore } from '../../../stores/customizer';
import { ShoppingCartIcon, AlignLeftIcon, DotsIcon } from 'vue-tabler-icons';
import LanguageDD from './LanguageDD.vue';
import NotificationDD from './NotificationDD.vue';
import MessagesDD from './MessagesDD.vue';
import ProfileDD from './ProfileDD.vue';
//@ts-ignore
import Searchbar from './Searchbar.vue';
import RightMobileSidebar from './RightMobileSidebar.vue';
//@ts-ignore
import Logo from '../logo/Logo.vue';
import { Icon } from '@iconify/vue';
const customizer = useCustomizerStore();
const showSearch = ref(false);
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
function searchbox() {
    showSearch.value = !showSearch.value;
}
watch(priority, (newPriority) => {
    priority.value = newPriority;
});

//For on Scroll Effect on Header
onBeforeMount(() => {
  window.addEventListener('scroll', handleScroll)
})
const stickyHeader = ref(false)
function handleScroll() {
  if (window.pageYOffset) {
    stickyHeader.value = true
  } else {
    stickyHeader.value = false
  }
}


</script>

<template>
    <div class="container">
        <div class="maxWidth">
<!--            <v-app-bar elevation="0" :priority="priority" height="75"  id="top" :class="stickyHeader ? 'sticky' : ''">-->
<!--                <v-btn class="hidden-md-and-down" icon variant="text" size="small"-->
<!--                    @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)">-->
<!--                    <Icon icon="solar:list-bold-duotone" height="24" width="24" />-->
<!--                </v-btn>-->
<!--                <v-btn class="hidden-lg-and-up" icon variant="text"-->
<!--                    @click.stop="customizer.SET_SIDEBAR_DRAWER" size="small">-->
<!--                    <Icon icon="solar:list-bold-duotone" height="24" width="24" />-->
<!--                </v-btn>-->

<!--                &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                &lt;!&ndash; Search part &ndash;&gt; &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                -->


<!--                &lt;!&ndash;-/Search part &ndash;&gt;-->
<!--                <v-spacer class="hidden-sm-and-down" />-->

<!--                <div class="hidden-md-and-up">-->
<!--&lt;!&ndash;                    <Logo />&ndash;&gt;-->
<!--                </div>-->

<!--                &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                &lt;!&ndash;-right part &ndash;&gt;-->
<!--                &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                &lt;!&ndash; translate &ndash;&gt;-->
<!--                &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                <div class="hidden-sm-and-down mr-sm-6 mr-4">-->
<!--&lt;!&ndash;                    <Searchbar />&ndash;&gt;-->
<!--                </div>-->
<!--                <div class="hidden-sm-and-down mr-sm-6 mr-4">-->
<!--&lt;!&ndash;                    <LanguageDD />&ndash;&gt;-->
<!--                </div>-->

<!--                &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                &lt;!&ndash; ShoppingCart &ndash;&gt;-->
<!--                &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                <div class="hidden-sm-and-down mr-sm-6 mr-4">-->
<!--&lt;!&ndash;                    <v-btn icon variant="text" to="/ecommerce/checkout" size="small">&ndash;&gt;-->
<!--&lt;!&ndash;                        <v-badge color="primary" :content="getCart?.length" offset-x="-4" offset-y="-6">&ndash;&gt;-->
<!--&lt;!&ndash;                            <Icon icon="solar:cart-3-line-duotone" height="24" width="24" />&ndash;&gt;-->
<!--&lt;!&ndash;                        </v-badge>&ndash;&gt;-->
<!--&lt;!&ndash;                    </v-btn>&ndash;&gt;-->
<!--                </div>-->
<!--                &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                &lt;!&ndash; Notification &ndash;&gt;-->
<!--                &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                <div class="hidden-sm-and-down mr-sm-6 mr-4">-->
<!--&lt;!&ndash;                    <NotificationDD />&ndash;&gt;-->
<!--                </div>-->
<!--                &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                &lt;!&ndash; User Profile &ndash;&gt;-->
<!--                &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                <div class="hidden-sm-and-down">-->
<!--&lt;!&ndash;                    <ProfileDD />&ndash;&gt;-->
<!--                </div>-->

<!--                &lt;!&ndash;-&#45;&#45;Mobile header&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--&lt;!&ndash;                <v-menu :close-on-content-click="false" class="mobile_popup ">&ndash;&gt;-->
<!--&lt;!&ndash;                    <template v-slot:activator="{ props }">&ndash;&gt;-->
<!--&lt;!&ndash;                        <v-btn icon class="hidden-md-and-up" flat v-bind="props" size="small">&ndash;&gt;-->
<!--&lt;!&ndash;                            <DotsIcon stroke-width="2" size="24" class="text-primary" />&ndash;&gt;-->
<!--&lt;!&ndash;                        </v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;                    </template>&ndash;&gt;-->
<!--&lt;!&ndash;                    <v-sheet rounded="lg" elevation="10" class="mt-5 dropdown-box px-4 py-6">&ndash;&gt;-->
<!--&lt;!&ndash;                        <div class="d-flex justify-space-between align-center">&ndash;&gt;-->
<!--&lt;!&ndash;                            <div class="mr-sm-3 mr-2">&ndash;&gt;-->
<!--&lt;!&ndash;                                <Searchbar />&ndash;&gt;-->
<!--&lt;!&ndash;                            </div>&ndash;&gt;-->
<!--&lt;!&ndash;                            <LanguageDD />&ndash;&gt;-->
<!--&lt;!&ndash;                            <v-btn icon variant="text" class="mr-sm-3 mr-2" to="/ecommerce/checkout"&ndash;&gt;-->
<!--&lt;!&ndash;                                size="small">&ndash;&gt;-->
<!--&lt;!&ndash;                                <v-badge color="primary" :content="getCart?.length" offset-x="-4" offset-y="-6">&ndash;&gt;-->
<!--&lt;!&ndash;                                    <Icon icon="solar:cart-3-line-duotone" height="24" width="24" />&ndash;&gt;-->
<!--&lt;!&ndash;                                </v-badge>&ndash;&gt;-->
<!--&lt;!&ndash;                            </v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;                            &lt;!&ndash; <MessagesDD /> &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                            <NotificationDD />&ndash;&gt;-->
<!--&lt;!&ndash;                            <ProfileDD />&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                    </v-sheet>&ndash;&gt;-->
<!--&lt;!&ndash;                </v-menu>&ndash;&gt;-->
<!--            </v-app-bar>-->
        </div>
    </div>
</template>
