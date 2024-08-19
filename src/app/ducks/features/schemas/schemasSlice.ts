/**
 * Manage schemas from storage
 * */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// MOCK DATA
import { mockProjectSchemas } from "#mocks/dummyData";

const initialState: SchemaList = mockProjectSchemas;

export const schemasSlice = createSlice({
    name: "schemas",
    initialState,
    reducers: {
        updateSchemas: (state: SchemaList, action: PayloadAction<SchemaDetails>) => {

            //Add thunk to make sure Indexed db state is updated first

            //Replace schema in schema list with new schema details, 
            //otherwise append to current stat
            for(let i = 0; i < state.length ; i++ ){
                if(state[i].id === action.payload.id){
                    state[i] = action.payload;
                    return state;
                }
            }

            state.push(action.payload);
            return state
        },
        fetchSchemas: (state: SchemaList, action: PayloadAction<SchemaList>) =>{
            
            //Add thunk here to retrieve schemas from Indexed DB
            state = action.payload;
            return
        }
    }
});

export const { updateSchemas, fetchSchemas } = schemasSlice.actions;

export default schemasSlice.reducer;