<script lang="tsx" setup>

import { process, filterBy, type CompositeFilterDescriptor, type SortDescriptor } from '@progress/kendo-data-query';
import { Grid, GridToolbar } from '@progress/kendo-vue-grid';
import { ref, watchEffect } from 'vue';
import { Loader } from '@progress/kendo-vue-indicators'
import type { IChartAccount } from '@/utils/interface/core/finance/IChartAccount';
import { colChartAccount } from '@/utils/kendo/service_finance/chart_account';
import { useAxiosRequest } from '@/utils/service/custom';
import { Parent } from '@/utils/service/proxy';


const chartAccount = ref<Array<IChartAccount>>([])
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
      chartAccount.value.forEach((d:any) => {
        if (d.inEdit) {
          d.inEdit = undefined;
        }
      });
      editField.value = undefined;
    }
    const itemChange =  (e:any)=> {
            const data =  chartAccount.value.slice();
            const index = data.findIndex((d  => d._id === e.dataItem.id ))
            data[index] = { ...data[index], [e.field]: e.value };
            chartAccount.value  = data;
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
        await(useAxiosRequest().get(`/chart/account/all`)
            .then(function (response) {
              chartAccount.value = response.data.chart_account as Array<IChartAccount>
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                //alert("Elie Oko");
                show.value = false
            }));
    })
    }
    fetchAllData()
</script>
<template>
     <grid
    @pagechange="pageChangeHandler"
    :total ="chartAccount.length"
    :data-items="chartAccount"
    :columns="colChartAccount as any"
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
</template>