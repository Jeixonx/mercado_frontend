function renderProduct(product, seller) {

  document.title = product.titulo;
  document.getElementById("product-title").textContent = product.titulo;
  document.getElementById("product-description").textContent =
  product.descripcion;

document.getElementById("sales-info").textContent =
  seller?.ventas_concretadas ? `${seller.ventas_concretadas} vendidos` : "";

  document.getElementById("product-rating").textContent = product.valoracion;
  document.getElementById(
    "product-reviews"
  ).textContent = `(${product.total_reviews} opiniones)`;

  const ratingStarsContainer = document.getElementById("rating-stars");
  ratingStarsContainer.innerHTML = "";
  const fullStars = Math.floor(product.valoracion);
  const hasHalfStar = product.valoracion % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    const star = document.createElement("i");
    star.className = "fas fa-star";
    ratingStarsContainer.appendChild(star);
  }
  if (hasHalfStar) {
    const halfStar = document.createElement("i");
    halfStar.className = "fas fa-star-half-alt";
    ratingStarsContainer.appendChild(halfStar);
  }

  for (let i = ratingStarsContainer.children.length; i < 5; i++) {
    const emptyStar = document.createElement("i");
    emptyStar.className = "far fa-star"; 
    ratingStarsContainer.appendChild(emptyStar);
  }

  const price = new Intl.NumberFormat("es-UY").format(product.precio);
  document.getElementById(
    "product-price"
  ).textContent = `${product.moneda} ${price}`;
  const oldPriceEl = document.getElementById("old-price");
  const discountEl = document.getElementById("price-discount");
  if (product.precio_anterior && product.precio_anterior > product.precio) {
    oldPriceEl.textContent = `${product.moneda} ${new Intl.NumberFormat(
      "es-UY"
    ).format(product.precio_anterior)}`;
    const discount = Math.round(
      ((product.precio_anterior - product.precio) / product.precio_anterior) *
        100
    );
    discountEl.textContent = `${discount}% OFF`;
    [oldPriceEl, discountEl].forEach((el) => el.classList.remove("hidden"));
  } else {
    [oldPriceEl, discountEl].forEach((el) => el.classList.add("hidden"));
  }
  const installmentPrice = new Intl.NumberFormat("es-UY", {
    style: "currency",
    currency: "USD",
  }).format(product.precio / 12);
  document.getElementById(
    "installments"
  ).textContent = `${installmentPrice.replace("USD", "U$S")} sin interés`;

  document.getElementById("shipping-info").textContent = product.envio_gratis
    ? "Envío gratis"
    : "Calcular costo";
  document.getElementById("stock-available").textContent = product.stock;

  const officialStoreEl = document.getElementById("official-store");
const isOfficialStore = seller?.tienda_oficial;

officialStoreEl.classList.toggle("hidden", !isOfficialStore);
officialStoreEl.classList.toggle("flex", isOfficialStore);

