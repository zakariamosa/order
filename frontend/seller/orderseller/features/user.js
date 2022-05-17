import {createAction, createReducer} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
const addUser = createAction('add user');
const doLoginUser = createAction('do login');
const doLogOutUser = createAction('do logout');
const saveLogedinUserToLocalStorage = createAction(
  'save Logedin User To Local Storage',
);
import axios from 'axios';

const actionsuser = {
  addUser,
  doLoginUser,
  doLogOutUser,
  saveLogedinUserToLocalStorage,
};

//const initialState = //[
  /* {name: 'zakaria', email: 'Zakaria@gmail.com', password: '123'},
  {name: 'Hampus', email: 'Hampus@gmail.com', password: '123'},
  {name: 'Mary', email: 'Mary@gmail.com', password: '123'},
  {name: 'Admin', email: 'admin@gmail.com', password: '123'}, */
//];
const initialState ={
  id:0,
  userName: null,
  email: null,
}

const reducer = createReducer(initialState, {
  [addUser]: (state, action) => {
    

    
      

          storeDataLocally({
            id: action.payload.id,
            email: action.payload.email,
            password: action.payload.password,
          });

          return {id:action.payload.id,userName:action.payload.name,email: action.payload.email}
       
    
  },

 
});

const storeDataLocally = async ({id,email, password}) => {
  try {
    if (!id || !email || !password ) {
      return;
    }
    const auser = {id,email, password};
    await AsyncStorage.setItem('currentUserCredentials', JSON.stringify(auser));
  } catch (error) {
    // Error saving data
    throw error;
  }
};

export {actionsuser, reducer};
