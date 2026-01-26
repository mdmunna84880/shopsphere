import { useRef } from "react";

// Generating id from 0
export const useIdGenerator = (start=-1)=>{
    const idRef = useRef(start);

    const nextId = ()=>idRef.current++;

    return nextId;
}