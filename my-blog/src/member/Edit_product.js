

import { useEffect, useState } from "react";
import { api } from "../api";
import { useParams } from "react-router-dom";

function Edit_product(props) {
    let params = useParams();
    const [getEdit_product, setEdit_product] = useState({
        name: "",
        price: "",
        category: "",
        brand: "",
        status: 1,
        company: "",
        detail: "",
        sale: 0
    });

    const [errors, setErrors] = useState({});
    const [getFile, setFile] = useState([]);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [getImg, setImg] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    

    const getStatus = [
        { id: 1, name: "New" },
        { id: 0, name: "Sale" }
    ];

    let login = localStorage.getItem("isLoggedIn");
    if (login) {
        login = JSON.parse(login);
    }

    let accessToken = login.data.token;

    let getUser = login.data.Auth.id;
    console.log("Giá trị của getUser:", getUser);


    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };

    useEffect(() => {
        api.get(`user/product/${params.id}`, config)
            .then(response => {
                setImg(response.data.data.image);
                setEdit_product({
                    name: response.data.data.name,
                    price: response.data.data.price,
                    category: response.data.data.id_category,
                    brand: response.data.data.id_brand,
                    status: response.data.data.status,
                    company: response.data.data.company_profile,
                    detail: response.data.data.detail,
                    sale: response.data.data.sale
                });
            })
            .catch(error => {
                console.error("Error data:", error);
            });

        api.get('category-brand')
            .then(response => {
                setCategory(response.data.category);
                setBrand(response.data.brand);
            })
            .catch(error => {
                console.log("Error data", error);
            });
    }, [params.id]);

    const clearErrors = () => {
        setErrors({});
    };

    const hanldeInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setEdit_product(state => ({ ...state, [nameInput]: valueInput })); 
    };

    function renderCategory() {
        return category.map((value, key) => (
            <option key={key} value={value.id}>{value.category}</option>
        ));
    }

    function renderBrand() {
        return brand.map((value, key) => (
            <option key={key} value={value.id}>{value.brand}</option>
        ));
    }

    function renderStatus() {
        return getStatus.map((value, key) => (
            <option key={key} value={value.id}>{value.name}</option>
        ));
    }

    function handleImageInputFile(e) {
        const files = e.target.files;
        setFile(files);
    }

    function checkbox(){
        if(getImg.length > 0){
            return getImg.map((value, key) =>{
                return(
                    <>
                        <img width="60px" src={"http://localhost/laravel8/laravel8/public/upload/product/" + getUser + '/' + value} alt={`${value}`}  />
                        <input name="image" type="checkbox" value={value} onClick={handleCheckboxChange}></input>
                    </>
                    
                )
            })
        }
    }

    const handleCheckboxChange = (e, value) => {
        if (e.target.checked) {
            setSelectedImages(oldArray => [...oldArray, value]);
        } else {
            setSelectedImages(oldArray => oldArray.filter(image => image !== value));
        }
    };
    
    function handleSubmit(e) {
        e.preventDefault();
        clearErrors();
        const newErrors = {};
        if (!getEdit_product.name) newErrors.name = "Vui lòng nhập Name";
        if (!getEdit_product.price) newErrors.price = "Vui lòng nhập giá tiền";
        if (!getEdit_product.category) newErrors.category = "Vui lòng chọn sản phẩm";
        if (!getEdit_product.brand) newErrors.brand = "Vui lòng chọn thương hiệu";
        if (getEdit_product.status === 0 && !getEdit_product.sale) newErrors.sale = "Vui lòng nhập giá sale";
        if (!getEdit_product.company) newErrors.company = "Vui lòng nhập tên công ty";
        if (!getEdit_product.detail) newErrors.detail = "Vui lòng nhập thông tin";
        if (selectedImages.length === 0) newErrors.avatarCheckBox = "Vui lòng chọn ít nhất một hình ảnh để xoá";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formData = new FormData();
        formData.append('name', getEdit_product.name);
        formData.append('price', getEdit_product.price);
        formData.append('category', getEdit_product.category);
        formData.append('brand', getEdit_product.brand);
        formData.append('company', getEdit_product.company);
        formData.append('detail', getEdit_product.detail);
        formData.append('status', getEdit_product.status);
        formData.append('sale', getEdit_product.sale);

        selectedImages.map((value, key) => {
            formData.append("avatarCheckBox", value);
        });

        Object.keys(getFile).map((key, index) => {
            formData.append("file[]", getFile[key]);
        });

        api.post(`user/product/update/${params.id}`, formData, config)
            .then((res) => {
                console.log(res);
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    alert("Thành công");
                }
            })
            .catch(error => {
                console.error("Error submitting form:", error);
            });
    }

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Edit Product</h2>
                            <div className="signup-form">
                                <h2>Edit Product!</h2>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <input type="text" placeholder="Name" name="name" value={getEdit_product.name} onChange={hanldeInput} />
                                    {errors.name && <p className="error">{errors.name}</p>}
                                    <input type="text" placeholder="Price" name="price" value={getEdit_product.price} onChange={hanldeInput} />
                                    {errors.price && <p className="error">{errors.price}</p>}
                                    <select name="category" value={getEdit_product.category} onChange={hanldeInput}>
                                        <option value="">Vui lòng chọn sản phẩm</option>
                                        {renderCategory()}
                                    </select>
                                    {errors.category && <p className="error">{errors.category}</p>}
                                    <select name="brand" value={getEdit_product.brand} onChange={hanldeInput}>
                                        <option value="">Vui lòng chọn thương hiệu</option>
                                        {renderBrand()}
                                    </select>
                                    {errors.brand && <p className="error">{errors.brand}</p>}
                                    <select name="status" value={getEdit_product.status} onChange={hanldeInput}>
                                        {renderStatus()}
                                    </select>
                                    {getEdit_product.status === 0 && (
                                        <input type="text" placeholder="Vui lòng nhập giá sale" name="sale" value={getEdit_product.sale} onChange={hanldeInput} />
                                    )}
                                    <input type="text" placeholder="Company profile" name="company" value={getEdit_product.company} onChange={hanldeInput} />
                                    {errors.company && <p className="error">{errors.company}</p>}
                                    <input type="file" placeholder="Image" multiple onChange={handleImageInputFile} />
                                    {checkbox()}
                                    {errors.avatarCheckBox && <p className="error">{errors.avatarCheckBox}</p>}
                                    <textarea placeholder="Detail" name="detail" value={getEdit_product.detail} onChange={hanldeInput} />
                                    {errors.detail && <p className="error">{errors.detail}</p>}
                                    <button type="submit" className="btn btn-default">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Edit_product;
