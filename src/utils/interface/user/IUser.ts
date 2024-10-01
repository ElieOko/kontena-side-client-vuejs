//@ts-ignore
import { Document } from "mongoose"
import type { IToken } from "../token/IToken"
import type { IActivity } from "./IActivity"

export interface IUser{
    user_id?     : Number
    family_name? : string
    last_name?   : string
    username     : string
    activity?    : IActivity
    email        : string
    token?       : Array<IToken>
    is_active?   : Boolean
    password     : string
    isAdmin?     : Boolean
}
export interface IUserRequest{
    family_name? : string
    last_name?   : string
    username     : string
    activity?    : string
    email        : string
    password     : string
}
export interface IUserAuth{
    username : string
    password : string
}
export interface IAuthSecurity{
    generateAuthToken:(user_id:number)=>string
}

export interface IUserDocument extends IUser, Document {}
