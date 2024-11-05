document.addEventListener('DOMContentLoaded', () => {
    const productNameInput = document.getElementById('product-name');
    const productQuantityInput = document.getElementById('product-quantity');
    const productCategoryInput = document.getElementById('product-category');
    const productExpiryInput = document.getElementById('product-expiry');
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
   
    function addProduct(name, quantity, category, expiry) {
        const product = {
            name: name,
            quantity: quantity,
            category: category,
            expiry: expiry,
        };
        products.push(product);
        saveProductsToLocalStorage();
        renderProducts();
    }
    
    function renderProducts() {
        stockList.innerHTML = '';
        products.forEach((product, index) => {
            const productItem = document.createElement('li');
            productItem.innerHTML = `
                <span class="product-name">${product.name}</span>
                <span class="product-quantity">Qtd: ${product.quantity}</span>
                <span class="product-category">[${product.category}]</span>
                <span class="product-expiry">Válido até: ${product.expiry}</span>
            `;
        
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.classList.add('remove-product');
            removeButton.addEventListener('click', (e) => {
                e.stopPropagation(); 
                products.splice(index, 1);
                saveProductsToLocalStorage();
                renderProducts();
            });

            productItem.appendChild(removeButton);
            stockList.appendChild(productItem);
        });
        updateStockCounter();
    }

    addProductButton.addEventListener('click', () => {
        const productName = productNameInput.value.trim();
        const productQuantity = productQuantityInput.value.trim();
        const productCategory = productCategoryInput.value.trim();
        const productExpiry = productExpiryInput.value.trim();

        if (productName && productQuantity && productCategory && productExpiry) {
            addProduct(productName, productQuantity, productCategory, productExpiry);
            productNameInput.value = ''; 
            productQuantityInput.value = ''; 
            productCategoryInput.value = ''; 
            productExpiryInput.value = ''; 
    });

    
    renderProducts();
});
