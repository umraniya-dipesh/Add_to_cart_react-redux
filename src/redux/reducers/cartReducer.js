const initialState = {
  cart: [],
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      const prodIndex = state.cart.findIndex(
        (element) => element.id === action.payload.id
      );
      // console.log(prodIndex);
      if (prodIndex >= 0) {
        state.cart[prodIndex].quantity += 1;
      } else {
        const addPrdq = { ...action.payload, quantity: 1 };
        return {
          ...state,
          cart: [...state.cart, addPrdq],
        };
      }

    case "DELETE":
      const deleteItem = state.cart.filter((e) => {
        return e.id !== action.payload;
      });
      return {
        ...state,
        cart: deleteItem,
      };

    case "REMOVE_SPECIFIC_ITEM":
      //finding index
      const prodIndexDecrement = state.cart.findIndex(
        (element) => element.id === action.payload.id
      );
      if (state.cart[prodIndexDecrement].quantity >= 1) {
        const deletedItems = (state.cart[prodIndexDecrement].quantity -= 1);
        console.log([...state.cart, deletedItems]);
        return {
          ...state,
          cart: [...state.cart],
        };
      } else if (state.cart[prodIndexDecrement].quantity === 1) {
        const deleteItem = state.cart.filter((e) => {
          return e.id !== action.payload;
        });
        return {
          ...state,
          cart: deleteItem,
        };
      }
    default:
      return state;
  }
};

export default cartReducer;
