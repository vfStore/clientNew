import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";
import { useHistory } from "react-router-dom";

export default function Orders({
  setShowChoose,
  setShowAddProducts,
  setShowOrders,
}) {
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/orders/all"
        );
        setOrders(response.data);
        console.log(response.data); // Log the orders to the console
      } catch (error) {
        console.error(error); // Log the error to the console
      }
    };
    getOrders();
  }, []);
  const homePage = () => {
    history.push("/");
  };
  console.log(orders);
  const drawOrders = () => {
    return orders?.map((order, i) => {
      return (
        <div key={i} className="specificOrder">
          <div>
            <div>
              {order.firstName}
              {"  "}
              {order.lastName}
            </div>
            <div>{order.address}</div>
            <div>{order.phone}</div>
            <div>
              {order.timestamp.slice(11, 16)}
              <br />
              {order.timestamp.slice(5, 10)}
            </div>
          </div>
          <div className="ordersProducts">
            {order.order.map((theOrder, i) => {
              return (
                <div
                  key={i}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <div className="orderName">{theOrder.name}</div>
                  <div>
                    {theOrder.units} {theOrder.unitKind}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <div className="adminPageHead">
        <div
          onClick={homePage}
          style={{
            width: "fit-content",
            borderBottom: "2px solid black",
            cursor: "pointer",
          }}
        >
          דף הבית
        </div>
        <div
          style={{
            width: "fit-content",
            borderBottom: "2px solid black",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowChoose(false);
            setShowAddProducts(true);
            setShowOrders(false);
          }}
        >
          הוסף מוצרים{" "}
        </div>
        <div
          style={{
            width: "fit-content",
            borderBottom: "2px solid black",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowChoose(true);
            setShowAddProducts(false);
            setShowOrders(false);
          }}
        >
          דף מנהל
        </div>
      </div>
      <div>
        <h2 style={{ textAlign: "center" }}>הזמנות</h2>
      </div>
      <div
        style={{
          backgroundColor: "#f4f4f4",
          height: "fit-content",
          minHeight: "100vh",
          width: "100vw",
          margin: "auto",
        }}
      >
        {drawOrders()}
      </div>
    </div>
  );
}
