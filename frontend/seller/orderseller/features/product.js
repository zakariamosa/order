import {createAction, createReducer} from '@reduxjs/toolkit';
const getproduct = createAction('get product');
const addproduct = createAction('add product');
const deleteproduct = createAction('delete product');


const actionsproduct = {
    getproduct,
    addproduct,
    deleteproduct
};

const product = [

];

const productreducer = createReducer(product, {
  
  [getproduct]: (state, action) => {
    
    
    return action.payload;
  },
  [addproduct]: (state, action) => {
    
    console.log('state: ',state)
    if(action.payload.id==0){
      if(state.length>0){
        //get max id and add 1
        action.payload.id=Math.max.apply(Math, state.map(function(t) { return t.id; }))+1;
      }
    }
    
    return [...state, action.payload];
  },
  [deleteproduct]: (state, action) => {
    
   
    
    return state.filter(t=>
      t.id!==action.payload.id
    );
   
  },
});

export {actionsproduct, productreducer};
