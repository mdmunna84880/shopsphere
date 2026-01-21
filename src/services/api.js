import axios from 'axios';


const BASE_URL = 'https://fakestoreapi.com';

// Fetching all products from https://fakestoreapi.com/products
export async function fetchAllProducts() {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
}

// Fetching a single product from https://fakestoreapi.com/products/:id
export async function fetchProductById(id) {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
}

// Fetching categories from https://fakestoreapi.com/products/categories
export async function fetchCategories(){
    const response = await axios.get(`${BASE_URL}/products/categories`);
    return response.data;
}

// Fetching products by categories from https://fakestoreapi.com/products/category/:category
export async function fetchProductsByCategory(category) {
    const response = await axios.get(`${BASE_URL}/products/category/${category}`);
    return response.data;
}

// Imitate login action at https://fakestoreapi.com/auth/login
export async function loginUser(credentials) {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    return response.data;
}

// Imitate a registering user at https://fakestoreapi.com/auth/users
export async function registerUser(userData){
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data;
}