socket.on('products', (data) => {
    //console.log(data);
    const containerProducts = document.getElementById('container')
    containerProducts.innerHTML = ``
    data.forEach(e => {
        const card = document.createElement('div')
        card.innerHTML = `<p>${e._id}</p>
                                    <p>${e.title}</p>
                                    <p>${e.description}</p>
                                    <p>${e.code}</p>
                                    <p>$${e.price}</p>
                                    <p>${e.category}</p>
                                    <p>${e.status}</p>
                                    <p>${e.stock}<</p>
                                    <p>
                                      <img style="height: 18px;" src="${e.thumbnail}" alt="${e.title}">
                                    </p>
                                      <button type="button" class="btn btn-danger btn-sm btnDelete" data-id="${e._id}">Delete</button>
                              `
        containerProducts.appendChild(card)

        // Adjuntar eventos a los botones de eliminación
        document.querySelectorAll('.btnDelete').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                deleteProduct(id);
            });
        });
    });

    // Función para emitir la eliminación de productos
    const deleteProduct = (id) => {
        socket.emit('deleteProduct', id);
    };

    // // Manejo del formulario de productos
    // form.addEventListener('submit', (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(form);
    //     const product = Object.fromEntries(formData);
    //     product.price = parseFloat(product.price);
    //     product.stock = parseInt(product.stock, 10);
    //     console.log('Form data:', product);
    //     addProduct(product);
    //     form.reset(); // Opcional: resetear el formulario después de enviar
    // });

    // Función para emitir la adición de productos
    const addProduct = async (products) => {
        try {
            const response = await fetch('http://localhost:8080/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(products)
            });

            if (response.ok) {
                alert('product added successfully');
                socket.emit('addProduct', products);
            } else {
                alert('Error adding product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    document.addEventListener('DOMContentLoaded', function () {
        let currentPage = 1;
        const perPage = 10; // Número de productos por página

        function fetchPage(page) {
            fetch(`/api/products?page=${page}&limit=${perPage}`)
                .then(response => response.json())
                .then(data => {
                    renderProducts(data.products);
                    updatePagination(data);
                });
        }

        function updatePagination(data) {
            document.getElementById('prevPage').disabled = !data.hasPrevPage;
            document.getElementById('nextPage').disabled = !data.hasNextPage;
            document.querySelector('.pagination span').textContent = `Page ${data.currentPage} of ${data.totalPages}`;
        }

        document.getElementById('prevPage').addEventListener('click', function () {
            if (currentPage > 1) {
                currentPage--;
                fetchPage(currentPage);
            }
        });

        document.getElementById('nextPage').addEventListener('click', function () {
            if (currentPage < totalPages) {
                currentPage++;
                fetchPage(currentPage);
            }
        });

        // Inicializar la primera página
        fetchPage(currentPage);
    });
})