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
            <div class="card shadow-lg border-0 rounded-4 px-0" style="width: 18rem; overflow: hidden;">
                <div class="position-relative">
                    <img src="${product.imageUrl}" class="card-img-top rounded-top-4" alt="${product.description}" style="height: 200px; object-fit: cover;">
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title fw-bold text- mb-2">${product.name}</h5>
                    <p class="card-text text-secondary mb-4">
                        <strong>Brand:</strong> ${product.brand}
                    </p>
                    <p class="card-text text-muted mb-3">${product.description}</p>
                    <div class="text-center">
                        <span class="h5 text-success fw-bold">${product.price}€</span>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-around align-items-center bg-light rounded-bottom-4 py-3">
                    <button class="btn btn-outline-dark btn-sm">
                        Modifica
                    </button>
                    <button class="btn btn-outline-danger btn-sm" id="delt-${product._id}">
                        Elimina
                    </button>
                </div>
            </div>
        `;
        //DA RICORDARE: non potevo abilitare l'addEventListener perche' era FUORI da sto printData (quest'ultimo non creava il bottone,come tutto il resto, appena la pagina si avviava)

        const deleteButton = document.getElementById(`delt-${product._id}`);
        deleteButton.addEventListener("click", () => {
            fetch(`${url}${product._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorization,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Resource deleted successfully:", data);
                    loadProducts();
                })
                .catch((error) => {
                    console.error("Error during DELETE request:", error);
                });
        });
    });
};
