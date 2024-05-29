


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

function My_product(props) {
    const [products, setProducts] = useState([]); 
    const login = JSON.parse(localStorage.getItem('isLoggedIn'));
    const accessToken = login?.data.token;
    const idUser = login?.data.Auth.id;

    const navigate = useNavigate();

    const config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        api.get("user/my-product", config)
            .then(res => {
                setProducts(Object.values(res.data.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const deleteProduct = (productId) => {
        api.get(`user/product/delete/${productId}`, config)
            .then(res => {
                const updatedProducts = products.filter(product => product.id !== productId);
                setProducts(updatedProducts);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const editProduct = (productId) => {
        navigate(`/product-edit/${productId}`);
    };

    return (
        <div className="col-sm-9">
            <div className="table-responsive cart_info">
                <table className="table table-condensed">
                    <thead>
                        <tr className="cart_menu">
                            <td className="image"><strong>Image</strong></td>
                            <td className="description"><strong>Name</strong></td>
                            <td className="price"><strong>Price</strong></td>
                            <td className="quantity"><strong>Quantity</strong></td>
                            <td className="total"><strong>Total</strong></td>
                            <td className="delete"><strong>Delete</strong></td>
                            <td className="edit"><strong>Edit</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className="cart_product">
                                    {product.image && JSON.parse(product.image)[0] && (
                                        <img width="90px" src={`http://localhost/laravel8/laravel8/public/upload/product/${idUser}/${JSON.parse(product.image)[0]}`} alt="" />
                                    )}
                                </td>

                                <td className="cart_description">
                                    <h4>{product.name}</h4>
                                    <p>ID: {product.id}</p>
                                </td>
                                <td className="cart_price">
                                    <p>${product.price}</p>
                                </td>
                                <td className="cart_quantity">
                                    <div className="cart_quantity_button">
                                        <a className="cart_quantity_up" href="/"> + </a>
                                        <input className="cart_quantity_input" type="text" name="quantity" defaultValue={1} autoComplete="off" size={2} />
                                        <a className="cart_quantity_down" href="/"> - </a>
                                    </div>
                                </td>
                                <td className="cart_total">
                                    <p className="cart_total_price" />
                                </td>
                                <td className="cart_delete">
                                    <button onClick={() => deleteProduct(product.id)}>Delete</button>
                                </td>
                                <td className="cart_edit">
                                    <button onClick={() => editProduct(product.id)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr><td colSpan="7">No products found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            <button className="btn btn-default">
                <Link to={"/add_product"}>Add New</Link>
            </button>
        </div>
    );
}

export default My_product;
