document.addEventListener('DOMContentLoaded', () => {
    const productNameInput = document.getElementById('product-name');
    const productQuantityInput = document.getElementById('product-quantity');
    const productCategoryInput = document.getElementById('product-category');
    const productExpiryInput = document.getElementById('product-expiry');
    const productLocationInput = document.getElementById('product-location');
    const addProductButton = document.getElementById('add-product');
    const stockList = document.getElementById('stock-list');
    const stockCounter = document.getElementById('stock-counter');

    // Carregar produtos do localStorage ou criar uma lista vazia
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Salvar produtos no localStorage
    function saveProductsToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Atualizar contador de produtos
    function updateStockCounter() {
        stockCounter.textContent = `Produtos no estoque: ${products.length}`;
    }

    // Função para adicionar um novo produto
    function addProduct(name, quantity, category, expiry, location) {
        const product = {
            name: name,
            quantity: quantity,
            category: category,
            expiry: expiry,
            location: location
        };
        products.push(product);
        saveProductsToLocalStorage();
        renderProducts();
    }

    // Renderizar a lista de produtos
    function renderProducts() {
        stockList.innerHTML = ''; // Limpa a lista antes de renderizar
        products.forEach((product, index) => {
            const productRow = document.createElement('tr');
            productRow.innerHTML = `
                <td>${product.name}</td>
                <td>
                    ${product.quantity}
                    <button class="remove-quantity" data-index="${index}">-</button>
                    <button class="add-quantity" data-index="${index}">+</button>
                </td>
                <td>${product.category}</td>
                <td>${product.expiry}</td>
                <td>${product.location}</td>
                <td>
                    <button class="remove-product" data-index="${index}">Remover</button>
                </td>
            `;
            stockList.appendChild(productRow);
        });
        updateStockCounter();

        // Adicionar evento para remover produto
        const removeButtons = document.querySelectorAll('.remove-product');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                removeProduct(index);
            });
        });

        // Adicionar evento para adicionar quantidade
        const addQuantityButtons = document.querySelectorAll('.add-quantity');
        addQuantityButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                changeQuantity(index, 1); // Aumenta a quantidade em 1
            });
        });

        // Adicionar evento para remover quantidade
        const removeQuantityButtons = document.querySelectorAll('.remove-quantity');
        removeQuantityButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                changeQuantity(index, -1); // Diminui a quantidade em 1
            });
        });
    }

    // Remover produto da lista
    function removeProduct(index) {
        products.splice(index, 1); // Remove o produto do array
        saveProductsToLocalStorage();
        renderProducts();
    }

    // Alterar quantidade de um produto
    function changeQuantity(index, amount) {
        if (products[index].quantity + amount >= 0) {
            products[index].quantity += amount;
            saveProductsToLocalStorage();
            renderProducts();
        }
    }

    // Adicionar produto ao clicar no botão
    addProductButton.addEventListener('click', () => {
        const productName = productNameInput.value.trim();
        const productQuantity = parseInt(productQuantityInput.value); // Garantir que é um número inteiro
        const productCategory = productCategoryInput.value.trim();
        const productExpiry = productExpiryInput.value;
        const productLocation = productLocationInput.value.trim();

        // Validação para garantir que todos os campos foram preenchidos corretamente
        if (

