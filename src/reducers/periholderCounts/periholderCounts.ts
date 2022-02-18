import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type count = {
	count: bigint
} 


const initialState: count = {
	count: 0n
};

const sliceName = 'periholderCounts';

export const periholderCounts = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setPeriholderCounts: (state, action: PayloadAction<bigint>) => {
			state.count = action.payload;
		},
	},
});

export const {
	setPeriholderCounts,
} = periholderCounts.actions;

export default periholderCounts.reducer;
