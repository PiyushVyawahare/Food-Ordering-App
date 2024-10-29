import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <>
      {cartItems.map((item) => (
        <div>
          {item.card.info.name} -{" "}
          <button onClick={() => handleRemoveItem(item)}>Remove</button>
        </div>
      ))}
      {cartItems.length ? (
        <button
          onClick={() => {
            dispatch(clearCart());
          }}
        >
          Clear Cart
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default Cart;
