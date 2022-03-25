import { Status } from "./Status"

export interface User {
  id:string
  mail:string
  name:string
  avatar:string
  username:string
  phoneNo:string
  status:Status
  address:string
}
