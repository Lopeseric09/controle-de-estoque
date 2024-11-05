document.addEventListener('DOMContentLoaded', () => {
    const productNameInput = document.getElementById('product-name');
    const productQuantityInput = document.getElementById('product-quantity');
    const productCategoryInput = document.getElementById('product-category');
    const productExpiryInput = document.getElementById('product-expiry');
    const productLocationInput = document.getElementById('product-location');
    const addProductButton = document.getElementById('add-product');
    const stockList = document.getElementById('stock-list');
    const stockCounter = document.getElementById('stock-counter');

    // Carrega os produtos do localStorage ou inicia com um array vazio
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Função para salvar os produtos no localStorage
    function saveProductsToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Função para atualizar o contador de produtos no estoque
    function updateStockCounter() {
        stockCounter.textContent = `Produtos no estoque: ${products.length}`;
    }

    // Função para adicionar um novo produto ao estoque
    function addProduct(name, quantity, category, expiry, location) {
        const product = {
            name: name,
            quantity: quantity,
            category: category,
            expiry: expiry,
            location: location,
            completed: false  // Define o status do produto como não concluído
        };
        products.push(product);
        saveProductsToLocalStorage();
        renderProducts();
    }

    // Função para renderizar os produtos no estoque
    function renderProducts() {
        stockList.innerHTML = ''; // Limpa a tabela antes de renderizar
        products.forEach((product, index) => {
            const productRow = document.createElement('tr');
            productRow.classList.toggle('completed', product.completed); // Marca como concluído se o produto tiver o status `completed`

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

        // Adiciona o evento de remoção de produto para cada botão "Remover"
        const removeButtons = document.querySelectorAll('.remove-product');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                removeProduct(index);
            });
        });

        // Adiciona o evento de marcação de tarefa como "Concluída"
        const completeButtons = document.querySelectorAll('.complete-task');
        completeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                markAsCompleted(index);
            });
        });

        // Adiciona evento para adicionar quantidade de um produto
        const addQuantityButtons = document.querySelectorAll('.add-quantity');
        addQuantityButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                changeQuantity(index, 0.1); // Aumenta a quantidade em 0.1
            });
        });

        // Adiciona evento para remover quantidade de um produto
        const removeQuantityButtons = document.querySelectorAll('.remove-quantity');
        removeQuantityButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                changeQuantity(index, -0.1); // Diminui a quantidade em 0.1
            });
        });
    }

    // Função para remover um produto
    function removeProduct(index) {
        products.splice(index, 1); // Remove o produto da lista
        saveProductsToLocalStorage();
        renderProducts();
    }

    // Função para marcar um produto como concluído
    function markAsCompleted(index) {
        products[index].completed = !products[index].completed;
        saveProductsToLocalStorage();
        renderProducts();
    }

    // Função para alterar a quantidade de um produto
    function changeQuantity(index, amount) {
        if (products[index].quantity + amount >= 0) {
            products[index].quantity += amount;
            saveProductsToLocalStorage();
            renderProducts();
        }
    }

    // Adiciona um novo produto ao clicar no botão "Adicionar Produto"
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

    // Renderiza os produtos quando a página for carregada
    renderProducts();
});


