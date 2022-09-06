import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'reducers'
import Categories from "screens/Dex/Categories"
import PynthsTotalVolume from "screens/Dex/PynthsTotalVolume"
import Performance from "screens/Dex/Performance"
import PynthsDistribution from "screens/Dex/PynthsDistribution"
import TradingVolume from "screens/Dex/TradingVolume"

import { setDexIsReady, setClear } from "reducers/app"
import { setTotalSupplyPynths } from "reducers/totalSupplyPynths"
import { setExchangeVolumes } from "reducers/exchangeVolumes"
import { setRateChanges } from "reducers/rateChanges"
import { setExchangeRates } from 'reducers/exchangeRates'

import { getTotalSupplyPynths } from "lib/thegraph/api"
import { getExchangeVolumes } from "lib/thegraph/api"
import { getLastRates } from "lib/thegraph/api"
import { getRateChanges } from "lib/thegraph/api"

const Dex = () => {
    const dispatch = useDispatch();

    const { dexIsReady }  = useSelector((state: RootState) => state.app);

    const init = async() => {
        const totalSupplyPynths = await getTotalSupplyPynths();
        const exchangeVolumes = await getExchangeVolumes();
        const exchangeRates = await getLastRates();
        const rateChanges = await getRateChanges();

        dispatch(setExchangeRates(exchangeRates));
        dispatch(setTotalSupplyPynths(totalSupplyPynths));
        dispatch(setExchangeVolumes(exchangeVolumes));
        dispatch(setRateChanges(rateChanges))
        dispatch(setDexIsReady())
  };

  useEffect(() => {
    if (dexIsReady === false) {
      init();
    }
  }, [dexIsReady]);

  return (
    <div className="flex flex-col px-4 lg:flex-row lg:px-0 gap-5 lg:h-144 flex-wrap">
      <div className="lg:flex-1">
        <PynthsTotalVolume />
      </div>
      <div className="lg:flex-1">
        <TradingVolume/>
      </div>
      <div className="lg:flex-1">
        <PynthsDistribution/>
      </div>
      <div className="lg:h-80 lg:flex-1">
        <Categories/>
      </div>
      <div className="lg:h-80 lg:flex-1">
        <Performance/>
      </div>
    </div>
  );
};
export default Dex;
