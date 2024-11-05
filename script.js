document.addEventListener('DOMContentLoaded', () => {
    const productNameInput = document.getElementById('product-name');
    const productQuantityInput = document.getElementById('product-quantity');
    const productPriceInput = document.getElementById('product-price');
    const productCategoryInput = document.getElementById('product-category');
    const productExpiryInput = document.getElementById('product-expiry');
    const productLocationInput = document.getElementById('product-location');
    const addProductButton = document.getElementById('add-product');
    const stockList = document.getElementById('stock-list');
    const stockCounter = document.getElementById('stock-counter');
    const totalValueElement = document.getElementById('total-value');

    // Carrega os produtos do localStorage ou inicia com um array vazio
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Função para salvar os produtos no localStorage
    function saveProductsToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Função para atualizar o contador de produtos no estoque
    function updateStockCounter() {
        const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
        stockCounter.textContent = `Produtos no estoque: ${totalQuantity}`;
        updateTotalValue();
    }

    // Função para calcular e exibir o valor total do estoque
    function updateTotalValue() {
        let totalValue = 0;
        products.forEach(product => {
            totalValue += product.quantity * product.price;
        });
        totalValueElement.textContent = `Valor Total em Estoque: R$ ${totalValue.toFixed(2)}`;
    }

    // Função para adicionar um novo produto ao estoque
    function addProduct(name, quantity, price, category, expiry, location) {
        const product = {
            name: name,
            quantity: quantity,
            price: price,
            category: category,
            expiry: expiry,
            location: location,
        };

        // Verificar se a quantidade do produto é menor que 2 e exibir o alerta
        if (quantity < 2) {
            alert(`O produto "${name}" está acabando!`);
        }

        products.push(product);
        saveProductsToLocalStorage();
        renderProducts();
    }

    // Função para renderizar os produtos no estoque
    function renderProducts() {
        stockList.innerHTML = ''; // Limpa a tabela antes de renderizar
        products.forEach((product, index) => {
            const productRow = document.createElement('tr');

            const totalValue = (product.quantity * product.price).toFixed(2);

            productRow.innerHTML = `
                <td>${product.name}</td>
                <td>
                    ${product.quantity}
                    <button class="remove-quantity" data-index="${index}">-</button>
                    <button class="add-quantity" data-index="${index}">+</button>
                </td>
                <td>R$ ${totalValue}</td>
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

        // Adiciona o evento de remoção de produto para cada botão "Remover"
        const removeButtons = document.querySelectorAll('.remove-product');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                removeProduct(index);
            });
        });

        // Adiciona evento para adicionar quantidade de um produto
        const addQuantityButtons = document.querySelectorAll('.add-quantity');
        addQuantityButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                changeQuantity(index, 1); // Aumenta a quantidade em 1
            });
        });

        // Adiciona evento para remover quantidade de um produto
        const removeQuantityButtons = document.querySelectorAll('.remove-quantity');
        removeQuantityButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                changeQuantity(index, -1); // Diminui a quantidade em 1
            });
        });
    }

    // Função para remover um produto
    function removeProduct(index) {
        products.splice(index, 1); // Remove o produto da lista
        saveProductsToLocalStorage();
        renderProducts();
    }

    // Função para alterar a quantidade de um produto
    function changeQuantity(index, amount) {
        const product = products[index];
        if (product.quantity + amount >= 0) {
            product.quantity += amount;
            saveProductsToLocalStorage();
            renderProducts();
            
            // Exibe alerta se a quantidade do produto for menor que 1
            if (product.quantity < 2) {
                alert(`O produto "${product.name}" está acabando!`);
            }
        }
    }

    // Adiciona um novo produto ao clicar no botão "Adicionar Produto"
    addProductButton.addEventListener('click', () => {
        const productName = productNameInput.value.trim();
        const productQuantity = parseInt(productQuantityInput.value); // Garantir que seja um número inteiro
        const productPrice = parseFloat(productPriceInput.value);
        const productCategory = productCategoryInput.value.trim();
        const productExpiry = productExpiryInput.value;
        const productLocation = productLocationInput.value.trim();

        if (productName && !isNaN(productQuantity) && productQuantity > 0 && !isNaN(productPrice) && productPrice > 0 && productCategory && productExpiry && productLocation) {
            addProduct(productName, productQuantity, productPrice, productCategory, productExpiry, productLocation);
            productNameInput.value = '';
            productQuantityInput.value = '';
            productPriceInput.value = '';
            productCategoryInput.value = '';
            productExpiryInput.value = '';
            productLocationInput.value = '';
        } else {
            alert('Por favor, preencha todos os campos corretamente!');
        }
    });

    // Renderiza os produtos quando a página for carregada
    renderProducts();
});








