function fetchProductById(productId) {
  return fetch(`http://localhost:8080/producto/${productId}`).then((res) =>
    res.json()
  );
}

function fetchAllProducts() {
  return fetch("http://localhost:8080/producto/listAll").then((res) =>
    res.json()
  );
}

function fetchSellerById(sellerId) {
  return fetch(`http://localhost:8080/vendedor/${sellerId}`).then((res) =>
    res.json()
  );
}

function fetchAllSellers() {
  return fetch("http://localhost:8080/vendedor/listAll").then((res) =>
    res.json()
  );
}