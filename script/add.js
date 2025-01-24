let name = document.getElementById("name");
let brand = document.getElementById("brand");
let price = document.getElementById("cost");
let imageUrl = document.getElementById("imageUrl");
let description = document.getElementById("description");

let addProduct = document.getElementById("add");

const url = "https://striveschool-api.herokuapp.com/api/product/";
const authorization =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTRiY2I3NDcwMTAwMTU4YjJhZTAiLCJpYXQiOjE3Mzc3MjQ5ODEsImV4cCI6MTczODkzNDU4MX0.GgF3VCdZfAcKF-Uog5E7OAvF5a_1Sj6acU4bUDzG66s";

class ProductItem {
    constructor(name, description, brand, imageUrl, price) {
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.imageUrl = imageUrl;
        this.price = price;
    }
}

addProduct.addEventListener("click", function (event) {
    event.preventDefault();
    tryPost();
});

//riguarda video prof

async function tryPost() {
    let newProduct = new ProductItem(name.value, description.value, brand.value, imageUrl.value, price.value);

    const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: authorization,
        "Access-Control-Allow-Headers": "Authorization, Content-Type", // Aggiunto per supportare intestazioni personalizzate
    });

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newProduct),
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error("Errore nell'aggiunta del prodotto.");
        } else {
            await response.json();
            alert("Prodotto inserito con successo!");
            location.href = "index.html";
            name.value = "";
            brand.value = "";
            cost.value = "";
            imageUrl.value = "";
            description.value = "";
        }
    } catch (error) {
        console.error(error.message);
        alert("Operazione non riuscita");
    }
}
