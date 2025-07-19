//const API_BASE_URL = "http://localhost:8080";
const API_BASE_URL = "https://mercadobackend-production.up.railway.app";


function fetchProductById(productId) {
  return fetch(`${API_BASE_URL}/producto/${productId}`).then((res) =>
    res.json()
  );
}

function fetchAllProducts() {
  return fetch(`${API_BASE_URL}/producto/listAll`).then((res) =>
    res.json()
  );
}

function fetchSellerById(sellerId) {
  return fetch(`${API_BASE_URL}/vendedor/${sellerId}`).then((res) =>
    res.json()
  );
}

function fetchAllSellers() {
  return fetch(`${API_BASE_URL}/vendedor/listAll`).then((res) =>
    res.json()
  );
}