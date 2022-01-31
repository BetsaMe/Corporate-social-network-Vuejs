import axios from 'axios';


axios.defaults.baseURL= "http://localhost:3000/";

// axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(sessionStorage.getItem("userInfo")).token;