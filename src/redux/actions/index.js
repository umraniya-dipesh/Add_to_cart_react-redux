export const addDataTOcart = (item) => {
  return {
    type: "ADD",
    payload: item,
  };
};
export const deleteFromcart = (id) => {
  return {
    type: "DELETE",
    payload: id,
  };
};
//remove particulart item 
export const removeParticularItem = (product_item) => {
  return {
    type: "REMOVE_SPECIFIC_ITEM",
    payload: product_item,
  };
};