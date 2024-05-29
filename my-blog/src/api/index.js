import axios from "axios";

const api = axios.create({baseURL: "http://localhost/laravel8/laravel8/public/api/"})

export {api};