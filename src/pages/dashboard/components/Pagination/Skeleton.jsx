function Skeleton() {
    return ( 
        <div className="flex gap-2 justify-center mb-8 animate-pulse">
            <div className="h-9 w-9 skeleton"/>
            {Array.from({ length: 3 }, (_, i) => i + 1).map((i)=>(
                <div key={i} className="h-9 w-9 skeleton"/>
            ))}
            <div className="h-9 w-9 skeleton"/>
        </div>
     );
}

export default Skeleton;