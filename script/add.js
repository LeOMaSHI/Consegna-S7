document.addEventListener("DOMContentLoaded", () => {
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
            this.price = parseFloat(price); //non me lo legge (??)
        }
    }

    addProduct.addEventListener("click", (event) => {
        event.preventDefault();
        if (validateInputs()) {
            tryPost();
        }
    });

    function validateInputs() {
        if (!name.value || !brand.value || !price.value || !imageUrl.value || !description.value) {
            alert("Compila tutti i campi prima di continuare.");
            return false;
        }
        if (isNaN(price.value) || parseFloat(price.value) <= 0) {
            alert("Inserisci un prezzo valido.");
            return false;
        }
        return true;
    }

    async function tryPost() {
        let newProduct = new ProductItem(name.value, description.value, brand.value, imageUrl.value, price.value);

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: authorization,
            },
            body: JSON.stringify(newProduct),
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error("Errore dettagliato:", errorDetails);
                throw new Error("Errore nell'aggiunta del prodotto. " + (errorDetails.message || ""));
            } else {
                alert("Prodotto inserito con successo!");
                location.href = "home.html"; //perche ho messo index??????
                clearInputs();
            }
        } catch (error) {
            console.error("Errore:", error.message);
            alert("Operazione non riuscita: " + error.message);
        }
    }

    function clearInputs() {
        name.value = "";
        brand.value = "";
        price.value = "";
        imageUrl.value = "";
        description.value = "";
    }
});
