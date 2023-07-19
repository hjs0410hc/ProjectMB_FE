import { atom } from "recoil";

const tokenState = atom({
    key: 'tokenState',
    default: '',
});

const userState = atom({
    key: 'userState',
    default: null,
})

const baseURL = "https://blog.thxx.xyz:3000";

export {tokenState,userState,baseURL};