import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addDataTOcart,
  deleteFromcart,
  removeParticularItem,
} from "../redux/actions";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  
  const [newProductDetails, setNewProductDetails] = useState([]);

  //   usedispatch to call an actions
  const dispatch = useDispatch();

  //useNavigation hook use when delete from productDelete pages then its redirect to home page
  const history = useNavigate();

  // getting id from URL so will use useParams hooks
  const { id } = useParams();
  //   console.log("Product Id is :- " + id);

  const state = useSelector((state) => state.cartReducer.cart);

  const perticularProduct = () => {
    let getProductById = state.filter((e) => {
      return e.id == id;
    });
    setNewProductDetails(getProductById);
    // console.log("filter id :- " + JSON.stringify(getProductById));
  };

  useEffect(() => {
    perticularProduct();
  }, [id]);
  return (
    <>
      <div className="container">
        <h2 className="text-center text-decoration-underline my-2">
          Product Details Page
        </h2>
        <div className="row">
          <div className="col-sm-12">
            <Table striped bordered hover>

              {/* getting Product details by ID */}
              {newProductDetails.map((currentElement) => {
                const { id, p_name, desc, rating, img, quantity, price } =
                  currentElement;
                return (
                  <tbody key={id}>
                    <tr>
                      <th>Name</th>
                      <td>{p_name}</td>
                    </tr>
                    <tr>
                      <th>Image</th>
                      <td>
                        <img
                          src={img}
                          alt="img product"
                          className="img-fluid productDetailsImgSize"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Desc</th>
                      <td>{desc}</td>
                    </tr>
                    <tr>
                      <th>Rating</th>
                      <td>
                        {rating} <strong>✰</strong>
                      </td>
                    </tr>
                    <tr>
                      <th>Price</th>
                      <td>{price}</td>
                    </tr>
                    <tr>
                      <th>Quantity</th>
                      <td>
                        <div className="input-group mb-3 input_quantity">
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={quantity<=1?()=> dispatch(deleteFromcart(id),history("/")) :()=> dispatch(removeParticularItem(currentElement))}
                            
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="form-control text-center"
                            placeholder="1"
                            value={quantity}
                          />
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() =>
                              dispatch(addDataTOcart(currentElement))
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td>{price * quantity}</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            dispatch(deleteFromcart(id), history("/"));
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                    
                  </tbody>
                );
              })}
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
