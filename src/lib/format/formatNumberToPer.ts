import { utils } from 'ethers';

export const formatNumberToPer = (value, total) => {
    if(value === 0n || total === 0n) {
        return 0;
    }
    
    let per = '0.00';
    try {
        per = Number(utils.formatEther((value * 1000000000000000000n / total * 100n))).toFixed(2);
    } catch(e) {

    }
    return Number(per)
}