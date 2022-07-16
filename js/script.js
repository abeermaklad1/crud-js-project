
//localStorage.setItem("userName", "Abeer"); 

var productNameInput = document.getElementById("productNameInput");
var nameAlert = document.getElementById("nameAlert");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById("productDescriptionInput");
var mainBtn = document.getElementById("mainBtn");

// var productsContainer = [];   لو عملت ريفريش للمتفح اللي في ال أري هيفضي بس اللي جوا لوكل استورج موجود، بس لما ينزل تحت للوكل هيتفضي لإن ال أري فضيت
var productsContainer;
if (localStorage.getItem("myProducts") == null) {
    productsContainer = [];
}
else {
    productsContainer = JSON.parse(localStorage.getItem("myProducts"));
    displayProducts();
}

function addProduct() {

    if(validateProductName() == true)
    {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescriptionInput.value
        }
    
        productsContainer.push(product);
        localStorage.setItem("myProducts", JSON.stringify(productsContainer));
        clearForm();
        displayProducts();
        console.log(productsContainer);
    }
    

}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";

}

function displayProducts() {
    var cartoona = ""
    for (var i = 0; i < productsContainer.length; i++) {
        cartoona += `<tr>
        <td>`+ i + `</td>
        <td>`+ productsContainer[i].name + `</td>
        <td>`+ productsContainer[i].price + `</td>
        <td>`+ productsContainer[i].category + `</td>
        <td>`+ productsContainer[i].desc + `</td>
        <td> <button onClick="changeFormForUpdate(`+ i + `)" class="btn btn-outline-warning">update</button></td>
        <td> <button onClick="deleteProduct(`+ i + `)" class="btn btn-outline-danger">delete</button></td>
    </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}

function deleteProduct(productIndex) {
    productsContainer.splice(productIndex, 1);
    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    displayProducts();
}

function searchProduct(searchTerm) {
    cartoona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
            //console.log("exsist")
            cartoona += `<tr>
        <td>`+ i + `</td>
        <td>`+ productsContainer[i].name + `</td>
        <td>`+ productsContainer[i].price + `</td>
        <td>`+ productsContainer[i].category + `</td>
        <td>`+ productsContainer[i].desc + `</td>
        <td> <button class="btn btn-outline-warning">update</button></td>
        <td> <button onClick="deleteProduct(`+ i + `)" class="btn btn-outline-danger">delete</button></td>
    </tr>`;
        }
        else {
            //console.log("not exsist")
        }
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}

function changeFormForUpdate(productIndex) {
    productNameInput.value = productsContainer[productIndex].name;
    productPriceInput.value = productsContainer[productIndex].price;
    productCategoryInput.value = productsContainer[productIndex].category;
    productDescriptionInput.value = productsContainer[productIndex].desc;

    mainBtn.innerHTML = "update";

    productsContainer.push(product);
    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    clearForm();
    displayProducts();
}



//Validation
function validateProductName(){
    var regex = /^[A-Z][a-z]{3,8}$/;
    if(regex.test(productNameInput.value) == true)
    {
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        nameAlert.classList.remove("d-block", "d-none");
        return true;
    }
    else
    {
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        nameAlert.classList.remove("d-none", "d-block");
        return false;
    }
}
productNameInput.addEventListener("keyup", validateProductName);