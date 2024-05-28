import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bagActions } from "../store/bagSlice";

const BagSummary = () => {
  const dispatch = useDispatch();

  const bagItemIds = useSelector((state) => state.bag);
  const items = useSelector((state) => state.items);
  const finalItems = items.filter((item) => {
    const itemIndex = bagItemIds.indexOf(item.id);
    return itemIndex >= 0;
  });

  const CONVENIENCE_FEES = bagItemIds.length > 0 ? bagItemIds.length * 50 : 0;
  let totalItem = bagItemIds.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  finalItems.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  function handleOrderBtn() {
    dispatch(bagActions.clearBag());
    console.log("Order Placed");
  }

  return (
    <div className="bag-summary">
      <div className="bag-details-container">
        <div className="price-header">PRICE DETAILS ({totalItem} Items) </div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">₹{totalMRP}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">
            -₹{totalDiscount}
          </span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">{CONVENIENCE_FEES}</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">₹{finalPayment}</span>
        </div>
      </div>
      {bagItemIds.length > 0 ? (
        <Link
          onClick={handleOrderBtn}
          to="/ThankyouPage"
          className="btn-place-order"
          style={{ width: "100%" }}
        >
          PLACE ORDER
        </Link>
      ) : (
        <Link to="/" className="btn-place-order">
          Cart is empty, Continue shopping
        </Link>
      )}
    </div>
  );
};

export default BagSummary;
