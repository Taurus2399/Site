
// FUNCIONALIDADE DO MODO ESCURO
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
    const currentTheme = localStorage.getItem('theme') || 'light-theme';
    document.body.classList.add(currentTheme);

    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');

        const newTheme = document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
        localStorage.setItem('theme', newTheme); // Salva o tema
    }

    themeToggle.addEventListener('click', toggleTheme);
}

// FUNCIONALIDADE DO BOTÃO "EXPLORAR"
document.addEventListener('DOMContentLoaded', function () {
    const exploreButton = document.querySelector('#explore-btn');
    const exploreMenu = document.querySelector('#explore-options');

    // Verificando se o botão e o menu estão sendo encontrados
    console.log('Explorar Button:', exploreButton);
    console.log('Explorar Menu:', exploreMenu);

    if (exploreButton && exploreMenu) {
        function toggleExploreMenu() {
            console.log('Toggling explore menu');
            exploreMenu.classList.toggle('active');
        }

        exploreButton.addEventListener('click', toggleExploreMenu);

        // Fecha o menu se o usuário clicar fora dele
        document.addEventListener('click', function (event) {
            if (!exploreButton.contains(event.target) && !exploreMenu.contains(event.target)) {
                exploreMenu.classList.remove('active');
            }
        });
    } else {
        console.error('Botão ou menu não encontrados');
    }
});



// FUNCIONALIDADE DO CATÁLOGO
let books = [];

function addBook(title, author, publisher, year, pages, language, genres, status, format, ownership) {
    if (!title || !author) {
        alert('O título e o autor são obrigatórios!');
        return;
    }

    const newBook = {
        title,
        author,
        publisher,
        year: Number(year), // Converte para número
        pages: Number(pages), // Converte para número
        language,
        genres,
        status,
        format,
        ownership
    };

    books.push(newBook);
    displayBooks();
}

function displayBooks(filteredBooks = books) {
    const bookList = document.getElementById("book-list");
    if (!bookList) return;

    bookList.innerHTML = '';

    if (filteredBooks.length === 0) {
        bookList.innerHTML = '<p>Nenhum livro cadastrado. <a href="#">Adicione um livro</a>.</p>';
        return;
    }

    filteredBooks.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <h4>${book.title}</h4>
            <p><strong>Autor:</strong> ${book.author}</p>
            <p><strong>Editora:</strong> ${book.publisher || 'Não informado'}</p>
            <p><strong>Ano:</strong> ${book.year || 'Não informado'}</p>
            <p><strong>Páginas:</strong> ${book.pages || 'Não informado'}</p>
            <p><strong>Idioma:</strong> ${book.language}</p>
            <p><strong>Gêneros:</strong> ${book.genres.length ? book.genres.join(', ') : 'Não informado'}</p>
            <p><strong>Status:</strong> ${book.status}</p>
            <p><strong>Formato:</strong> ${book.format}</p>
            <p><strong>Posse:</strong> ${book.ownership}</p>
        `;
        bookList.appendChild(bookItem);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const bookForm = document.getElementById('book-form');
    if (!bookForm) return;

    bookForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('book-title').value.trim();
        const author = document.getElementById('book-author').value.trim();
        const publisher = document.getElementById('book-publisher').value.trim();
        const year = document.getElementById('book-year').value.trim();
        const pages = document.getElementById('book-pages').value.trim();
        const language = document.getElementById('book-language').value.trim();
        const genres = Array.from(document.getElementById('book-genres').selectedOptions).map(option => option.value);
        const status = document.getElementById('book-status').value;
        const format = document.getElementById('book-format').value;
        const ownership = document.getElementById('book-ownership').value;

        addBook(title, author, publisher, year, pages, language, genres, status, format, ownership);
        bookForm.reset();
    });

    displayBooks();
});
