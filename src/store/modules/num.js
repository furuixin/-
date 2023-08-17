export default{
    namespaced:true,
    state:{
        arr:[1,2,3,4]
    },
    mutations:{
        changeArr(state){
            state.arr.push(6)
          }
    },
    getters:{},
    actions:{
     
    }
  }