import {createAction, createReducer} from '@reduxjs/toolkit';
const getstoreproducts = createAction('get storeproducts');
const addstoreproduct = createAction('add storeproduct');
const deletestoreproduct = createAction('delete storeproduct');
const updatestoreproduct = createAction('update storeproduct');
const selectstoreproduct = createAction('select storeproduct');
const addstoreproducts = createAction('add storeproducts');
const resetstoreproducts = createAction('resetstoreproducts');


const actionsstoreproducts = {
    getstoreproducts,
    addstoreproduct,
    deletestoreproduct,
    updatestoreproduct,
    selectstoreproduct,
    addstoreproducts,
    resetstoreproducts
};

const storeproducts = [

];

const storeproductsreducer = createReducer(storeproducts, {
  
  [getstoreproducts]: (state, action) => {
    
    
    return action.payload;
  },
  [resetstoreproducts]: (state, action) => {
    
    
    return [];
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
  [addstoreproducts]: (state, action) => {
    
    if (!action.payload.length) {
      
    }else{
      return state.concat(action.payload);
    }
  },
  [deletestoreproduct]: (state, action) => {
    
   
    
    return state.filter(t=>
      t.id!==action.payload.id
    );
   
  },
  [updatestoreproduct]: (state, action) => {
    
    console.log('update: ',...state);
    console.log('action.payload.id: ',action.payload.id);
    console.log('action.payload.amount: ',action.payload.amount);
    let found = state.find(product => product.id === action.payload.id);
    if( found ) {
        const newState =state.map(product => {
            if (product.id === action.payload.id) {
      
                return { ...product, amount: action.payload.amount }
                
            } else {
                return product;
            }
        })  
        return newState;

    } else {
        return [
            ...state
        ];
    }


   
  },
  [selectstoreproduct]: (state, action) => {
    
    console.log('update: ',...state);
    console.log('action.payload.id: ',action.payload.id);
    console.log('action.payload.selected: ',action.payload.selected);
    let found = state.find(product => product.id === action.payload.id);
    if( found ) {
        const newState =state.map(product => {
            if (product.id === action.payload.id) {
      
                return { ...product, selected: action.payload.selected }
                
            } else {
                return product;
            }
        })  
        return newState;

    } else {
        return [
            ...state
        ];
    }


   
  },
});

export {actionsstoreproducts, storeproductsreducer};
