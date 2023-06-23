import { atom } from "recoil";

const tokenState = atom({
    key: 'tokenState',
    default: '',
});

const userState = atom({
    key: 'userState',
    default: null,
})

export {tokenState,userState};