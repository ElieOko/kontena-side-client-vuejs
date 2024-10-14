<script lang="tsx" setup>
import { process, filterBy, type CompositeFilterDescriptor, type SortDescriptor } from '@progress/kendo-data-query';
import { Grid, GridToolbar } from '@progress/kendo-vue-grid';
import { ref, watchEffect } from 'vue';
import { Loader } from '@progress/kendo-vue-indicators'
import { Parent } from '@/utils/service/proxy';
import shape1 from '@/assets/images/svgs/warning-shap.svg';
import shape2 from '@/assets/images/svgs/danger-shap.svg';
import shape3 from '@/assets/images/svgs/info-shap.svg';
import { columnsStock } from '@/utils/kendo/service_stock/stock';
import { progress } from '@/utils/animation/routage';
import router from '@/router';

const collectionData = ref<Array<any>>([])
const textCardsData : Array<any> = [
  {
    path : "",
    title: "Stock Log Entrée",
    details :  "Voir toutes les entrées",
    shape : shape1
  },
  {
    path : "",
    title: "Stock Log Sortie",
    details : "Voir toutes les sortie",
    shape : shape2
  },
];

const loader       = ref<Boolean>(false)
const show       = ref<Boolean>(true)
const type = "infinite-spinner"
const editField = ref<any>()
const gridPageable = {
        buttonCount: 5,
        info: true,
        type: 'numeric',
        pageSizes: true,
        previousNext: true,
      } 
const sortable = ref(true);
const skip = ref<number>(0);
const take = ref<number>(4);
const sort = ref<SortDescriptor[] | undefined>([
      { field: "id", dir: "asc" }
    ]);
const filter = ref<CompositeFilterDescriptor>({logic: "and", filters: []});
const pageChangeHandler = (event:any) => {
      loader.value = true;
      setTimeout(() => {
       loader.value = false;
        skip.value = event.page.skip;
        take.value = event.page.take;
      }, 300);
    }
const cellClick = (e: any) => {
      if (e.dataItem.inEdit && e.field === editField.value) {
        return;
      }
      exitEdit(e.dataItem, true);
      editField.value = e.field;
      e.dataItem.inEdit = e.field;
    }
const exitEdit =  (dataItem:any, exitEdit:any) => {
      if (!exitEdit && dataItem.inEdit) {
        return;
      }
      collectionData.value.forEach((d:any) => {
        if (d.inEdit) {
          d.inEdit = undefined;
        }
      });
      editField.value = undefined;
    }
const itemChange =  (e:any)=> {
            const data =  collectionData.value.slice();
            const index = data.findIndex((d  => d._id === e.dataItem.id ))
            data[index] = { ...data[index], [e.field]: e.value };
            collectionData.value  = data;
        }
const filterChange =  (ev:any)=> {
      loader.value = true;
      console.log(ev);
      setTimeout(() => {
        filter.value = ev.filter;
        loader.value = false;
      }, 300);
    }
    const callComponentWithDelay = (path:string,interval : number = 1000)=>{
    progress.start()
    setTimeout(()=>{
        progress.finish()
        router.push(path);
    },
    interval);
}
    const routage =()=>{
    callComponentWithDelay("/service/stock/append")
}
</script>
<template>
    <v-row class="d-flex mb-5">
        <v-col v-for="item in textCardsData" :key="item.title" cols="12" sm="3" class="d-flex">
            <v-card elevation="10" class="bg-lightprimary" >
                <v-card-text class="pl-5 pr-7">
                    <img :src="item.shape" alt="shape" class="shape">
                    <Icon :icon="'solar:' + item.icon" width="30" height="30"   class="mb-6"/>
                    <h5 class="text-h4 font-weight-semibold mb-2 text-black">{{ item.title }}<span class="text-subtitle-2 pl-1">{{ item.percent }}</span></h5>
                    <p  class="text-subtitle-1 opacity-50 font-weight-medium"></p>
                    <v-btn flat color="secondary" variant="outlined" class="px-4 rounded-pill"> {{ item.details }} <SendIcon stroke-width="1.5" size="18"  class="ml-2" /></v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-card elevation="10">
        <v-card-text>
            <v-btn color="secondary" @click="routage()" rounded="outlined" class="ml-auto">
                <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Ajouter un nouveau produit
            </v-btn>
            <v-row class="mt-5">
    <grid
                @pagechange="pageChangeHandler"
                :total ="collectionData.length"
                :data-items="collectionData"
                :columns="columnsStock as any"
                :edit-field="'inEdit'"
                :filter="filter"
                @cellclick="cellClick"
                @itemchange="itemChange"
                @filterchange="filterChange"
                :loader="loader"
                :column-menu="true"
                :pageable="gridPageable"
                :sortable="sortable"
                :sort="sort"
                :take="take"
                :skip="skip"
                    >
                </grid>

              </v-row>
        
      </v-card-text>
      </v-card>
</template>