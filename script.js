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
                <td>${product.quantity}</td>
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
    }

    // Função para remover um produto do estoque
    function removeProduct(index) {
        products.splice(index, 1); // Remove o produto pelo índice
        saveProductsToLocalStorage();
        renderProducts(); // Re-renderiza a lista de produtos
    }

    // Função para marcar o produto como concluído
    function markAsCompleted(index) {
        products[index].completed = true; // Marca o produto como concluído
        saveProductsToLocalStorage();
        renderProducts(); // Re-renderiza a lista de produtos
    }

    // Adiciona produto ao clicar no botão
    addProductButton.addEventListener('click', () => {
        const productName = productNameInput.value.trim();
        const productQuantity = productQuantityInput.value.trim();
        const productCategory = productCategoryInput.value.trim();
        const productExpiry = productExpiryInput.value.trim();
        const productLocation = productLocationInput.value.trim();

        // Verifica se todos os campos estão preenchidos
        if (productName && productQuantity && productCategory && productExpiry && productLocation) {
            addProduct(productName, productQuantity, productCategory, productExpiry, productLocation);

            // Limpa os campos de entrada
            productNameInput.value = '';
            productQuantityInput.value = '';
            productCategoryInput.value = '';
            productExpiryInput.value = '';
            productLocationInput.value = '';
        } else {
            alert('Por favor, preencha todos os campos!');
        }
    });

    // Renderiza os produtos quando a página for carregada
    renderProducts();
});
