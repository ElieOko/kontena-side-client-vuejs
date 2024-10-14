<script lang="tsx" setup>
import { process, filterBy, type CompositeFilterDescriptor, type SortDescriptor } from '@progress/kendo-data-query';
import { Grid, GridToolbar } from '@progress/kendo-vue-grid';
import { ref, watchEffect } from 'vue';
import { Loader } from '@progress/kendo-vue-indicators'
import { Parent } from '@/utils/service/proxy';
import type { IProduct as TypeModel } from '@/utils/interface/core/stock/IProduct';
import { useAxiosRequest } from '@/utils/service/custom';
import { columnsProduct } from '@/utils/kendo/service_stock/product';
import { progress } from '@/utils/animation/routage';
import router from '@/router';
import { useUserLocal } from '@/stores/user/local';


const collectionData = ref<Array<TypeModel>>([])
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

const fetchAllData = () =>{
    watchEffect(async()=>{
        await(useAxiosRequest(useUserLocal().local?.token).get(`/product/all`)
            .then(function (response) {
              collectionData.value = response.data.product 
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                show.value = false
            }));
    })
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
    callComponentWithDelay("/service/stock/product/append")
}
fetchAllData();

</script>
<template>
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
                :columns="columnsProduct as any"
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