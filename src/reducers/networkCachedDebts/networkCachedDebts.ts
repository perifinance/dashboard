import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type debt = {
	total: bigint
	USDC: bigint
	DAI: bigint
	PERI: bigint
	stable: bigint
}

export type NetworkCachedDebtsSliceState = {
    total?: debt
    1?: debt
    42?: debt
	56?: debt
    97?: debt
	137?: debt
    1287?: debt
    80001?: debt
};

const initialState: NetworkCachedDebtsSliceState = {
	
};

const sliceName = 'cachedDebts';

export const networkCachedDebts = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setNetworkCachedDebts: (state, action: PayloadAction<NetworkCachedDebtsSliceState>) => {
            Object.keys(action.payload).forEach(e => {
                state[e] = action.payload[e];
            })
		},
	},
});

export const {
	setNetworkCachedDebts,
} = networkCachedDebts.actions;

export default networkCachedDebts.reducer;
