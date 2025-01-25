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
        <div class="card" style="width: 18rem;">
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.description}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class= "card-text">${product.name}</p>
                <p class="card-text">${product.price} </p>
                <a href="./backoffice.html" class="btn btn-primary">Modifica</a>
            </div>
        </div>
        `;
    });
};
