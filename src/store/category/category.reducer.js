import { CATEGORY_MAP_REDUCERS_TYPES } from "./category.types";

const CATEGORIES_MAP_INTIAL_STATE = { category: [] }

export const categoryMapReducer = (state = CATEGORIES_MAP_INTIAL_STATE, action = {}) => {
    const {type, payload} = action;
    switch(type){
        case CATEGORY_MAP_REDUCERS_TYPES.SET_CATEGORY_MAP: 
            return {...state, category: payload}
            default: 
            return state;
    }
} 