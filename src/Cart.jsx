import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import "./cart.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const Cart = ({ products, setProducts }) => {
  //   const [products, setProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });
  const [cash, setCash] = useState(true);
  const history = useHistory();
  useEffect(() => {
    const cartProducts = products.filter((product) => product.units !== 0);
    setAddedToCart(cartProducts);
  }, [products]);
  //   const handleAddToCart = (product) => {
  //     setProducts([...products, product]);
  //   };
  const calculateTotal = (products) => {
    return products.reduce(
      (total, product) => total + product.units * product.price,
      0
    );
  };
  const [unitId, setUnitId] = useState("");
  const [product, setProduct] = useState("");
  const [successfull, setSuccessfull] = useState(false);
  const [cc, setCc] = useState(false);
  const [theOrder, setTheOrder] = useState([]);
  const handleAddUnit = (product) => {
    console.log(product._id);
    setProduct({ ...product, units: product.units++ });
    // const findProduct = products.filter((product) => product._id === unitId);
    // console.log(findProduct);
  };
  const handleDecUnit = (product) => {
    console.log(product._id);
    if (product.units <= 0) return;
    setProduct({ ...product, units: product.units-- });
    // const findProduct = products.filter((product) => product._id === unitId);
    // console.log(findProduct);
  };

  const deleteUnits = (product) => {
    console.log(product);
    setProduct({ ...product, units: (product.units = 0) });
    const id = product._id;
    const updatedCart = addedToCart.filter((product) => product._id !== id);
    setAddedToCart(updatedCart);
  };
  console.log(addedToCart);
  console.log(products);
  console.log(userDetails);

  const backToHome = () => {
    history.push("/");
  };

  const order = async (e) => {
    e.preventDefault();
    await axios.post(process.env.REACT_APP_BACKEND_URL + `/order`, {
      order: addedToCart,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      address: userDetails.address,
      phone: userDetails.phone,
    });
    setSuccessfull(true);
    setCc(false);
    setCash(false);
    setTheOrder({
      order: addedToCart,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      address: userDetails.address,
      phone: userDetails.phone,
    });
  };
  const backToHomeButton = () => {
    history.push("/");
    window.location.reload();
  };

  console.log(theOrder.order);

  const drawLastOrder = () => {
    return theOrder.order.map((order, i) => {
      return (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            textAlign: "center",
            borderBottom: "1px solid black",
          }}
        >
          <h3>{order.name}</h3>
          <h3>
            {order.units}
            {"  "}
            {order.unitKind}
          </h3>
        </div>
      );
    });
  };
  return (
    <>
      <div className="headerTopCart">
        {!successfull ? (
          <div onClick={backToHome} style={{ cursor: "pointer" }}>
            דף הבית
          </div>
        ) : (
          <div></div>
        )}

        <div onClick={backToHome}>
          <img src="./logo.png" height="50px" width="140px" />
        </div>
        <div></div>
      </div>
      {addedToCart.length === 0 ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>אין מוצרים בסל</h1>
          <h2
            onClick={backToHome}
            style={{
              cursor: "pointer",
              border: "1px solid black",
              borderRadius: "10px",
              backgroundColor: "grey",
            }}
          >
            חזרה לדף הבית
          </h2>
        </div>
      ) : (
        <>
          {!successfull && (
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  marginBottom: "20px",
                  marginTop: "12vh",
                  textAlign: "center",
                }}
                className="TotalProducts"
              ></div>
              {addedToCart?.map((product, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: " 1fr 2fr 2fr 2fr 1fr",
                    marginBottom: "20px",
                    marginTop: "20px",
                    borderBottom: "1px solid gray",
                    paddingBottom: "3px",
                  }}
                  className="TotalProductsCart"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      width="40px"
                      height="40px"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <div>{product.name}</div>
                    <div> {product.price}ש"ח</div>
                  </div>
                  <div className="cartUnits">
                    <button
                      onClick={() => {
                        handleAddUnit(product);
                        setUnitId(product._id);
                      }}
                      style={{
                        borderRadius: "50%",
                        cursor: "pointer",
                        color: "black",
                        height: "22px",
                        width: "22px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "24px",
                        // fontWeight: "bold",
                        padding: "1px",
                      }}
                    >
                      +
                    </button>
                    {product.units}
                    {"  "}
                    {product.unitKind}
                    <button
                      onClick={() => {
                        handleDecUnit(product);
                        setUnitId(product._id);
                      }}
                      style={{
                        borderRadius: "50%",
                        cursor: "pointer",
                        color: "black",
                        height: "22px",
                        width: "22px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "24px",
                        // fontWeight: "bold",
                        paddingBottom: "5px",
                      }}
                    >
                      -
                    </button>
                    {/* {numberOfUnits} */}
                    {/* <input
                type="number"
                value={product.units}
                onChange={(event) => handleUnitChange(event, product.id)}
              /> */}
                  </div>
                  {/* <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {product.unitKind}
              </div> */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {product.units * product.price} ש"ח
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ cursor: "pointer" }}>
                      <FontAwesomeIcon
                        onClick={() => deleteUnits(product)}
                        icon={faTrash}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ textAlign: "center" }}>
                <h2>סה"כ: {calculateTotal(addedToCart)} ש"ח</h2>
                {!successfull && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={() => {
                        setCash(!cash);
                        setCc(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      מזומן
                    </button>
                    <button
                      onClick={() => {
                        setCc(true);
                        setCash(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      כרטיס אשראי
                    </button>
                  </div>
                )}

                <div>
                  {cash && (
                    <>
                      <form
                        style={{
                          width: "80%",
                          margin: "auto",
                          textAlign: "center",
                        }}
                      >
                        <label>
                          שם:
                          <input
                            type="text"
                            className="inputCart"
                            onChange={(e) =>
                              setUserDetails({
                                ...userDetails,
                                firstName: e.target.value,
                              })
                            }
                            required
                          />
                        </label>
                        <br />
                        <label>
                          שם משפחה:
                          <input
                            type="text"
                            className="inputCart"
                            required
                            onChange={(e) =>
                              setUserDetails({
                                ...userDetails,
                                lastName: e.target.value,
                              })
                            }
                          />
                        </label>
                        <br />
                        <label>
                          כתובת:
                          <input
                            type="text"
                            className="inputCart"
                            required
                            onChange={(e) =>
                              setUserDetails({
                                ...userDetails,
                                address: e.target.value,
                              })
                            }
                          />
                        </label>
                        <br />
                        <label>
                          טלפון:
                          <input
                            type="number"
                            className="inputCart"
                            required
                            onChange={(e) =>
                              setUserDetails({
                                ...userDetails,
                                phone: e.target.value,
                              })
                            }
                          />
                        </label>
                        <br />
                        <button
                          type="submit"
                          className="inputCartSubmit"
                          onClick={order}
                        >
                          הזמן
                        </button>
                      </form>
                    </>
                  )}

                  {cc && <>visa</>}
                </div>
              </div>
            </div>
          )}
          {successfull ? (
            <div
              style={{
                width: "100%",
                height: "100vh",
              }}
              className="backGroundAfter"
            >
              <div
                className="backgroundcover"
                style={{
                  width: "100%",
                  height: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1>הזמנה בוצעה בהצלחה</h1> <br />
                <button onClick={backToHomeButton}>חזרה לדף הבית</button>
                <div style={{ textAlign: "center" }}>
                  <h2>סה"כ: {calculateTotal(addedToCart)} ש"ח</h2>
                  <h2>ההזמנה שלי</h2>
                  <div>{drawLastOrder()}</div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
      {/* <ProductTable products={products} onAddToCart={handleAddToCart} /> */}
    </>
  );
};

export default Cart;
