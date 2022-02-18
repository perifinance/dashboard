import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DebtCashes = {
	debtBalance: bigint
	debtBalanceToString: string,
	formatDebtBalance: string
	timestamp: Number,
	date: string
}


const initialState = {
	networkByDebtCashes: []
};

const sliceName = 'networkByDebtCashes';

export const networkByDebtCashes = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setNetworkByDebtCashes: (state, action) => {
			state.networkByDebtCashes = action.payload
		},
	},
});

export const {
	setNetworkByDebtCashes,
} = networkByDebtCashes.actions;

export default networkByDebtCashes.reducer;
