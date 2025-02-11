document.getElementById("add-product-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("nombre").value.trim();
    const price = parseFloat(document.getElementById("precio").value);
    const stock = parseInt(document.getElementById("stock").value);

    if (!name || isNaN(price) || isNaN(stock)) {
        alert("Por favor completa todos los campos correctamente.");
        return;
    }

    await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, stock })
    });

    alert("Producto agregado correctamente.");
    e.target.reset();
});