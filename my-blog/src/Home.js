

  import { useContext, useEffect, useState } from "react";
  import { Link, json } from "react-router-dom";
  import { api } from "./api";
  import { UserContext } from "./UserContext";

  function Home(props) {
    const { updateTotalQty } = useContext(UserContext);
  const [getDataHome, setDataHome] = useState([]);
  const login = JSON.parse(localStorage.getItem("isLoggedIn"));
  const userId = login?.data.Auth.id;

  useEffect(() => {
    api.get('product')
      .then(response => {
        setDataHome(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function renderBuy(e) {
    let cart = {};
    let productId = e.target.id;
    const cartPr = localStorage.getItem("cart");
    if (cartPr) {
      cart = JSON.parse(cartPr);
      if (cart[productId]) {
        cart[productId] += 1;
      } else {
        cart[productId] = 1;
      }
    } else {
      cart[productId] = 1;
    }

    let totalQty = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateTotalQty(totalQty);
  }

  function Datahome() {
    if (getDataHome.length > 0) {
      const lastIndex = getDataHome.length - 1;
      return getDataHome.slice(lastIndex - 1, lastIndex + 1).map((value, key) => {
        const getImg = JSON.parse(value.image);
        return (
          <div key={key} className="col-sm-4">
            <div className="product-image-wrapper">
              <div className="single-products">
                <div className="productinfo text-center">
                  <img src={`http://localhost/laravel8/laravel8/public/upload/product/${userId}/${getImg[0]}`} alt="" />
                  <h2>${value.price}</h2>
                  <p>{value.name}</p>
                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                </div>
                <div className="product-overlay">
                  <div className="overlay-content">
                    <h2>${value.price}</h2>
                    <p>{value.name}</p>
                    <a id={value.id} onClick={renderBuy} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                  </div>
                </div>
              </div>
              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
                  <li><Link to={`/product/detail/${value.id}`}><i className="fa fa-plus-square" />Product detail</Link></li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return null;
    }
  }
    
    

    return (
              <section>
              <div className="container">
                <div className="row">
                  <div className="col-sm-9 padding-right">
                    <div className="features_items">{/*features_items*/}
                      <h2 className="title text-center">Features Items</h2>
                      {Datahome()}
                      
                    </div>{/*features_items*/}
                    <div className="category-tab">{/*category-tab*/}
                      <div className="col-sm-12">
                        <ul className="nav nav-tabs">
                          <li className="active"><a href="#tshirt" data-toggle="tab">T-Shirt</a></li>
                          <li><a href="#blazers" data-toggle="tab">Blazers</a></li>
                          <li><a href="#sunglass" data-toggle="tab">Sunglass</a></li>
                          <li><a href="#kids" data-toggle="tab">Kids</a></li>
                          <li><a href="#poloshirt" data-toggle="tab">Polo shirt</a></li>
                        </ul>
                      </div>
                      <div className="tab-content">
                        <div className="tab-pane fade active in" id="tshirt">
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery1.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery2.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div></div>
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery3.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery4.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="blazers">
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery4.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery3.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center"><img src="images/home/gallery2.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery1.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="sunglass">
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery3.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery4.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery1.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p><a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery2.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="kids">
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery1.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery2.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery3.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div><div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery4.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="poloshirt">
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery2.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery4.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center">
                                  <img src="images/home/gallery3.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <div className="productinfo text-center"><img src="images/home/gallery1.jpg" alt="" />
                                  <h2>$56</h2>
                                  <p>Easy Polo Black Edition</p>
                                  <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>{/*/category-tab*/}
                    <div className="recommended_items">{/*recommended_items*/}
                      <h2 className="title text-center">recommended items</h2>
                      <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                          <div className="item active">	
                            <div className="col-sm-4">
                              <div className="product-image-wrapper">
                                <div className="single-products">
                                  <div className="productinfo text-center">
                                    <img src="images/home/recommend1.jpg" alt="" />
                                    <h2>$56</h2>
                                    <p>Easy Polo Black Edition</p>
                                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="product-image-wrapper">
                                <div className="single-products">
                                  <div className="productinfo text-center">
                                    <img src="images/home/recommend2.jpg" alt="" />
                                    <h2>$56</h2>
                                    <p>Easy Polo Black Edition</p>
                                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="product-image-wrapper">
                                <div className="single-products">
                                  <div className="productinfo text-center">
                                    <img src="images/home/recommend3.jpg" alt="" />
                                    <h2>$56</h2>
                                    <p>Easy Polo Black Edition</p>
                                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="item"><div className="col-sm-4">
                              <div className="product-image-wrapper">
                                <div className="single-products">
                                  <div className="productinfo text-center">
                                    <img src="images/home/recommend1.jpg" alt="" />
                                    <h2>$56</h2>
                                    <p>Easy Polo Black Edition</p>
                                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="product-image-wrapper">
                                <div className="single-products">
                                  <div className="productinfo text-center">
                                    <img src="images/home/recommend2.jpg" alt="" />
                                    <h2>$56</h2>
                                    <p>Easy Polo Black Edition</p>
                                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="product-image-wrapper">
                                <div className="single-products">
                                  <div className="productinfo text-center">
                                    <img src="images/home/recommend3.jpg" alt="" />
                                    <h2>$56</h2>
                                    <p>Easy Polo Black Edition</p>
                                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                          <i className="fa fa-angle-left" />
                        </a>
                        <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                          <i className="fa fa-angle-right" />
                        </a>			
                      </div>
                    </div>{/*/recommended_items*/}
                  </div>
                </div>
              </div>
            </section>
              
          );
  }

  export default Home;
