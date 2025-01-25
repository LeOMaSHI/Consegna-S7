const url = "https://striveschool-api.herokuapp.com/api/product/";
const authorization =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTRiY2I3NDcwMTAwMTU4YjJhZTAiLCJpYXQiOjE3Mzc3MjQ5ODEsImV4cCI6MTczODkzNDU4MX0.GgF3VCdZfAcKF-Uog5E7OAvF5a_1Sj6acU4bUDzG66s";
const products = document.getElementById("productList");
let list = [];

window.addEventListener("load", function () {
    loadProducts();
});

const loadProducts = async () => {
    try {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: authorization,
            },
        });
        if (response.ok) {
            list = await response.json();
            printData();
        } else {
            throw new Error("Errore nel recupero dei prodotti.");
        }
    } catch (error) {
        console.log(error);
        products.innerHTML = `Si è verificato un errore nel caricamento dei prodotti. Riprova più tardi.`;
    }
};

const printData = () => {
    products.innerHTML = "";
    list.forEach((product) => {
        products.innerHTML += `
 <div class="card shadow-lg border-0 rounded-4" style="width: 18rem; overflow: hidden;">
    <div class="position-relative">
        <img src="${product.imageUrl}" class="card-img-top rounded-top-4" alt="${product.description}" style="height: 200px; object-fit: cover;">
    </div>
    <div class="card-body text-center">
        <h5 class="card-title fw-bold text- mb-2">${product.name}</h5>
        <p class="card-text text-muted mb-3">${product.description}</p>
        <p class="card-text text-secondary mb-4">
            <strong>Brand:</strong> ${product.brand}
        </p>
        <div class="text-center">
            <span class="h5 text-success fw-bold">${product.price}€</span>
        </div>
    </div>
    <div class="card-footer d-flex justify-content-around align-items-center bg-light rounded-bottom-4 py-3">
        <button class="btn btn-outline-dark btn-sm">
         Modifica
        </button>
        <button class="btn btn-outline-danger btn-sm">
        Elimina
        </button>
    </div>
</div>

        `;
    });
};
