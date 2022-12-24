import React, { useState } from "react";
import "./admin.css";
import AdminPage from "./AdminPage";
import Orders from "./Orders";
import { useHistory } from "react-router-dom";
export default function AdminHomePage({ products, setProducts }) {
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showChoose, setShowChoose] = useState(true);
  const history = useHistory();
  const goHome = () => {
    history.push("/");
  };
  return (
    <div className="adminHomePage">
      {showChoose ? (
        <div className="cardsAdmin">
          <div onClick={goHome} className="CardAdmin">
            דף הבית
          </div>
          <div
            onClick={() => {
              setShowOrders(true);
              setShowAddProducts(false);
              setShowChoose(false);
            }}
            className="CardAdmin"
          >
            הזמנות
          </div>
          <div
            onClick={() => {
              setShowAddProducts(true);
              setShowOrders(false);
              setShowChoose(false);
            }}
            className="CardAdmin"
          >
            הוסף מוצרים
          </div>
        </div>
      ) : null}

      {showOrders && (
        <Orders
          setShowChoose={setShowChoose}
          setShowAddProducts={setShowAddProducts}
          setShowOrders={setShowOrders}
        />
      )}
      {showAddProducts && (
        <AdminPage
          products={products}
          setProducts={setProducts}
          showChoose={showChoose}
          setShowChoose={setShowChoose}
          setShowAddProducts={setShowAddProducts}
          setShowOrders={setShowOrders}
        />
      )}
    </div>
  );
}
