import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: {APY: String} = {
	APY: '0.00'
};

const sliceName = 'APY';

export const APY = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setAPY: (state, action: PayloadAction<String>) => {
            state.APY = action.payload;
		},
	},
});

export const {
	setAPY,
} = APY.actions;

export default APY.reducer;
