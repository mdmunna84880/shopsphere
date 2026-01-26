/** @format */

import Rating from "components/common/product/Rating";
import Button from "components/ui/Button";
import Link from "components/ui/Link";
import { MdDelete } from "react-icons/md";

function WishlistCard({
  id,
  image,
  category,
  price,
  title,
  rating,
  addInCart,
  isINCart,
  removeFromWishlist
}) {
  return (
    <div className="w-160 flex gap-4 bg-surface border border-subtle/40 shadow-lg hover:shadow-xl group rounded-lg">
      <div className="bg-gray-400 w-40 rounded-l-lg aspect-square">
        <Link href={`/product/${id}`}>
          <img src={image} alt={title} className="object-contain p-4 md:p-6 scale-90 group-hover:scale-100"/>
        </Link>
      </div>
      <div className="flex flex-col gap-2 grow mt-2">
        <p className="text-muted text-base capitalize">{category}</p>
        <h3 className="text-main text-base sm:text-xl lg:text-2xl line-clamp-2 flex-1">
          <Link href={`/product/${id}`} variant="nav">{title}</Link>
        </h3>
        <div>
          <Rating rate={rating?.rate} count={rating?.count} />
        </div>
        <p>{price}</p>
        <div className="flex justify-between gap-4 mb-4 mr-4">
          {!isINCart && (
            <Button variant="primary" onClick={addInCart}>
              Add to Cart
            </Button>
          )}
          {isINCart && (
            <Link variant="secondary" href="/cart">
              Go to Cart
            </Link>
          )}
          <Button
            variant="destructive"
            className={"p-1 text-xl"}
            onClick={removeFromWishlist}
          >
            {<MdDelete />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WishlistCard;