document.getElementById("store-name").textContent = 
  isOfficialStore ? `Tienda oficial de ${seller.nombre}` : "";

  const sellerDetailsBox = document.getElementById("seller-details-box");
  const sellerCoverImageContainer = document.getElementById(
    "seller-cover-image-container"
  );
  const sellerCoverImage = document.getElementById("seller-cover-image");
  const sellerDetailsImage = document.getElementById("seller-details-image"); // Large profile image
  const sellerDetailsName = document.getElementById("seller-details-name");
  const sellerDetailsProductsCount = document.getElementById(
    "seller-details-products-count"
  );
  const sellerDetailsSalesCountBottom = document.getElementById(
    "seller-details-sales-count-bottom"
  );
  const reputationBar = document.getElementById("reputation-bar");
  const attentionIcon = document.getElementById("attention-icon");
  const attentionLevelText = document.getElementById("attention-level-text");
  const deliveryIcon = document.getElementById("delivery-icon");
  const deliveryTimeText = document.getElementById("delivery-time-text");
  const viewSellerProductsBtn = document.getElementById(
    "view-seller-products-btn"
  );

  if (seller) {
    sellerDetailsBox.classList.remove("hidden");

    if (seller.imagen_portada) {
      sellerCoverImage.src = seller.imagen_portada;
      sellerCoverImageContainer.classList.remove("hidden");
    } else {
      sellerCoverImageContainer.classList.add("hidden");
    }

    const sellerProfileAndTextContainer = sellerDetailsImage.parentElement;
    sellerProfileAndTextContainer.classList.remove(
      "flex",
      "items-start",
      "gap-3"
    );
    sellerProfileAndTextContainer.classList.add(
      "flex",
      "flex-col",
      "items-start"
    ); 

    if (seller.imagen_perfil) {
      sellerDetailsImage.src = seller.imagen_perfil;
      sellerDetailsImage.classList.remove("hidden", "object-cover");
      sellerDetailsImage.classList.add("object-contain");
    } else {
      sellerDetailsImage.classList.add("hidden");
    }
    sellerDetailsName.textContent = seller.nombre;
    document.getElementById(
      "seller-sales-text"
    ).textContent = `${seller.ventas_concretadas} ventas concretadas`;
    sellerDetailsProductsCount.textContent = `+${seller.cantidad_productos} Productos`;
    sellerDetailsSalesCountBottom.textContent = `+${seller.ventas_concretadas}`;

    reputationBar.innerHTML = ""; 
    const reputationLevels = [
      {
        level: 1,
        colorClass: "reputation-level-1",
        attention: "Brinda mala atención",
      },
      {
        level: 2,
        colorClass: "reputation-level-2",
        attention: "Brinda mala atención",
      },
      {
        level: 3,
        colorClass: "reputation-level-3",
        attention: "Brinda regular atención",
      },
      {
        level: 4,
        colorClass: "reputation-level-4",
        attention: "Brinda buena atención",
      },
      {
        level: 5,
        colorClass: "reputation-level-5",
        attention: "Brinda buena atención",
      },
    ];

    for (let i = 0; i < 5; i++) {
      const segment = document.createElement("div");
      segment.classList.add("reputation-bar-segment");
      segment.classList.add(`reputation-level-${i + 1}`);
      if (seller.reputacion && seller.reputacion.nivel === i + 1) {
        segment.classList.add("highlighted");
      }
      reputationBar.appendChild(segment);
    }

    if (seller.reputacion) {
      const currentReputationLevel =
        reputationLevels[seller.reputacion.nivel - 1];
      attentionLevelText.textContent = currentReputationLevel.attention;
      if (seller.reputacion.nivel >= 3) {
        attentionIcon.className = "fas fa-comment-dots icon-green text-xl mb-1";
      } else {
        attentionIcon.className = "fas fa-comment-dots icon-red text-xl mb-1";
      }
    }

    if (seller.reputacion && seller.reputacion.entrega_a_tiempo !== undefined) {
      if (seller.reputacion.entrega_a_tiempo) {
        deliveryTimeText.textContent = "Entrega sus productos a tiempo";
        deliveryIcon.className = "fas fa-truck icon-green text-xl mb-1";
      } else {
        deliveryTimeText.textContent = "No entrega sus productos a tiempo";
        deliveryIcon.className = "fas fa-truck icon-red text-xl mb-1";
      }
    }

    viewSellerProductsBtn.onclick = () => {
      const sellerProductsSection = document.getElementById(
        "seller-products-section"
      );
      if (sellerProductsSection) {
        sellerProductsSection.scrollIntoView({ behavior: "smooth" });
      }
    };
  } else {
    sellerDetailsBox.classList.add("hidden");
  }

  const mainImage = document.getElementById("main-image");
  const thumbnailsContainer = document.getElementById("thumbnails");
  thumbnailsContainer.innerHTML = "";
  mainImage.src = product.imagenes[0];
  product.imagenes.forEach((imgUrl, index) => {
    const thumbContainer = document.createElement("div");
    thumbContainer.className =
      "w-12 h-12 p-1 border border-gray-300 rounded-md cursor-pointer hover:border-blue-500 transition-all";
    if (index === 0) thumbContainer.classList.add("thumbnail-selected");
    thumbContainer.innerHTML = `<img src="${imgUrl}" alt="Miniatura ${
      index + 1
    }" class="w-full h-full object-contain">`;
    thumbContainer.addEventListener("click", () => {
      mainImage.src = imgUrl;
      document
        .querySelectorAll("#thumbnails > div")
        .forEach((t) => t.classList.remove("thumbnail-selected"));
      thumbContainer.classList.add("thumbnail-selected");
    });
    thumbnailsContainer.appendChild(thumbContainer);
  });

  const colorSampleImage = document.getElementById("color-sample-image");
  if (product.imagenes && product.imagenes.length > 0) {
    colorSampleImage.src = product.imagenes[0]; // Use the first image as the color sample
  } else {
    colorSampleImage.src = "https://placehold.co/48x48/cccccc/ffffff?text=N/A"; // Placeholder if no images
  }

  const featuresContainer = document.getElementById("product-features");
  featuresContainer.innerHTML = "";
  const featureKeys = Object.keys(product.caracteristicas);

  for (const key of featureKeys) {
    const value = product.caracteristicas[key];
    let featureHtml = "";
    let iconClass = "";
    let formattedValue;

    if (value === true) {
      formattedValue = "Sí";
    } else if (value === false) {
      formattedValue = "No";
    } else {
      formattedValue = value;
    }
    if (key === "pantalla") {
      iconClass = "fas fa-mobile-alt";
      const screenSizeStr = String(value).split(" ")[0];
      const screenSize = parseFloat(screenSizeStr);

      let highlightedSegment = 0;
      if (screenSize <= 4.5) {
        highlightedSegment = 1;
      } else if (screenSize < 5) {
        highlightedSegment = 2;
      } else if (screenSize < 6) {
        highlightedSegment = 3;
      } else if (screenSize < 7) {
        highlightedSegment = 4;
      } else {
        // >= 7
        highlightedSegment = 5;
      }

      featureHtml = `
                        <div class="flex items-center gap-3">
                            <i class="${iconClass} text-gray-500 text-xl"></i>
                            <div class="flex-grow">
                                <strong class="text-gray-600">Tamaño de la pantalla:</strong>
                                <span class="text-gray-500">${formattedValue}</span>
                                <div class="flex items-center mt-2">
                                    <span class="text-xs text-gray-500 mr-2">PEQUEÑO</span>
                                    <div class="flex flex-grow">
                    `;
      for (let j = 1; j <= 5; j++) {
        featureHtml += `<div class="size-bar-segment ${
          j === highlightedSegment ? "highlighted" : ""
        }"></div>`;
      }
      featureHtml += `
                                    </div>
                                    <span class="text-xs text-gray-500 ml-2">GRANDE</span>
                                </div>
                            </div>
                        </div>
                    `;
    } else {
      switch (key) {
        case "memoria_ram":
          iconClass = "fas fa-memory";
          break;
        case "almacenamiento":
          iconClass = "fas fa-hdd";
          break;
        case "camara_frontal":
          iconClass = "fas fa-camera-retro";
          break;
        case "camara_trasera":
          iconClass = "fas fa-camera";
          break;
        case "nfc":
          iconClass = "fas fa-wifi";
          break;
        case "lector_huellas":
          iconClass = "fas fa-fingerprint";
          break;
        default:
          iconClass = "fas fa-info-circle"; 
      }
      const formattedKey = key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      featureHtml = `
                        <div class="flex items-center gap-3">
                            <i class="${iconClass} text-gray-500 text-xl"></i>
                            <div>
                                <strong class="text-gray-600">${formattedKey}:</strong>
                                <span class="text-gray-500"> ${formattedValue}</span>
                            </div>
                        </div>
                    `;
    }
    featuresContainer.innerHTML += featureHtml;
  }


  const mainFeaturesList = document.getElementById("main-features-list");
  mainFeaturesList.innerHTML = ""; 
  const mainFeatureKeys = Object.keys(product.caracteristicas).slice(0, 3); 

  mainFeatureKeys.forEach((key) => {
    const value = product.caracteristicas[key];
    const formattedKey = key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    const formattedValue =
      value === true ? "Sí" : value === false ? "No" : value;
    const listItem = document.createElement("li");
    listItem.textContent = `${formattedKey}: ${formattedValue}`;
    mainFeaturesList.appendChild(listItem);
  });

  document
    .getElementById("view-all-features-link")
    .addEventListener("click", (event) => {
      event.preventDefault();
      document
        .getElementById("product-features-full")
        .scrollIntoView({ behavior: "smooth" });
    });

  const otherOptionsLink = document.getElementById("other-options-link");
  if (otherOptionsLink) {
    otherOptionsLink.textContent = `Ver 3 opciones desde ${product.moneda} ${price}`;
  }

  const paymentMethodsContent = document.getElementById(
    "payment-methods-content"
  );
  paymentMethodsContent.innerHTML = "";

  const paymentCategories = {
    "Tarjetas de crédito": [
      "Visa",
      "Mastercard",
      "American Express",
      "OCA Blue",
    ],
    "Tarjetas de débito": ["Visa Débito", "Mastercard Débito"],
    Efectivo: ["Abitab", "RedPagos"],
  };

  const paymentLogos = {
    Visa: "https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg",
    Mastercard:
      "https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg",
    "American Express":
      "https://http2.mlstatic.com/storage/logos-api-admin/b2c93a40-f3be-11eb-9984-b7076edb0bb7-m.svg",
    "OCA Blue": "https://ocablue.uy/src/img/logo-oca-blue.svg",
    "Visa Débito":
      "https://http2.mlstatic.com/storage/logos-api-admin/312238e0-571b-11e8-823a-758d95db88db-m.svg",
    "Mastercard Débito":
      "https://http2.mlstatic.com/storage/logos-api-admin/157dce60-571b-11e8-95d8-631c1a9a92a9-m.svg",
    Abitab: "https://www.abitab.com.uy/abitab/theme/img/abitab_logo.png",
    RedPagos:
      "https://http2.mlstatic.com/storage/logos-api-admin/e5ee1d00-f39b-11eb-8e0d-6f4af49bf82e-m.svg",
  };

  for (const category in paymentCategories) {
    const availableMethods = paymentCategories[category].filter((method) =>
      product.metodos_pago.includes(method)
    );

    if (availableMethods.length > 0) {
      let categoryHtml = `
                        <div class="mb-4">
                            <p class="font-semibold text-gray-800 mb-2">${category}</p>
                    `;
      if (category === "Tarjetas de crédito") {
        categoryHtml += `<p class="text-sm text-gray-600 mb-2">¡Cuotas sin interés con bancos seleccionados!</p>`;
      }
      categoryHtml += `<div class="flex gap-3 items-center">`;

      availableMethods.forEach((method) => {
        const logoSrc = paymentLogos[method];
        if (logoSrc) {
          categoryHtml += `<img src="${logoSrc}" alt="${method}" class="h-6">`;
        }
      });
      categoryHtml += `</div></div>`;
      paymentMethodsContent.innerHTML += categoryHtml;
    }
  }
}

