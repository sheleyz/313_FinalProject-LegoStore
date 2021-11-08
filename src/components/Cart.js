import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {remove_from_cart} from "../redux/reducers/setActions";
import {empty_cart} from "../redux/reducers/setActions";
import {NavLink} from "react-router-dom";

function Cart() {
    let wrapperStyle = {
        minHeight: "414px",
        width: "1000px",
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "lightgrey",
        marginBottom: "70px"
    }

    let productStyle = {
        minHeight: "100px",
        width: "200px",
        margin: "20px",
        textAlign: "center"
    }

    let totalStyle = {
        position: "fixed",
        bottom: "0",
        right: "0",
        height: "50px",
        width: "100vw",
        padding: "10px",
        paddingRight: "20px",
        backgroundColor: "dodgerblue",
        color: "white",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    }

    const dispatch = useDispatch();
    const removeFromCart = (product) => {
        dispatch(remove_from_cart(product));
    }
    const emptyCart = () => {
        dispatch(empty_cart());
    }

    const cartProductEles = useSelector(state => state.cart).map((product, index) =>
        <div key={index} style={productStyle}>
            <div>
                <img src={product.image} alt={product.name} width="200px" height="200px" style={{objectFit: "cover"}}/>
            </div>
            <div style={{
                marginTop: "-4px",
                padding: "5px",
                backgroundColor: product.stock <= 10 ? "skyblue" : "orange"
            }}>
                <h3>{product.name}</h3>
                <h3>{product.stock} in stock</h3>
                <h3>${product.price}</h3>
                <button onClick={function () {
                    removeFromCart(product);
                }} style={{margin: "10px"}}>Remove from Cart
                </button>
            </div>
        </div>
    );

    const totalPrice = useSelector(state => state.cart).reduce((total, currentValue) => total + Number(currentValue.price), 0);


    const [displayPurchase, setDisplayPurchase] = React.useState("none");

    React.useEffect(() => {
        if (totalPrice !== 0) {
            setDisplayPurchase("initial");
        } else {
            setDisplayPurchase("none");
        }
    }, [totalPrice]);


    return (
        <div className="App">
            <h1>Cart</h1>
            <div className="productWrapper" style={wrapperStyle}>{cartProductEles}</div>
            <div style={totalStyle}>
                <div>Total: ${totalPrice}</div>
                <NavLink to={"/"} style={{textDecoration: "none", color: "black", display: `${displayPurchase}`}}>
                    <button onClick={function () {
                        emptyCart();
                    }} style={{margin: "10px"}}>Purchase
                    </button>
                </NavLink>
            </div>
        </div>
    );
}

export default Cart;