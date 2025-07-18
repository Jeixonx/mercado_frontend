
async function loadProductData() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id") || "a55-5g-256gb-azul"; 

  const productCard = document.getElementById("product-card");
  const loadingState = document.getElementById("loading-state");
  const errorState = document.getElementById("error-state");

  loadingState.classList.remove("hidden"); 
  productCard.classList.add("hidden"); 
  errorState.classList.add("hidden"); 

  try {
    const [product, allProducts, allSellers] = await Promise.all([
      fetchProductById(productId),
      fetchAllProducts(),
      fetchAllSellers(),
    ]);

    const productsById = {};
    if (Array.isArray(allProducts)) {
      allProducts.forEach((p) => (productsById[p.id] = p));
    } else {
      Object.assign(productsById, allProducts); 
    }

    const sellersById = {};
    if (Array.isArray(allSellers)) {
      allSellers.forEach((s) => (sellersById[s.id] = s));
    } else {
      Object.assign(sellersById, allSellers); 
    }

    if (!product) {
      throw new Error(`Producto no encontrado para ID: ${productId}`);
    }

    const seller = sellersById[product.vendedor_id];

    renderProduct(product, seller);
    renderRelatedProducts(productsById, productId); 
    renderSellerProducts(
      productsById,
      productId,
      product.vendedor_id,
      seller ? seller.nombre : "Vendedor"
    ); 

    loadingState.classList.add("hidden");
    productCard.classList.remove("hidden");
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    loadingState.classList.add("hidden");
    errorState.classList.remove("hidden");
  }
}

document.addEventListener("DOMContentLoaded", loadProductData);
window.addEventListener("popstate", loadProductData);

