


import { useEffect, useState } from "react";
import { api } from "../api";

function Add_product(props) {
    const [getAdd_product, setAdd_product] = useState({
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

    const getStatus = [
        {
            "id": 1,
            "name": "New",
        },
        {
            "id": 0,
            "name": "Sale",
        }
    ];

    var login = localStorage.getItem("isLoggedIn")
    if(login){
        login = JSON.parse(login)
        // console.log(login)
    }
        
    let accessToken = login.data.token
    // console.log(accessToken)

    useEffect(() => {
        api.get('category-brand')
            .then(response => {
                setCategory(response.data.category);
                setBrand(response.data.brand);
            })
             
    }, []);
        
    const clearErrors = () => {
        setErrors({});
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setAdd_product(prevState => ({ ...prevState, [name]: value }));
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
    
    function handleSubmit(e) {
        e.preventDefault();
        clearErrors();
        const newErrors = {};
        if (!getAdd_product.name) newErrors.name = "Vui lòng nhập Name";
        if (!getAdd_product.price) newErrors.price = "Vui lòng nhập giá tiền";
        if (!getAdd_product.category) newErrors.category = "Vui lòng chọn sản phẩm";
        if (!getAdd_product.brand) newErrors.brand = "Vui lòng chọn thương hiệu";
        if (getAdd_product.status === 0 && !getAdd_product.sale) newErrors.sale = "Vui lòng nhập giá sale";
        if (!getAdd_product.company) newErrors.company = "Vui lòng nhập tên công ty";
        if (!getAdd_product.detail) newErrors.detail = "Vui lòng nhập thông tin";
        if (!getFile.length === 0) newErrors.avatar = "Vui lòng chọn hình ảnh";

        
        const formData = new FormData();
        formData.append('name', getAdd_product.name);
        formData.append('price', getAdd_product.price);
        formData.append('category', getAdd_product.category);
        formData.append('brand', getAdd_product.brand);
        formData.append('company', getAdd_product.company);
        formData.append('detail', getAdd_product.detail);
        formData.append('status', getAdd_product.status);
        formData.append('sale', getAdd_product.sale);
        
        Object.keys(getFile).map((key, index) => {
            formData.append("file[]",getFile[key])
            // console.log(getFile);
        })
        
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Accept': 'application/json'
            }
        };
        
        
        api.post("user/product/add", formData, config)
            .then((res) => {
                console.log(res);
                if (res.data.errors) {
                    setErrors(res.data.errors);
                    // alert(111)
                } else {
                    alert("Thêm sản phẩm thành công");
                }
            })
            .catch(error => {
                console.error("Lỗi khi gửi yêu cầu:", error);
                alert("Có lỗi xảy ra khi thêm sản phẩm.");
            });
    }
            

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Create product</h2>
                            <div className="signup-form">
                                <h2>New Product!</h2>
                                <form onSubmit={handleSubmit} encType="multipart/form-data" action="#">
                                    <input type="text" placeholder="Name" name="name" onChange={handleInput} />
                                    {errors.name && <p className="error">{errors.name}</p>}
                                    <input type="text" placeholder="Price" name="price" onChange={handleInput} />
                                    {errors.price && <p className="error">{errors.price}</p>}
                                    <select name="category" onChange={handleInput}>
                                        <option value="">Vui lòng chọn sản phẩm</option>
                                        {renderCategory()}
                                    </select>
                                    {errors.category && <p className="error">{errors.category}</p>}
                                    <select name="brand" onChange={handleInput}>
                                        <option value="">Vui lòng chọn thương hiệu</option>
                                        {renderBrand()}
                                    </select>
                                    {errors.brand && <p className="error">{errors.brand}</p>}
                                    <select name="status" value={getAdd_product.status} onChange={handleInput}>
                                        {renderStatus()}
                                    </select>
                                    {getAdd_product.status === 0 && (
                                        <input type="text" placeholder="Vui lòng nhập giá sale" name="sale" onChange={handleInput} />
                                    )}
                                    <input type="text" placeholder="Company profile" name="company" onChange={handleInput} />
                                    {errors.company && <p className="error">{errors.company}</p>}
                                    <input type="file" id="files" placeholder="Image" multiple onChange={handleImageInputFile} />
                                    {errors.avatar && <p className="error">{errors.avatar}</p>}
                                    <textarea placeholder="Detail" name="detail" onChange={handleInput} />
                                    {errors.detail && <p className="error">{errors.detail}</p>}
                                    <button type="submit" className="btn btn-default">Add</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Add_product;
