import { combineReducers } from "@reduxjs/toolkit";

import app from './app/app'
import networkCachedDebts from './networkCachedDebts/networkCachedDebts'
import APY from './APY/APY'
import circulatingSupply from './circulatingSupply/circulatingSupply'
import exchangeRates from './exchangeRates/exchangeRates'
import periChartRates from './periChartRates/periChartRates'
import totalSupplyPynths from './totalSupplyPynths/totalSupplyPynths'
import exchangeVolumes from './exchangeVolumes/exchangeVolumes'
import rateChanges from './rateChanges/rateChanges'
import networkByDebtCashes from './networkByDebtCashes/networkByDebtCashes'
import periholderCounts from './periholderCounts/periholderCounts'

const reducer = combineReducers({
    app,
    networkCachedDebts,
    APY,
    circulatingSupply,
    exchangeRates,
    periChartRates,
    totalSupplyPynths,
    exchangeVolumes,
    rateChanges,
    networkByDebtCashes,
    periholderCounts
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;

// export default reducer;
