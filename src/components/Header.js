import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "@mui/material/Badge";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { deleteFromcart } from "../redux/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [totalRS, setTotalRS] = useState(0);
  // console.log("Total price of CArt is :- " + totalRS);

  // getting data from store
  const state = useSelector((state) => state.cartReducer.cart);
  // console.log(state);

  const dispatch = useDispatch();

  // for total price showing
  const totalAmount = () => {
    let totalPrice = 0;
    state.map((currentElement, index) => {
      totalPrice += currentElement.price * currentElement.quantity;
    });
    setTotalRS(totalPrice);
  };

  useEffect(() => {
    totalAmount();
  }, [totalAmount]);

  // for open menu in cart icons
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //tostify msg used
  const showtoast = () => {
    // toast("Its Toasted Working");//default toast
    toast.success("Product Deleted Successfully..",{
      autoClose: 2000,
    }); //succes toast for Successfull message
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink to="/" className="text-decoration-none">
            <Navbar.Brand>Navbar</Navbar.Brand>
          </NavLink>
          <Nav className="me-auto text-decoration-none text-light">
            <NavLink to="/" className="text-light text-decoration-none">
              Home
            </NavLink>
          </Nav>
          <Nav className="msn-auto">
            <Badge
              className="BadgeCart"
              badgeContent={state.length}
              color="secondary"
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <FaShoppingCart className="text-light" />
            </Badge>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              {state.length > 0 ? (
                <div className="cart_wrapper">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th style={{ width: "20px" }}>#</th>
                        <th
                          colSpan="2"
                          className="text-center text-decoration-underline"
                        >
                          Product List
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.map((currentElement, index) => {
                        const { id, img, p_name, price, quantity } =
                          currentElement;
                        return (
                          <tr key={id}>
                            <td>{index + 1}</td>
                            <td>
                              <NavLink to={`/cart/${id}`} onClick={handleClose}>
                                <span>
                                  <img
                                    src={img}
                                    className="cartPopoverModelImg"
                                  />
                                </span>
                              </NavLink>
                            </td>
                            <td>
                              <div className="smallDataMargin">
                                <p>
                                  <strong>{p_name}</strong>
                                </p>
                                <p>
                                  RS : <strong>{price * quantity}</strong>
                                </p>
                                <p>
                                  Quantity : <strong>{quantity}</strong>
                                </p>
                                <p>
                                  <NavLink
                                    to={`/cart/${id}`}
                                    onClick={handleClose}
                                  >
                                    More info...
                                  </NavLink>
                                </p>
                                <button
                                  className="btn d-flex justify-content-center"
                                  onClick={() =>
                                    dispatch(deleteFromcart(id), showtoast())
                                  }
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <div className="me-1">
                    <p className="d-flex justify-content-center">
                      <strong> Total : {totalRS}</strong>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="cart_wrapper">
                  <div>
                    <p className="m-0">Cart is Empty</p>
                  </div>
                </div>
              )}
            </Menu>
          </Nav>
        </Container>
      </Navbar>
      {/* tostify container */}
      <ToastContainer />
    </>
  );
};

export default Header;
