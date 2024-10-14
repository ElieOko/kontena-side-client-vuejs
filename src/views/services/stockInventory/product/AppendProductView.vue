<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useAxiosRequest } from '@/utils/service/custom';
import { ref, watchEffect } from 'vue';
import type { IDevise as TypeModel } from '@/utils/interface/core/stock/IDevise';
import type { IRequestProduct } from '@/utils/interface/core/stock/IProduct';

const devise = ref<Array<TypeModel>>([]);
const productType = ref<Array<any>>([]);
const productPackage = ref<Array<any>>([]);
const dataInput = ref<IRequestProduct>({
    spacework_id    : 1,
    name            : '',
    devise          : '',
    packaging       : '',
    type_product    : '',
    date_expiration : '',
    price_wholesale : 0.0,
    price_retail    : 0.0
})
const validate =(e:any)=>{
    let charCode = (e.which) ? e.which : e.keyCode;
    let input = e.target.value;
    // Vérifier si le caractère est un chiffre ou un point décimal
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        e.preventDefault();
    } else {
        // Autoriser le point décimal seulement s'il n'est pas déjà présent
        if (charCode === 46 && input.includes('.')) {
            e.preventDefault();
        }
    }
}

const fetchAllData = () =>{
    watchEffect(async()=>{
        await(
            useAxiosRequest().get(`/devise/all`).then(function (response) {
                devise.value = response.data.devise as Array<TypeModel>
            }).catch(function (error) {console.log(error);}).finally(function () {
               // show.value = false
            })
        );

        await(
            useAxiosRequest().get(`/product/type/all`).then(function (response) {
                productType.value = response.data.productType 
            }).catch(function (error) {console.log(error);}).finally(function () {
               // show.value = false
            })
        );
        await(
            useAxiosRequest().get(`/product/package/all`).then(function (response) {
                productPackage.value = response.data.productPackage 
            }).catch(function (error) {console.log(error);}).finally(function () {
               // show.value = false
            })
        );
            
    })
}
const pushData = async()=>{
    if(dataInput.value.name != ""){
       const objSend = {
            "spacework_id"    : 1,
            "name"            : dataInput.value.name,
            "devise" : dataInput.value.devise._id,
            "type_product" : dataInput.value.type_product._id,
            "packaging" : dataInput.value.packaging._id,
            "date_expiration" : dataInput.value.date_expiration,
            "price_wholesale" : Number(dataInput.value.price_wholesale),
            "price_retail"    : Number(dataInput.value.price_retail),
            "description" : dataInput.value.description
        }
        watchEffect(async()=>{
            
           await useAxiosRequest().post("/product/store",objSend).then(resp=>{
                alert(resp.data.message)
            }).catch(error=>{
                alert(error.message)
            })
        })
    }
}
fetchAllData();
</script>
<template>
    <UiParentCard title="Nouveau Produit" class="mt-6">
        <v-row>
            <v-col cols="12" lg="12">
                <v-alert variant="tonal" type="warning" color="primary" class="mb-6"> Person Info </v-alert>
                <v-row>
                    <v-col>
                        <v-label class="mb-2 font-weight-medium" for="sg">Type de Produit</v-label>
                        <v-select :items="productType" v-model="dataInput.type_product" item-title="name" id="sg" item-value="_id" return-object single-line variant="outlined"></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-label class="mb-2 font-weight-medium" for="fn">Nom du produit</v-label>
                        <v-text-field variant="outlined" v-model="dataInput.name" color="primary" id="fn"></v-text-field>
                        <v-label class="mb-2 font-weight-medium" for="sg">Devise</v-label>
                        <v-select :items="devise" v-model="dataInput.devise"  item-title="code" id="sg" item-value="_id" return-object single-line variant="outlined"></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-label class="mb-2 font-weight-medium" for="sg">Emballage</v-label>
                        <v-select :items="productPackage" v-model="dataInput.packaging" item-title="name" id="sg" item-value="_id" return-object single-line variant="outlined"></v-select>
                        <v-label class="mb-2 font-weight-medium" for="dob">Date d'expiration</v-label>
                        <v-text-field  color="primary" variant="outlined" v-model="dataInput.date_expiration" id="dob" type="date" ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-label class="mb-2 font-weight-medium" for="fn">Prix Grossiste</v-label>
                        <v-text-field variant="outlined" prefix="$" v-model="dataInput.price_wholesale" step="0.01" type="number" color="primary" id="fn"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-label class="mb-2 font-weight-medium" for="fn">Prix Detaillant</v-label>
                        <v-text-field variant="outlined" step="0.01" v-model="dataInput.price_retail" prefix="$" type="number" color="primary" id="fn"></v-text-field>
                    </v-col>
                </v-row>
                <v-col>
                    <v-label class="mb-2 font-weight-medium" for="fn">Description</v-label>
                    <v-textarea variant="outlined" color="primary" v-model="dataInput.description" id="ln"></v-textarea>
                </v-col>
                <v-btn color="error" class="mr-3" rounded="pill">Cancel</v-btn>
                <v-btn color="primary" @click="pushData()" rounded="pill">Sauvegarder</v-btn>
            </v-col>
        </v-row>
    </UiParentCard>
</template>
