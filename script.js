// Book catalog data
const catalogData = [
    {
        id: 1,
        title: "Salazar, A Mocidade e os Princípios - VOL. I",
        author: "Franco Nogueira",
        genre: "politica",
        year: 2001,
        cover: "images/SalazarLivro.jpg",
        description: "Uma collecção de seis volumes da vida e obra de António Salazar.",
        price: "Grátis",
        link: "https://drive.google.com/file/d/1saebC189ifphU77GMQ1DpksqpIcMmv-c/view?usp=drive_link"
    },
    {
        id: 2,
        title: "São Camilo de Léllis, a Obra de um Sancto",
        author: "Simão Araújo",
        genre: "religiao",
        year: 2023,
        cover: "images/SCLOS.jpg",
        description: "Vida e Obra de São Camilo de Léllis, Sancto dos enfermos.",
        price: "Grátis",
        link: "https://drive.google.com/file/d/1I9RhBVck0pt045svy4NDwyj4qVk90z3B/view?usp=drive_link"
    },
    {
        id: 3,
        title: "A última páscoa de Codreanu",
        author: "Sociedade Editora Dácia",
        genre: "nacionalismo",
        year: 1988,
        cover: "images/UPC.jpg",
        description: "Última carta de Corneliu Zelea Codreanu na prisão.",
        price: "Grátis",
        link: "https://drive.google.com/file/d/1J5jO6kqVkPIWPgGKOw_e4CkSEn2vqZI6/view?usp=drive_link"
    },
    {
        id: 4,
        title: "O Integralismo Lusitano e a herança de Os Vencidos da Vida",
        author: "José Manuel Quintas",
        genre: "integralismo",
        year: 1997,
        cover: "images/ILHVV.jpg",
        description: "Texto escripto para a abertura das Aulas da Academia da Força Aérea portugueza.",
        price: "Grátis",
        link: "https://drive.google.com/file/d/1FTWbspLZCn-zedVZwpAHuHZZUcWE1Zaj/view?usp=drive_link"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const booksGrid = document.getElementById('booksGrid');
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    let currentBooks = [...catalogData];

    // Render books function
    function renderBooks(books) {
        if (booksGrid) {
            booksGrid.innerHTML = books.map(book => `
                <div class="book-card" data-id="${book.id}">
                    <div class="book-image">
                        <img src="${book.cover}" alt="${book.title}">
                    </div>
                    <div class="book-info">
                        <h3>${book.title}</h3>
                        <p class="author">${book.author}</p>
                        <p class="genre">${book.genre}</p>
                        <p class="price">${book.price}</p>
                        <div class="book-actions">
                            <a href="${book.link}" target="_blank" class="buy-btn">Ver</a>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Initial render
    renderBooks(currentBooks);

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredBooks = catalogData.filter(book => 
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm)
            );
            currentBooks = filteredBooks;
            applyFilters();
        });
    }

    // Genre filter
    if (genreFilter) {
        genreFilter.addEventListener('change', applyFilters);
    }
    
    // Sort filter
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }

    function applyFilters() {
        let filteredBooks = [...currentBooks];

        // Apply genre filter
        if (genreFilter && genreFilter.value !== 'all') {
            filteredBooks = filteredBooks.filter(book => 
                book.genre.toLowerCase() === genreFilter.value.toLowerCase()
            );
        }

        // Apply sort
        if (sortFilter) {
            switch(sortFilter.value) {
                case 'az':
                    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'za':
                    filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
                    break;
                case 'recent':
                    filteredBooks.sort((a, b) => b.year - a.year);
                    break;
            }
        }

        renderBooks(filteredBooks);
    }

    // Book details modal
    window.showBookDetails = (bookId) => {
        const book = catalogData.find(b => b.id === bookId);
        if (book) {
            alert(`${book.title}\n${book.description}\nAutor: ${book.author}\nGénero: ${book.genre}`);
        }
    };

    // Add hover animations
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.book-card')) {
            e.target.closest('.book-card').style.transform = 'translateY(-10px)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.book-card')) {
            e.target.closest('.book-card').style.transform = 'translateY(0)';
        }
    });
});

// Language translation functionality
const translateBtn = document.getElementById('translate-btn');
const modal = document.getElementById('language-modal');

if (translateBtn && modal) {
    translateBtn.addEventListener('click', () => {
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    });

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#translate-btn') && !e.target.closest('.modal-content')) {
            modal.style.display = 'none';
        }
    });

    // Handle language selection
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', () => {
            const selectedLanguage = option.querySelector('span').textContent;
            // Add your translation logic here
            console.log(`Selected language: ${selectedLanguage}`);
            modal.style.display = 'none';
        });
    });
}

const translations = {
    "Portuguez": {
        "inicio": "Início",
        "catalogo": "Catálogo",
        "sobre": "Sobre",
        "hero_title": "Historias que Atravessam Seculos",
        "hero_subtitle": "Descubra nossa collecção de obras litterarias extraordinarias",
        "destaques": "Destaques do Mez",
        "saiba_mais": "Saiba Mais",
        "navegacao": "Navegação",
        "contactos": "Contactos",
        "redes_sociais": "Redes Sociaes",
        "copyright": "© 2025 Património Editorial. Todos os direictos reservados.",
        "ler_carta": "Ler A Carta",
        "carta_desc": "A Carta para o futuro de Portugal",
        "about_title": "Sobre - Património Editorial",
        "nossa_historia": "Nossa História",
        "nossa_missao": "Nossa Missão",
        "missao_desc": "Preservar a boa litteratura e promover o património litterario portuguez por meios digitaes.",
        "nossos_valores": "Nossos Valores",
        "valor_tradicao": "Tradição",
        "tradicao_desc": "Mantemos vivos os conhecimentos litterarios portuguezes.",
        "valor_qualidade": "Qualidade",
        "qualidade_desc": "Primamos pela excelência em nossas postagens.",
        "valor_religiao": "Religião",
        "religiao_desc": "Promovemos a mensagem da Sancta Madre Egreja em nossa editora.",
        "nossa_equipa": "Nossa Equipa",
        "director_editorial": "Director Editorial",
        "catalog_title": "Catálogo - Património Editorial",
        "nosso_catalogo": "Nosso Catálogo",
        "catalogo_desc": "Explore nossa collecção de obras clássicas e contemporâneas",
        "pesquisar_placeholder": "Pesquisar livros...",
        "todos_generos": "Todos os Géneros",
        "genero_politica": "Politica",
        "genero_religiao": "Religião",
        "genero_nacionalismo": "Nacionalismo",
        "genero_integralismo": "Integralismo",
        "sort_az": "A-Z",
        "sort_za": "Z-A",
        "sort_recent": "Mais Recente",
        "iconographia": "Iconographia",
        "iconographia_desc": "Nossa revista dedicada ao Catholicismo Dark",
        "ler_agora": "Ler Agora",
        "iconographia": "Iconographia",
        "iconographia_desc": "Nossa revista dedicada ao Catholicismo Dark",
        "edition_1_title": "Edição I - 21 de Janeiro de 2024",
        "edition_1_desc": "O Protestantismo",
        "edition_2_title": "Edição II - 3 de Fevereiro de 2024",
        "edition_2_desc": "São João Crisóstomo",
        "edition_3_title": "Edição III - 9 de Fevereiro de 2024",
        "edition_3_desc": "São Carlo Acutis",
        "edition_4_title": "Edição IV - 18 de Fevereiro de 2024",
        "edition_4_desc": "Os Coptas",
        "edition_5_title": "Edição V - 3 de Março de 2024",
        "edition_5_desc": "Nossa Senhora de Fátima e as aparições",
        "edition_6_title": "Edição VI - 17 de Março de 2024",
        "edition_6_desc": "Os catholicos etiopes",
        "edition_7_title": "Edição VII - 30 de Março de 2024",
        "edition_7_desc": "Cristianismo na Arménia",
        "edition_8_title": "Edição VIII - 28 de Abril de 2024",
        "edition_8_desc": "São Jorge da Capadócia",
        "edition_9_title": "Edição IX - 29 de Agosto de 2024",
        "edition_9_desc": "Guerra Civil Espanhola",
        "read_now": "Ler Agora",
        "nosso_catalogo": "Nosso Catálogo",
        "catalogo_desc": "Explore nossa collecção de obras clássicas e contemporâneas"
    },
    "English": {
        "inicio": "Home",
        "catalogo": "Catalog",
        "sobre": "About",
        "hero_title": "Stories that Cross Centuries",
        "hero_subtitle": "Discover our collection of extraordinary literary works",
        "destaques": "Monthly Highlights",
        "saiba_mais": "Learn More",
        "navegacao": "Navigation",
        "contactos": "Contacts",
        "redes_sociais": "Social Media",
        "copyright": "© 2025 Património Editorial. All rights reserved.",
        "ler_carta": "Read The Letter",
        "carta_desc": "The Letter for Portugal's future",
        "about_title": "About - Património Editorial",
        "nossa_historia": "Our History",
        "nossa_missao": "Our Mission",
        "missao_desc": "To preserve good literature and promote Portuguese literary heritage through digital means.",
        "nossos_valores": "Our Values",
        "valor_tradicao": "Tradition",
        "tradicao_desc": "We keep Portuguese literary knowledge alive.",
        "valor_qualidade": "Quality",
        "qualidade_desc": "We strive for excellence in our publications.",
        "valor_religiao": "Religion",
        "religiao_desc": "We promote the message of the Holy Mother Church in our publishing house.",
        "nossa_equipa": "Our Team",
        "director_editorial": "Editorial Director",
        "catalog_title": "Catalog - Património Editorial",
        "nosso_catalogo": "Our Catalog",
        "catalogo_desc": "Explore our collection of classic and contemporary works",
        "pesquisar_placeholder": "Search books...",
        "todos_generos": "All Genres",
        "genero_politica": "Politics",
        "genero_religiao": "Religion",
        "genero_nacionalismo": "Nationalism",
        "genero_integralismo": "Integralism",
        "sort_az": "A-Z",
        "sort_za": "Z-A",
        "sort_recent": "Most Recent",
        "iconographia": "Iconographia",
        "iconographia_desc": "Our magazine dedicated to Dark Catholicism",
        "ler_agora": "Read Now",
        "iconographia": "Iconographia",
        "iconographia_desc": "Our magazine dedicated to Dark Catholicism",
        "edition_1_title": "Edition I - January 21, 2024",
        "edition_1_desc": "Protestantism",
        "edition_2_title": "Edition II - February 3, 2024",
        "edition_2_desc": "Saint John Chrysostom",
        "edition_3_title": "Edition III - February 9, 2024",
        "edition_3_desc": "Saint Carlo Acutis",
        "edition_4_title": "Edition IV - February 18, 2024",
        "edition_4_desc": "The Copts",
        "edition_5_title": "Edition V - March 3, 2024",
        "edition_5_desc": "Our Lady of Fatima and the apparitions",
        "edition_6_title": "Edition VI - March 17, 2024",
        "edition_6_desc": "The Ethiopian Catholics",
        "edition_7_title": "Edition VII - March 30, 2024",
        "edition_7_desc": "Christianity in Armenia",
        "edition_8_title": "Edition VIII - April 28, 2024",
        "edition_8_desc": "Saint George of Cappadocia",
        "edition_9_title": "Edition IX - August 29, 2024",
        "edition_9_desc": "Spanish Civil War",
        "read_now": "Read Now",
        "nosso_catalogo": "Our Catalog",
        "catalogo_desc": "Explore our collection of classic and contemporary works"
    },
    "Français": {
        "inicio": "Accueil",
        "catalogo": "Catalogue",
        "sobre": "À propos",
        "hero_title": "Des Histoires qui Traversent les Siècles",
        "hero_subtitle": "Découvrez notre collection d'œuvres littéraires extraordinaires",
        "destaques": "À la une du Mois",
        "saiba_mais": "En savoir plus",
        "navegacao": "Navigation",
        "contactos": "Contacts",
        "redes_sociais": "Réseaux Sociaux",
        "copyright": "© 2025 Património Editorial. Tous droits réservés.",
        "ler_carta": "Lire La Lettre",
        "carta_desc": "La Lettre pour l'avenir du Portugal",
        "about_title": "À propos - Património Editorial",
        "nossa_historia": "Notre Histoire",
        "nossa_missao": "Notre Mission",
        "missao_desc": "Préserver la bonne littérature et promouvoir le patrimoine littéraire portugais par des moyens numériques.",
        "nossos_valores": "Nos Valeurs",
        "valor_tradicao": "Tradition",
        "tradicao_desc": "Nous maintenons vivantes les connaissances littéraires portugaises.",
        "valor_qualidade": "Qualité",
        "qualidade_desc": "Nous excellons dans nos publications.",
        "valor_religiao": "Religion",
        "religiao_desc": "Nous promouvons le message de la Sainte Mère Église dans notre maison d'édition.",
        "nossa_equipa": "Notre Équipe",
        "director_editorial": "Directeur Éditorial",
        "catalog_title": "Catalogue - Património Editorial",
        "nosso_catalogo": "Notre Catalogue",
        "catalogo_desc": "Explorez notre collection d'œuvres classiques et contemporaines",
        "pesquisar_placeholder": "Rechercher des livres...",
        "todos_generos": "Tous les Genres",
        "genero_politica": "Politique",
        "genero_religiao": "Religion",
        "genero_nacionalismo": "Nationalisme",
        "genero_integralismo": "Intégralisme",
        "sort_az": "A-Z",
        "sort_za": "Z-A",
        "sort_recent": "Plus Récent",
        "iconographia": "Iconographia",
        "iconographia_desc": "Notre magazine dédié au Catholicisme Sombre",
        "ler_agora": "Lire Maintenant",
        "iconographia": "Iconographia",
        "iconographia_desc": "Notre magazine dédié au Catholicisme Sombre",
        "edition_1_title": "Édition I - 21 Janvier 2024",
        "edition_1_desc": "Le Protestantisme",
        "edition_2_title": "Édition II - 3 Février 2024",
        "edition_2_desc": "Saint Jean Chrysostome",
        "edition_3_title": "Édition III - 9 Février 2024",
        "edition_3_desc": "Saint Carlo Acutis",
        "edition_4_title": "Édition IV - 18 Février 2024",
        "edition_4_desc": "Les Coptes",
        "edition_5_title": "Édition V - 3 Mars 2024",
        "edition_5_desc": "Notre-Dame de Fatima et les apparitions",
        "edition_6_title": "Édition VI - 17 Mars 2024",
        "edition_6_desc": "Les catholiques éthiopiens",
        "edition_7_title": "Édition VII - 30 Mars 2024",
        "edition_7_desc": "Le Christianisme en Arménie",
        "edition_8_title": "Édition VIII - 28 Avril 2024",
        "edition_8_desc": "Saint Georges de Cappadoce",
        "edition_9_title": "Édition IX - 29 Août 2024",
        "edition_9_desc": "Guerre Civile Espagnole",
        "read_now": "Lire Maintenant",
        "nosso_catalogo": "Notre Catalogue",
        "catalogo_desc": "Explorez notre collection d'œuvres classiques et contemporaines"
    },
    "Castellano": {
        "inicio": "Inicio",
        "catalogo": "Catálogo",
        "sobre": "Sobre",
        "hero_title": "Historias que Atraviesan Siglos",
        "hero_subtitle": "Descubre nuestra colección de obras literarias extraordinarias",
        "destaques": "Destacados del Mes",
        "saiba_mais": "Saber Más",
        "navegacao": "Navegación",
        "contactos": "Contactos",
        "redes_sociais": "Redes Sociales",
        "copyright": "© 2025 Património Editorial. Todos los derechos reservados.",
        "ler_carta": "Leer La Carta",
        "carta_desc": "La Carta para el futuro de Portugal",
        "about_title": "Sobre - Património Editorial",
        "nossa_historia": "Nuestra Historia",
        "nossa_missao": "Nuestra Misión",
        "missao_desc": "Preservar la buena literatura y promover el patrimonio literario portugués por medios digitales.",
        "nossos_valores": "Nuestros Valores",
        "valor_tradicao": "Tradición",
        "tradicao_desc": "Mantenemos vivos los conocimientos literarios portugueses.",
        "valor_qualidade": "Calidad",
        "qualidade_desc": "Destacamos por la excelencia en nuestras publicaciones.",
        "valor_religiao": "Religión",
        "religiao_desc": "Promovemos el mensaje de la Santa Madre Iglesia en nuestra editorial.",
        "nossa_equipa": "Nuestro Equipo",
        "director_editorial": "Director Editorial",
        "catalog_title": "Catálogo - Património Editorial",
        "nosso_catalogo": "Nuestro Catálogo",
        "catalogo_desc": "Explore nuestra colección de obras clásicas y contemporáneas",
        "pesquisar_placeholder": "Buscar libros...",
        "todos_generos": "Todos los Géneros",
        "genero_politica": "Política",
        "genero_religiao": "Religión",
        "genero_nacionalismo": "Nacionalismo",
        "genero_integralismo": "Integralismo",
        "sort_az": "A-Z",
        "sort_za": "Z-A",
        "sort_recent": "Más Reciente",
        "iconographia": "Iconographia",
        "iconographia_desc": "Nuestra revista dedicada al Catolicismo Oscuro",
        "ler_agora": "Leer Ahora",
        "iconographia": "Iconographia",
        "iconographia_desc": "Nuestra revista dedicada al Catolicismo Oscuro",
        "edition_1_title": "Edición I - 21 de Enero de 2024",
        "edition_1_desc": "El Protestantismo",
        "edition_2_title": "Edición II - 3 de Febrero de 2024",
        "edition_2_desc": "San Juan Crisóstomo",
        "edition_3_title": "Edición III - 9 de Febrero de 2024",
        "edition_3_desc": "San Carlo Acutis",
        "edition_4_title": "Edición IV - 18 de Febrero de 2024",
        "edition_4_desc": "Los Coptos",
        "edition_5_title": "Edición V - 3 de Marzo de 2024",
        "edition_5_desc": "Nuestra Señora de Fátima y las apariciones",
        "edition_6_title": "Edición VI - 17 de Marzo de 2024",
        "edition_6_desc": "Los católicos etíopes",
        "edition_7_title": "Edición VII - 30 de Marzo de 2024",
        "edition_7_desc": "Cristianismo en Armenia",
        "edition_8_title": "Edición VIII - 28 de Abril de 2024",
        "edition_8_desc": "San Jorge de Capadocia",
        "edition_9_title": "Edición IX - 29 de Agosto de 2024",
        "edition_9_desc": "Guerra Civil Española",
        "read_now": "Leer Ahora",
        "nosso_catalogo": "Nuestro Catálogo",
        "catalogo_desc": "Explore nuestra colección de obras clásicas y contemporáneas"
    }
};

function updateContent(language) {
    // Navigation
    document.querySelector('a[href="index.html"]').textContent = translations[language].inicio;
    document.querySelector('a[href="catalogo.html"]').textContent = translations[language].catalogo;
    document.querySelector('a[href="sobre.html"]').textContent = translations[language].sobre;

    // Hero Section
    document.querySelector('.hero-content h1').textContent = translations[language].hero_title;
    document.querySelector('.hero-content p').textContent = translations[language].hero_subtitle;

    // Featured Books
    document.querySelector('.featured-books h2').textContent = translations[language].destaques;
    document.querySelectorAll('.book-button').forEach(button => {
        button.textContent = translations[language].saiba_mais;
    });

    // Footer
    document.querySelector('.footer-section h3').textContent = translations[language].navegacao;
    document.querySelectorAll('.footer-section h3')[2].textContent = translations[language].contactos;
    document.querySelectorAll('.footer-section h3')[3].textContent = translations[language].redes_sociais;
    document.querySelector('.copyright p').textContent = translations[language].copyright;

    // News Section
    document.querySelector('.news-content p').textContent = translations[language].carta_desc;
    document.querySelector('.carta-btn').textContent = translations[language].ler_carta;

    // Update HTML lang attribute
    document.documentElement.lang = language.toLowerCase().substring(0, 2);
}

// Add this to your existing language selection event listener
document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', () => {
        const selectedLanguage = option.querySelector('span').textContent;
        updateContent(selectedLanguage);
        modal.style.display = 'none';
    });
});

// Add this to your existing script.js
function saveLanguagePreference(language) {
    localStorage.setItem('preferredLanguage', language);
}

function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        updateContent(savedLanguage);
    }
}

// Update your existing updateContent function
function updateContent(language) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
    
    document.documentElement.lang = language.toLowerCase().substring(0, 2);
    saveLanguagePreference(language);
}

// Add this to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    loadLanguagePreference();
    // ... rest of your existing code
});

// Update your language selection handler
document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', () => {
        const selectedLanguage = option.querySelector('span').textContent;
        updateContent(selectedLanguage);
        modal.style.display = 'none';
    });
});