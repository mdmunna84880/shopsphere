import { useEffect, useRef, useState } from "react";

export function useClickAway(){
    const [active, setActive] = useState(false);
    const ref = useRef(null);

    function hadleClick(e){
        if(ref.current && !ref.current.contains(e.target)) setActive(false);
    }

    useEffect(()=>{
        if(active) document.addEventListener("mousedown", hadleClick);
        else document.removeEventListener("mousedown", hadleClick);

        return ()=> document.removeEventListener("mousedown", hadleClick);

    }, [active]);

    return {active, setActive, ref};
}
