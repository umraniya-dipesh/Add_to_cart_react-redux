import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ProductsData from "./ProductsData";
import { useDispatch } from "react-redux";
import { addDataTOcart } from "../redux/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardProduct = () => {
  const [prodData, setProdData] = useState(ProductsData);
  const dispatch = useDispatch();
  //   console.log(prodData);

  //tostify msg used for Add to cart product
  const showtoast = () => {
    // toast("Its Toasted Working");//default toast
    toast.success("Product Added to cart..",{autoClose: 2000}); //succes toast for Successfull message
  };
  return (
    <>
      <div className="container">
        <h2 className="text-center text-decoration-underline my-2">
          Product List
        </h2>
        <Row>
          {prodData.map((currentElement) => {
            const { id, p_name, img, price, desc } = currentElement;
            return (
              <Col md={4} key={id}>
                <Card
                  className="mb-3"
                  style={{ width: "100%", height: "380px" }}
                >
                  <Card.Img variant="top" src={img} />
                  <Card.Body>
                    <Card.Title>{p_name}</Card.Title>
                    <Card.Text>{desc}</Card.Text>
                    <Card.Text className="my-3">RS: {price}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() =>
                        dispatch(addDataTOcart(currentElement), showtoast())
                      }
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
      <ToastContainer />
    </>
  );
};

export default CardProduct;
