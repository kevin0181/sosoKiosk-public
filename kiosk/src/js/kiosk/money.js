import {longReceipt} from './receipt';
import {shortReceipt} from "./receipt";

export const NoReceiptMoneyPayStart = async (data) => { //영수증 출력 X

    saveMoneyOrder(data).then(function () {
        shortReceipt();
    })

}

export const YesReceiptMoneyPayStart = async (data) => { //영수증 출력 O

    saveMoneyOrder(data).then(function () {
        longReceipt();
    })

}

const saveMoneyOrder = async (data) => { //주문 시 저장 로직
    console.log(data);

}