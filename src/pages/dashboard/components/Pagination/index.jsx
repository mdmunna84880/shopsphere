import Button from "components/ui/Button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSearchParams } from "react-router";
function Pagination({prevOnClick, nextOnClick, noOfPages, pageOnClick}) {
    const [searchParams] = useSearchParams();
    const pageNo = Number(searchParams.get("page") || "1");
    return ( 
        <div className="flex gap-2 justify-center mb-8">
            <Button onClick={prevOnClick} variant="outline" disabled={pageNo===1}><FiChevronLeft /></Button>
            {Array.from({ length: noOfPages }, (_, i) => i + 1).map((page)=>(
                <Button key={page} onClick={()=>pageOnClick(page)} variant={pageNo === page ? "secondary": "outline"}>{page}</Button>
            ))}
            <Button onClick={nextOnClick} variant="outline" disabled={noOfPages===pageNo}><FiChevronRight /></Button>
        </div>
     );
}

export default Pagination;