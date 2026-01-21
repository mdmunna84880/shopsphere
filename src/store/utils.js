// Find the index of the item in the cartItem
export function findItemIndex(items, id){
  return items.findIndex((item)=>item.id === id);
}