function renderRelatedProducts(allProducts, currentProductId) {
  const relatedGrid = document.getElementById("related-products-grid");
  relatedGrid.innerHTML = "";

  const productsArray = Object.values(allProducts);
  const shuffledProducts = productsArray.sort(() => 0.5 - Math.random());

  let count = 0;
  for (const product of shuffledProducts) {
    if (product.id === currentProductId) continue; 
    if (count >= 5) break; 

    const cardLink = document.createElement("a");
    cardLink.href = `?id=${product.id}`;
    cardLink.className =
      "bg-white rounded-lg shadow-sm p-4 flex flex-col hover:shadow-xl transition-shadow duration-300 border";
    cardLink.onclick = (event) => {
      event.preventDefault(); 
      history.pushState(null, "", cardLink.href); 
      loadProductData(); 
    };

    cardLink.innerHTML = `
                    <img src="${product.imagenes[0]}" alt="${
      product.titulo
    }" class="w-full h-40 object-contain mb-4 border-b pb-4">
                    <p class="text-sm text-gray-600 flex-grow">${
                      product.titulo
                    }</p>
                    <p class="text-xl font-light text-gray-900 mt-2">${
                      product.moneda
                    } ${new Intl.NumberFormat("es-UY").format(
      product.precio
    )}</p>
                `;
    relatedGrid.appendChild(cardLink);
    count++;
  }
  document
    .getElementById("related-products-section")
    .classList.remove("hidden");
}

