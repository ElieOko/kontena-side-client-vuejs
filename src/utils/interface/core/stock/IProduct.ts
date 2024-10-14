import type { IDevise } from "./IDevise"

export interface IProductType{
    name : string
    description : string
}

export interface IProductPackage{
    name : string
    description : string
}

export interface IProduct{
    _id             : string
    spacework_id    : number
    name            : string
    description     : string
    price_wholesale : number
    price_retail    : number
    devise          : IDevise 
    type_product    : IProductType  
    packaging       : IProductPackage
    is_active       : Boolean
    date_expiration : string
    date_created    : string 
}

export interface IRequestProduct{
    spacework_id    : number
    name             : string
    description?     : string
    price_wholesale : number
    price_retail    : number
    devise           : any
    packaging        : any
    type_product     : any
    date_expiration  : string
}