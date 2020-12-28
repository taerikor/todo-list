import {createStore } from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit'


const toDos = createSlice({
    name: 'toDosReducder',
    initialState: [],
    reducers: {
        add:(state,action) =>{
            state.push({text: action.payload, id: Date.now()} )
         },
        remove: (state,action) => 
        state.filter(toDo => toDo.id !== action.payload)
    }
})

const store = configureStore({reducer: toDos.reducer});

export const {add , remove} = toDos.actions

export default store;