import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type volume = {
	id: string 
	amount: bigint
	currencyName: string
	timestamp: string
	usdVolume: bigint
} 


const initialState: {exchangeVolumes: Array<Array<volume>>} = {
	exchangeVolumes: []
};

const sliceName = 'exchangeVolumes';

export const exchangeVolumes = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setExchangeVolumes: (state, action: PayloadAction<Array<Array<volume>>>) => {
			state.exchangeVolumes = action.payload;
		},
	},
});

export const {
	setExchangeVolumes,
} = exchangeVolumes.actions;

export default exchangeVolumes.reducer;
