import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import { setStakeIsReady, setClear, setLoading } from "reducers/app";
import { setNetworkCachedDebts } from "reducers/networkCachedDebts";
import { setAPY } from "reducers/APY";
import { setPeriTicker } from "reducers/periTicker";
import { setCirculatingSupply } from "reducers/circulatingSupply";
import { setNetworkByDebtCashes } from "reducers/networkByDebtCashes";
import { setPeriholderCounts } from "reducers/periholderCounts";
import { setExchangeRates } from "reducers/exchangeRates";
import { setPeriRates } from "reducers/periRates";
import { getStableDebt, getDebtCaches, getPeriholderCounts, getLastRates, getTokenTicker, getChartRates } from "lib/thegraph/api";
import { getCachedDebts, getTotalAPY, getTotalCirculatingSupply } from "lib/api/api";

import StakingByAssets from "screens/Stake/StakingByAssets";
import DebtByNetworks from "screens/Stake/DebtByNetworks";
import Overview from "screens/Stake/Overview";
import Information from "screens/Stake/Information";
import Holders from "screens/Stake/Holders";
import { setPeriChartRates } from "reducers/periChartRates";

const Stake = () => {
    const dispatch = useDispatch();

    const { stakeIsReady } = useSelector((state: RootState) => state.app);

    const getPERIandStalbeDebt = (value) => {
        let stable = 0n;
        Object.keys(value).forEach((e) => {
            if (e !== "total") {
                stable = stable + value[e];
            }
        });
        return {
            stable,
            PERI: value["total"] - stable,
            ...value,
        };
    };

    const getDebts = async () => {
        const promise = [getCachedDebts(), getStableDebt()];

        const debts = Promise.all(promise).then((data) => {
            const value = {};
            Object.keys(data[0]).forEach((e) => {
                value[e] = getPERIandStalbeDebt(Object.assign(data[0][e], data[1][e]));
            });

            return value;
        });

        return debts;
    };

    const init = async () => {
        dispatch(setLoading(true));

        try {
            const [
                debt,
                apy,
                chartRate,
                tokenTicker,
                circulatingSupply,
                networkByDebtCashes,
                periholderCounts,
                exchangeRates,
                // periRates,
            ] = await Promise.all([
                getDebts(),
                getTotalAPY(),
                getChartRates({
					currencyName: "PERI",
					networkId: 137,
				}),
                getTokenTicker({
                    currencyName: "PERI",
                    networkId: 137,
                }),
                getTotalCirculatingSupply(),
                getDebtCaches(),
                getPeriholderCounts(),
                getLastRates(),
                // getLastPeriRates(),
            ]);
            const today = Math.round(new Date().getTime() / 1000);
			const quoterDay = today - 6 * 3600;
			const filterChartRate = chartRate.filter((rate) => {
				return rate.timestamp >= quoterDay * 1000;
			});

            console.log("networkByDebtCashes", networkByDebtCashes);
            
            dispatch(setPeriChartRates(filterChartRate));
            dispatch(setNetworkCachedDebts(debt));
            dispatch(setAPY(apy));
            dispatch(setPeriTicker(tokenTicker));
            dispatch(setCirculatingSupply(circulatingSupply));
            dispatch(setNetworkByDebtCashes(networkByDebtCashes));
            dispatch(setPeriholderCounts(periholderCounts));
            dispatch(setExchangeRates(exchangeRates));
            // dispatch(setPeriRates(periRates)); // ! Original setPeriRates Code
            dispatch(setPeriRates({ price: tokenTicker.lastPrice}));
        } catch (err) {
            console.error("init error:", err);
        } finally {
            dispatch(setStakeIsReady());
        }

        dispatch(setLoading(false));
    };

    useEffect(() => {
        if (!stakeIsReady) {
            init();
        }
    }, [stakeIsReady]);

    return (
        <div className="flex flex-col w-[92%] lg:w-full h-full min-w-[220px] gap-5">
            <div className="flex flex-col w-full md:h-3/5 md:flex-row gap-5">
                <div className="md:h-86">
                    <StakingByAssets></StakingByAssets>
                </div>
                <div className="md:h-86 md:flex-1">
                    <DebtByNetworks></DebtByNetworks>
                </div>
            </div>
            <div className="flex flex-col w-full md:h-2/5 md:flex-row gap-5">
                <div className="md:w-[40%]">
                    <Overview></Overview>
                </div>
                <div className="md:w-[35%]">
                    <Information></Information>
                </div>
                <div className="md:w-[25%]">
                    <Holders></Holders>
                </div>
            </div>
        </div>
    );
};
export default Stake;