function renderSellerProducts(
  allProducts,
  currentProductId,
  currentSellerId,
  sellerName
) {
  const sellerProductsSection = document.getElementById(
    "seller-products-section"
  );
  const sellerProductsTitle = document.getElementById("seller-products-title");
  const sellerProductsGrid = document.getElementById("seller-products-grid");
  sellerProductsGrid.innerHTML = "";

  const productsBySeller = Object.values(allProducts).filter(
    (product) =>
      product.vendedor_id === currentSellerId && product.id !== currentProductId
  );

  if (productsBySeller.length > 0) {
    sellerProductsTitle.textContent = `Más productos de ${sellerName}`;
    productsBySeller.slice(0, 5).forEach((product) => {
      // Limit to 5 seller products
      const cardLink = document.createElement("a");
      cardLink.href = `?id=${product.id}`;
      cardLink.className =
        "bg-white rounded-lg shadow-sm p-4 flex flex-col hover:shadow-xl transition-shadow duration-300 border";
      cardLink.onclick = (event) => {
        event.preventDefault(); 
        history.pushState(null, "", cardLink.href); 
        loadProductData(); 
      };

      cardLink.innerHTML = `
                        <img src="${product.imagenes[0]}" alt="${
        product.titulo
      }" class="w-full h-40 object-contain mb-4 border-b pb-4">
                        <p class="text-sm text-gray-600 flex-grow">${
                          product.titulo
                        }</p>
                        <p class="text-xl font-light text-gray-900 mt-2">${
                          product.moneda
                        } ${new Intl.NumberFormat("es-UY").format(
        product.precio
      )}</p>
                    `;
      sellerProductsGrid.appendChild(cardLink);
    });
    sellerProductsSection.classList.remove("hidden");
  } else {
    sellerProductsSection.classList.add("hidden");
  }
}
