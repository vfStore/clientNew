import React, { useState, useEffect } from "react";
import "./productstest.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faList } from "@fortawesome/free-solid-svg-icons";

const ProductTable = ({ products, setProducts, admin }) => {
  const [customer, setCustomer] = useState(products);
  const [unitId, setUnitId] = useState("");
  const [product, setProduct] = useState("");
  const history = useHistory();
  const [addedToCartHeader, setAddedToCartHeader] = useState(0);

  const handleCartHeader = () => {
    const cartProducts = products.filter((product) => product.units !== 0);
    setAddedToCartHeader(cartProducts);
  };
  useEffect(() => {
    const cartProducts = products.filter((product) => product.units !== 0);
    setAddedToCartHeader(cartProducts);
  }, []);

  console.log(addedToCartHeader);
  const handleAddUnit = (product) => {
    console.log(product._id);
    setProduct({ ...product, units: product.units++ });
  };
  const handleDecUnit = (product) => {
    console.log(product._id);
    if (product.units <= 0) return;
    setProduct({ ...product, units: product.units-- });
  };

  const deleteUnits = (product) => {
    setProduct({ ...product, units: (product.units = 0) });
  };

  const addToCart = () => {
    history.push("/cart");
  };
  console.log(admin);
  const goToAdminPage = () => {
    history.push("/admin");
  };
  const changeStyle = () => {
    history.push("/");
  };

  async function logout() {
    try {
      const response = await fetch("/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
    //   style={{
    //     backgroundImage: `url(
    //   "https://images.pexels.com/photos/775031/pexels-photo-775031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    // )`,
    //     backgroundPosition: "center",
    //     backgroundSize: "cover",
    //     backgroundRepeat: "no-repeat",
    //   }}
    >
      <div
        onClick={addToCart}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          width: "40px",
          height: "30px",
          bottom: "130px",
          background: "white",
          right: 0,
          border: "2px solid black",
          borderRight: "none",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon icon={faCartShopping} />{" "}
          {addedToCartHeader.length === 0 ? null : (
            <div
              style={{
                position: "absolute",
                top: "-70%",
                right: "0",
                height: "20px",
                width: "20px",
                backgroundColor: "red",
                borderRadius: "50%",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {addedToCartHeader.length}
            </div>
          )}
        </div>
      </div>
      <div className="TotalAmountTop">
        <div className="headerTop">
          {admin?.user.role === "admin" ? (
            <div
              onClick={goToAdminPage}
              style={{
                cursor: "pointer",
              }}
            >
              דף מנהל
            </div>
          ) : (
            <div style={{ minWidth: "100px" }}></div>
          )}
          <div style={{ cursor: "pointer" }}>
            <img src="./logo.png" height="50px" width="140px" />
          </div>
          {admin?.user.role === "admin" ? (
            <div
              onClick={logout}
              style={{
                cursor: "pointer",
              }}
            >
              התנתק
            </div>
          ) : (
            <div
              onClick={addToCart}
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ position: "relative", width: "40px" }}>
                <FontAwesomeIcon icon={faCartShopping} />{" "}
                {addedToCartHeader.length === 0 ? null : (
                  <div
                    style={{
                      position: "absolute",
                      top: "-30%",
                      right: "0",
                      height: "20px",
                      width: "20px",
                      backgroundColor: "red",
                      borderRadius: "50%",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {addedToCartHeader.length}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="TotalAmount">
          <div colSpan="4" style={{ minWidth: "100px", textAlign: "center" }}>
            סה"כ
          </div>
          <div style={{ minWidth: "100px", textAlign: "center" }}>
            {calculateTotal(products)} ש"ח
          </div>
        </div>
      </div>
      <div
        style={{
          width: "95%",
          margin: "15vh 0 auto auto",
          marginRight: "30px",
        }}
        onClick={changeStyle}
      >
        <FontAwesomeIcon icon={faList} size="2x" />
      </div>
      <div className="productsCards" style={{ marginBottom: "5vh" }}>
        {products.map((product, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              marginBottom: "20px",
              //   marginTop: "15px",
            }}
            className="TotalProducts"
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
                width="100%"
                height="150px"
                style={{ borderRadius: "10px" }}
              />
            </div>
            <div>
              <div
                style={{
                  textAlign: "center",
                  width: "90%",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div> {product.name}</div>
                <div> {product.price} ש"ח </div>
              </div>
            </div>
            <div className="incdecTest">
              <button
                onClick={() => {
                  handleAddUnit(product);
                  setUnitId(product._id);
                  handleCartHeader();
                }}
                style={{ borderRadius: "50%", cursor: "pointer", color:"black", height:"15px", width:"15px" }}
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
                  handleCartHeader();
                }}
                style={{ borderRadius: "50%", cursor: "pointer", color:"black", height:"15px", width:"15px" }}
              >
                -
              </button>
            </div>

            <div className="totalProduct">
              {product.units * product.price} ש"ח
            </div>
            {/* <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button onClick={() => deleteUnits(product)}>איפוס</button>
            </div> */}
          </div>
        ))}
      </div>
      {/* <div className="TotalAmountBottom">
        <div colSpan="4">סה"כ</div>
        <div>{calculateTotal(products)} ש"ח</div>
     
      </div> */}
    </div>
  );
};

const calculateTotal = (products) => {
  return products.reduce(
    (total, product) => total + product.units * product.price,
    0
  );
};

const handleUnitChange = (event, productId) => {
  // Update the units of the product with the given id
};

export default ProductTable;
