import { Button, Pagination } from "@mui/material";

export default function PageHelper(currentPagenum,limit,maxcount){
    let count=0;
    let i = currentPagenum-2;
    let maxpage = Math.ceil(maxcount/limit);
    let ret = [];
    while(count < 5 && i <= maxpage){
        if(i<=0){
            i++;continue;
        }
        ret.push(<Button key={i} href={`?pagenum=${i}`}>{i}</Button>)
        count++;
        i++;
    }

    return ret;
}