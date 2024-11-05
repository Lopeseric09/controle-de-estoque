document.addEventListener('DOMContentLoaded', () => {
    const productNameInput = document.getElementById('product-name');
    const productQuantityInput = document.getElementById('product-quantity');
    const productCategoryInput = document.getElementById('product-category');
    const productExpiryInput = document.getElementById('product-expiry');
    const addProductButton = document.getElementById('add-product');
    const stockList = document.getElementById('stock-list');
    const stockCounter = document.getElementById('stock-counter');

    let products = JSON.parse(localStorage.getItem('products')) || []; // Carrega os produtos do localStorage

    // Função para salvar os produtos no localStorage
    function saveProductsToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Função para atualizar o contador de produtos no estoque
    function updateStockCounter() {
        stockCounter.textContent = `Produtos no estoque: ${products.length}`;
    }

    // Função para adicionar um novo produto ao estoque
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

    // Função para renderizar os produtos no estoque
    function renderProducts() {
        stockList.innerHTML = '';
        products.forEach((product, index) => {
            const productRow = document.createElement('tr');
            productRow.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.category}</td>
                <td>${product.expiry}</td>
                <td><button class="remove-product" onclick="removeProduct(${index})">Remover</button></td>
            `;
            stockList.appendChild(productRow);
        });
        updateStockCounter();
    }

    // Função para remover um produto do estoque
    function removeProduct(index) {
        products.splice(index, 1);
        saveProductsToLocalStorage();
        renderProducts();
    }

    // Adiciona produto ao clicar no botão
    addProductButton.addEventListener('click', () => {
        const productName = productNameInput.value.trim();
        const productQuantity = productQuantityInput.value.trim();
        const productCategory = productCategoryInput.value.trim();
        const productExpiry = productExpiryInput.value.trim();

        if (productName && productQuantity && productCategory && productExpiry) {
            addProduct(productName, productQuantity, productCategory, productExpiry);
            productNameInput.value = ''; // Limpa o campo de nome do produto
            productQuantityInput.value = ''; // Limpa o campo de quantidade
            productCategoryInput.value = ''; // Limpa o campo de categoria
            productExpiryInput.value = ''; // Limpa o campo de prazo
        }
    });

    // Renderiza os produtos ao carregar a página
    renderProducts();
});
