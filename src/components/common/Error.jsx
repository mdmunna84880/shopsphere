import Container from "components/ui/Container";

function Error({children}) {
  return (
    <section className="sticky top-20 bg-page py-3 shadow-sm z-20">
      <Container className="grid grid-cols-1 animate-pulse">
        <p className="text-error text-sm sm:text-base">
            {children || "Failed to load, please refresh"}
        </p>
      </Container>
    </section>
  );
}

export default Error;
