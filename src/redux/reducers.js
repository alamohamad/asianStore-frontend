import { ADD_TO_CART } from "./action"

const countReducer=(state={count:0,name:''},action)=>{
    if(action.type==ADD_TO_CART){
        return {...state,count:state.count+1}
    }

}





export default countReducer