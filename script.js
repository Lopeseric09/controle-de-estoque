document.addEventListener('DOMContentLoaded', () => {
    const productNameInput = document.getElementById('product-name');
    const productQuantityInput = document.getElementById('product-quantity');
    const productCategoryInput = document.getElementById('product-category');
    const productExpiryInput = document.getElementById('product-expiry');
    const productLocationInput = document.getElementById('product-location');
    const addProductButton = document.getElementById('add-product');
    const stockList = document.getElementById('stock-list');
    const stockCounter = document.getElementById('stock-counter');

    
    let products = JSON.parse(localStorage.getItem('products')) || [];

    
    function saveProductsToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(products));
    }

   
    function updateStockCounter() {
        stockCounter.textContent = `Produtos no estoque: ${products.length}`;
    }

    
    function addProduct(name, quantity, category, expiry, location) {
        const product = {
            name: name,
            quantity: quantity,
            category: category,
            expiry: expiry,
            location: location,
            completed: false  
        };
        products.push(product);
        saveProductsToLocalStorage();
        renderProducts();
    }

    function renderProducts() {
        stockList.innerHTML = ''; /
        products.forEach((product, index) => {
            const productRow = document.createElement('tr');
            productRow.classList.toggle('completed', product.completed);  `completed`

            productRow.innerHTML = `
                <td>${product.name}</td>
                <td>
                    ${product.quantity.toFixed(1)} 
                    <button class="remove-quantity" data-index="${index}">-</button>
                    <button class="add-quantity" data-index="${index}">+</button>
                </td>
                <td>${product.category}</td>
                <td>${product.expiry}</td>
                <td>${product.location}</td>
                <td>
                    <button class="remove-product" data-index="${index}">Remover</button>
                    <button class="complete-task" data-index="${index}">Concluir</button>
                </td>
            `;
            stockList.appendChild(productRow);
        });
        updateStockCounter();

       
        const removeButtons = document.querySelectorAll('.remove-product');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                removeProduct(index);
            });
        });

       
        const completeButtons = document.querySelectorAll('.complete-task');
        completeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                markAsCompleted(index);
            });
        });

        
        const addQuantityButtons = document.querySelectorAll('.add-quantity');
        addQuantityButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                changeQuantity(index, 0.1); 
            });
        });

        
        const removeQuantityButtons = document.querySelectorAll('.remove-quantity');
        removeQuantityButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                changeQuantity(index, -0.1);
            });
        });
    }

    
    function removeProduct(index) {
        products.splice(index, 1); 
        saveProductsToLocalStorage();
        renderProducts();
    }

 
    function markAsCompleted(index) {
        products[index].completed = !products[index].completed;
        saveProductsToLocalStorage();
        renderProducts();
    }

       function changeQuantity(index, amount) {
        if (products[index].quantity + amount >= 0) {
            products[index].quantity += amount;
            saveProductsToLocalStorage();
            renderProducts();
        }
    }

    addProductButton.addEventListener('click', () => {
        const productName = productNameInput.value.trim();
        const productQuantity = parseFloat(productQuantityInput.value);
        const productCategory = productCategoryInput.value.trim();
        const productExpiry = productExpiryInput.value;
        const productLocation = productLocationInput.value.trim();

        if (productName && !isNaN(productQuantity) && productQuantity > 0 && productCategory && productExpiry && productLocation) {
            addProduct(productName, productQuantity, productCategory, productExpiry, productLocation);
            productNameInput.value = '';
            productQuantityInput.value = '';
            productCategoryInput.value = '';
            productExpiryInput.value = '';
            productLocationInput.value = '';
        } else {
            alert('Por favor, preencha todos os campos corretamente!');
        }
    });

    renderProducts();
});
