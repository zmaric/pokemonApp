import React from 'react';
import { createContext, useReducer } from "react";


export const Store = createContext()

function reducer(state, action){
    switch(action.type) {
        case 'POKEMON': {
            return { ...state, pokemon: action.payload }
        }
        case 'TYPE_FILTER': {
            return { ...state, types: action.payload }
        }
        default:
            return state
    }
}

export function StoreProvider(props){
    const [state, dispatch] = useReducer(reducer, '')
    const value = { state, dispatch }
    return (<Store.Provider value={value}>{props.children}</Store.Provider>)
}