import {createAction, createReducer} from '@reduxjs/toolkit';
const getstoreproducts = createAction('get storeproducts');
const addstoreproduct = createAction('add storeproduct');
const deletestoreproduct = createAction('delete storeproduct');


const actionsstoreproducts = {
    getstoreproducts,
    addstoreproduct,
    deletestoreproduct
};

const storeproducts = [

];

const storeproductsreducer = createReducer(storeproducts, {
  
  [getstoreproducts]: (state, action) => {
    
    
    return action.payload;
  },
  [addstoreproduct]: (state, action) => {
    
    console.log('state: ',state)
    if(action.payload.id==0){
      if(state.length>0){
        //get max id and add 1
        action.payload.id=Math.max.apply(Math, state.map(function(t) { return t.id; }))+1;
      }
    }
    
    return [...state, action.payload];
  },
  [deletestoreproduct]: (state, action) => {
    
   
    
    return state.filter(t=>
      t.id!==action.payload.id
    );
   
  },
});

export {actionsstoreproducts, storeproductsreducer};
