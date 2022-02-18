import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type totalSupply = {
	networkId: number
	pynthName: string
	totalSupply: bigint
} 


const initialState: {totalSupplies: Array<totalSupply>} = {
	totalSupplies: []
};

const sliceName = 'totalSupplyPynths';

export const totalSupplyPynths = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setTotalSupplyPynths: (state, action: PayloadAction<Array<totalSupply>>) => {
			state.totalSupplies = action.payload;
		},
	},
});

export const {
	setTotalSupplyPynths,
} = totalSupplyPynths.actions;

export default totalSupplyPynths.reducer;
