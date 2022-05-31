import {createAction, createReducer} from '@reduxjs/toolkit';
const getstore = createAction('get store');
const addstore = createAction('add store');
const deletestore = createAction('delete store');


const actionsstore = {
    getstore,
    addstore,
    deletestore
};

const store = [

];

const storereducer = createReducer(store, {
  
  [getstore]: (state, action) => {
    
    
    return action.payload;
  },
  [addstore]: (state, action) => {
    
    console.log('state: ',state)
    if(action.payload.id==0){
      if(state.length>0){
        //get max id and add 1
        action.payload.id=Math.max.apply(Math, state.map(function(t) { return t.id; }))+1;
      }
    }
    
    return [...state, action.payload];
  },
  [deletestore]: (state, action) => {
    
   
    
    return state.filter(t=>
      t.id!==action.payload.id
    );
   
  },
});

export {actionsstore, storereducer};
