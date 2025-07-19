# 📱 Mercado Frontend

Este repositorio contiene el frontend de una aplicación de e-commerce de celulares, diseñado para simular la experiencia de una página de producto en plataformas como Mercado Libre. Consume datos de un backend desplegado en Railway para ofrecer información detallada de productos y vendedores.

## 🚀 Demo

El frontend de esta aplicación está desplegado y accesible en GitHub Pages:

**Demostración en vivo:** [https://jeixonx.github.io/mercado\_frontend/](https://jeixonx.github.io/mercado_frontend/)

## ✨ Características

* **Página de Detalles de Producto:** Muestra información completa sobre un celular específico.
* **Galería de Imágenes:** Visualizador de imágenes del producto con miniaturas.
* **Información Detallada del Vendedor:** Incluye nombre de la tienda oficial, reputación, cantidad de ventas y tiempo de entrega.
* **Valoraciones y Reseñas:** Muestra la calificación promedio con estrellas y el número total de opiniones.
* **Precios y Descuentos:** Soporte para precios originales y precios con descuento.
* **Especificaciones Técnicas:** Listado de características clave como pantalla, RAM, almacenamiento, cámaras, NFC y lector de huellas.
* **Productos Relacionados y del Mismo Vendedor:** Sección dinámica para explorar más productos.
* **Métodos de Pago:** Información sobre las opciones de pago disponibles, incluyendo tarjetas y efectivo.
* **Diseño Responsivo:** Adaptable a diferentes tamaños de pantalla (móvil, tablet, escritorio) gracias a Tailwind CSS.
* **Navegación Histórica:** Permite el uso de los botones de adelante/atrás del navegador para la navegación entre productos sin recargar la página completa.

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica de la página.
* **CSS3 (con Tailwind CSS):** Framework CSS para un desarrollo rápido y un diseño moderno y responsivo.
* **JavaScript (Vanilla JS):** Lógica de interacción, manipulación del DOM y consumo de APIs REST.
* **Google Fonts (Inter):** Para la tipografía principal del proyecto.
* **Font Awesome:** Biblioteca de iconos vectoriales.

## ⚙️ Backend

Este frontend **consume una API REST personalizada desarrollada por mí** y **no utiliza la API de MercadoLibre**. El backend está desplegado en Railway y su código fuente está disponible en el siguiente repositorio:

* 🔢 **Backend Desplegado:** [https://mercadobackend-production.up.railway.app](https://mercadobackend-production.up.railway.app)
* 📁 **Repositorio del Backend:** [https://github.com/Jeixonx/mercado\_backend](https://github.com/Jeixonx/mercado_backend)

Asegúrate de que el backend esté funcionando y accesible para que el frontend pueda cargar los datos correctamente.

## 🚀 Configuración y Ejecución (Desarrollo Local)

### Prerrequisitos

* Un navegador web moderno (Chrome, Firefox, Edge, Safari, etc.).
* (Opcional pero recomendado) Un servidor web local simple para evitar problemas de CORS si abres el `index.html` directamente o si necesitas simular un entorno de producción. Puedes usar Live Server en VS Code o `http-server` de Node.js.

### 📆 Clonar el Repositorio

```bash
git clone https://github.com/Jeixonx/mercado_frontend.git
cd mercado_frontend
```

### ▶️ Ejecutar la Aplicación

#### Abrir directamente el archivo:

Simplemente abre el archivo `index.html` en tu navegador web.

```bash
# Desde la carpeta 'mercado_frontend'
open index.html     # En macOS
start index.html    # En Windows
xdg-open index.html # En Linux (puede variar)
```

#### Usar un servidor local (recomendado):

Si tienes Node.js instalado, puedes usar `http-server`:

```bash
# Instalar http-server globalmente si no lo tienes
npm install -g http-server

# Desde la carpeta 'mercado_frontend'
http-server
```

Esto iniciará un servidor en [http://localhost:8080](http://localhost:8080) (o un puerto similar). Luego, navega a esa dirección en tu navegador.

##### Si usas VS Code, la extensión "Live Server" es muy conveniente:

* Instala la extensión "Live Server".
* Haz clic derecho en `index.html` en el explorador de archivos de VS Code y selecciona "Open with Live Server".

## 🗜️ Uso

* Una vez que la página esté cargada, verás los detalles de un producto por defecto.

* Puedes cambiar el producto que se muestra modificando el parámetro `id` en la URL. Por ejemplo:

  [https://jeixonx.github.io/mercado\_frontend/?id=samsung-galaxy-a34-5g](https://jeixonx.github.io/mercado_frontend/?id=samsung-galaxy-a34-5g)

* Haz clic en las miniaturas para cambiar la imagen principal.

* Explora las secciones de productos relacionados y más productos del vendedor.

* El diseño es responsivo, así que puedes redimensionar la ventana del navegador para ver cómo se adapta a diferentes dispositivos.


