    document.addEventListener("DOMContentLoaded", () => {
        const containerList = document.querySelector(".container-list");
        const searchInput = document.getElementById("search");
        const form = document.querySelector(".form");
        const nameInput = form.querySelector("input[name='name']");
        const priceInput = form.querySelector("input[name='precio']");
        const stockInput = form.querySelector("input[name='stock']");
        const submitButton = form.querySelector(".form__button");
    
        let currentProductId = null; // Guarda el ID 
    
        //Cargar productos
        async function fetchProducts(query = "") {
            let url = "http://localhost:3000/";
            if (query) url += `search/?name=${encodeURIComponent(query)}`;
    
            const res = await fetch(url);
            const products = await res.json();
            renderProducts(products);
        }
    
        //Mostrar productos en la lista
        function renderProducts(products) {
            containerList.innerHTML = "";
            products.forEach(product => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
                    <h3 class="card-title">${product.name}</h3>
                    <p class="card-stock">Stock: ${product.stock}pz</p>
                    <div>
                        <button class="card-button card-button_edit" data-id="${product._id}" data-name="${product.name}" data-price="${product.price}" data-stock="${product.stock}">
                            <i class="bi bi-pen"></i>
                        </button>
                        <span class="card-precio">$${product.price.toFixed(2)}</span>
                    </div>
                `;
                containerList.appendChild(card);
            });
    
            //clic en botón editar
            document.querySelectorAll(".card-button_edit").forEach(button => {
                button.addEventListener("click", () => {
                    const id = button.dataset.id;
                    const name = button.dataset.name;
                    const price = button.dataset.price;
                    const stock = button.dataset.stock;
    
                    currentProductId = id;
                    nameInput.value = name;
                    priceInput.value = price;
                    stockInput.value = stock;
                });
            });
        }
    
        // funcion Buscar productos
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.trim();
            fetchProducts(query);
        });
    
        //Editar producto y enviar al formuario
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (!currentProductId) {
                alert("Selecciona un producto para editar.");
                return;
            }
    
            const name = nameInput.value.trim();
            const price = parseFloat(priceInput.value);
            const stock = parseInt(stockInput.value);
    
            if (!name || isNaN(price) || isNaN(stock)) {
                alert("Por favor completa todos los campos correctamente.");
                return;
            }
    
            await fetch(`http://localhost:3000/${currentProductId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, price, stock })
            });
    
            alert("Producto editado correctamente.");
            form.reset();
            currentProductId = null;
            fetchProducts(); // Refresca la lista
        });
    
        // Inicial: cargar productos
        fetchProducts();
    });