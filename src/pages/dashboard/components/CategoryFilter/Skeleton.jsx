import Container from "components/ui/Container";

function Skeleton() {
  return (
    <section className="sticky top-20 bg-page py-3 shadow-sm z-20">
      <Container className="grid grid-cols-2 sm:grid-cols-12 animate-pulse items-center">
        {/* Selected Category and Product Quantity*/}
        <div className="col-span-1 sm:col-span-2 space-y-2">
          <div className="h-6 w-36 bg-black/10 rounded-md"></div>
          <div className="h-5 w-20 bg-black/10 rounded-md"></div>
        </div>
        {/* Buttons for changing category*/}
        <div className=" col-span-0 md:col-span-10 hidden md:flex gap-4 justify-end items-center">
          <div className="h-9 w-16 bg-black/10 rounded-md"></div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-20 bg-black/10 rounded-md"></div>
          ))}
        </div>
        {/* Mobile Category filter */}
        <div className="py-1 px-1 border-2 rounded-md border-subtle max-w-60 md:hidden col-span-1 sm:col-span-10 justify-self-end bg-surface self-center">
          <div className="w-40 h-9 bg-black/10 rounded-md"></div>
        </div>
      </Container>
    </section>
  );
}

export default Skeleton;
