const games = [

    {
        id: 1,
        title: "Shadow War",
        category: "action",
        categoryName: "اکشن",
        rating: 4.8,
        size: "850MB",
        version: "1.5",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900",
        description:
            "یک بازی اکشن هیجان‌انگیز با مراحل مختلف، دشمنان قدرتمند و محیط‌های جذاب.",
        download:
            "https://example.com/shadow-war.zip"
    },


    {
        id: 2,
        title: "Speed Racing",
        category: "racing",
        categoryName: "مسابقه‌ای",
        rating: 4.9,
        size: "620MB",
        version: "2.1",
        image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=900",
        description:
            "در مسابقات سرعت شرکت کن، ماشین خودت را انتخاب کن و رکورد بزن.",
        download:
            "https://example.com/speed-racing.zip"
    },


    {
        id: 3,
        title: "Super Football",
        category: "sports",
        categoryName: "ورزشی",
        rating: 4.7,
        size: "740MB",
        version: "3.0",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900",
        description:
            "تیم خودت را بساز و در مسابقات فوتبال برای قهرمانی مبارزه کن.",
        download:
            "https://example.com/super-football.zip"
    },


    {
        id: 4,
        title: "Mystery Island",
        category: "adventure",
        categoryName: "ماجراجویی",
        rating: 4.6,
        size: "1.2GB",
        version: "1.2",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
        description:
            "به یک جزیره مرموز سفر کن و رازهای پنهان آن را کشف کن.",
        download:
            "https://example.com/mystery-island.zip"
    },


    {
        id: 5,
        title: "Brain Master",
        category: "puzzle",
        categoryName: "فکری",
        rating: 4.5,
        size: "300MB",
        version: "1.0",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900",
        description:
            "مجموعه‌ای از معماهای جذاب و چالش‌های فکری برای تقویت ذهن.",
        download:
            "https://example.com/brain-master.zip"
    },


    {
        id: 6,
        title: "Battle Arena",
        category: "action",
        categoryName: "اکشن",
        rating: 4.8,
        size: "950MB",
        version: "4.2",
        image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=900",
        description:
            "وارد میدان نبرد شو و در برابر دشمنان مختلف مبارزه کن.",
        download:
            "https://example.com/battle-arena.zip"
    },


    {
        id: 7,
        title: "Street Driver",
        category: "racing",
        categoryName: "مسابقه‌ای",
        rating: 4.4,
        size: "560MB",
        version: "1.8",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900",
        description:
            "در خیابان‌های شهر رانندگی کن و سریع‌ترین راننده شو.",
        download:
            "https://example.com/street-driver.zip"
    },


    {
        id: 8,
        title: "Basketball 1v1",
        category: "sports",
        categoryName: "ورزشی",
        rating: 4.9,
        size: "410MB",
        version: "2.0",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900",
        description:
            "در مسابقات بسکتبال یک‌به‌یک شرکت کن و حریفت را شکست بده.",
        download:
            "https://example.com/basketball.zip"
    }

];


const gamesGrid =
    document.getElementById("gamesGrid");

const gameCount =
    document.getElementById("gameCount");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const empty =
    document.getElementById("empty");

const modal =
    document.getElementById("gameModal");

const closeModal =
    document.getElementById("closeModal");

const themeBtn =
    document.getElementById("themeBtn");

const favoriteCount =
    document.getElementById("favoriteCount");

const mobileMenu =
    document.getElementById("mobileMenu");

const menuBtn =
    document.getElementById("menuBtn");


let favorites =
    JSON.parse(
        localStorage.getItem(
            "gameboxFavorites"
        )
    ) || [];


let currentGame = null;


/* RENDER */

function renderGames(list) {

    gamesGrid.innerHTML = "";

    gameCount.textContent =
        `${list.length} بازی`;


    if (list.length === 0) {

        empty.style.display = "block";

        return;
    }


    empty.style.display = "none";


    list.forEach(game => {

        const card =
            document.createElement("article");

        card.className = "game-card";


        const liked =
            favorites.includes(game.id);


        card.innerHTML = `

            <div class="game-image">

                <img
                    src="${game.image}"
                    alt="${game.title}"
                    loading="lazy"
                >

            </div>


            <div class="game-info">

                <h3>
                    ${game.title}
                </h3>

                <p>
                    ${game.categoryName}
                </p>


                <div class="game-bottom">

                    <span class="rating">
                        ⭐ ${game.rating}
                    </span>


                    <div class="card-buttons">

                        <button
                            class="heart-btn"
                            data-heart="${game.id}">
                            ${liked ? "❤️" : "🤍"}
                        </button>


                        <button
                            class="details-btn"
                            data-id="${game.id}">
                            جزئیات
                        </button>

                    </div>

                </div>

            </div>
        `;


        gamesGrid.appendChild(card);

    });


    document
        .querySelectorAll("[data-id]")
        .forEach(button => {

            button.addEventListener(
                "click",
                function(event) {

                    event.stopPropagation();

                    const id =
                        Number(
                            this.dataset.id
                        );

                    const game =
                        games.find(
                            g => g.id === id
                        );

                    openGame(game);

                }
            );

        });


    document
        .querySelectorAll("[data-heart]")
        .forEach(button => {

            button.addEventListener(
                "click",
                function(event) {

                    event.stopPropagation();

                    toggleFavorite(
                        Number(
                            this.dataset.heart
                        )
                    );

                }
            );

        });


    document
        .querySelectorAll(".game-card")
        .forEach((card, index) => {

            card.addEventListener(
                "click",
                function() {

                    openGame(list[index]);

                }
            );

        });

}


/* OPEN GAME */

function openGame(game) {

    currentGame = game;


    document.getElementById(
        "modalImage"
    ).src = game.image;


    document.getElementById(
        "modalTitle"
    ).textContent = game.title;


    document.getElementById(
        "modalCategory"
    ).textContent =
        "🎮 " + game.categoryName;


    document.getElementById(
        "modalRating"
    ).textContent =
        "⭐ " + game.rating;


    document.getElementById(
        "modalSize"
    ).textContent =
        "📦 " + game.size;


    document.getElementById(
        "modalVersion"
    ).textContent =
        "🔢 v" + game.version;


    document.getElementById(
        "modalDescription"
    ).textContent =
        game.description;


    document.getElementById(
        "downloadBtn"
    ).href =
        game.download;


    modal.classList.add("show");

}


/* CLOSE */

closeModal.addEventListener(
    "click",
    () => {

        modal.classList.remove(
            "show"
        );

    }
);


modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {

            modal.classList.remove(
                "show"
            );

        }

    }
);


/* FAVORITES */

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                item => item !== id
            );

    } else {

        favorites.push(id);

    }


    localStorage.setItem(
        "gameboxFavorites",
        JSON.stringify(favorites)
    );


    updateFavoriteCount();


    const activeCategory =
        document.querySelector(
            ".category.active"
        );


    if (
        activeCategory &&
        activeCategory.dataset.category !== "all"
    ) {

        filterCategory(
            activeCategory.dataset.category
        );

    } else {

        renderGames(games);

    }

}


function updateFavoriteCount() {

    favoriteCount.textContent =
        favorites.length;

}


/* MODAL FAVORITE */

document
    .getElementById("favoriteModal")
    .addEventListener(
        "click",
        function() {

            if (!currentGame) return;

            toggleFavorite(
                currentGame.id
            );

        }
    );


/* SEARCH */

function searchGames() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    const result =
        games.filter(game =>

            game.title
                .toLowerCase()
                .includes(query)

            ||

            game.categoryName
                .includes(query)

        );


    renderGames(result);

}


searchInput.addEventListener(
    "input",
    searchGames
);


searchBtn.addEventListener(
    "click",
    searchGames
);


/* CATEGORY */

function filterCategory(category) {

    if (category === "all") {

        renderGames(games);

        return;

    }


    const result =
        games.filter(
            game =>
                game.category === category
        );


    renderGames(result);

}


document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(".category")
                    .forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );


                this.classList.add(
                    "active"
                );


                searchInput.value = "";


                filterCategory(
                    this.dataset.category
                );

            }
        );

    });


/* THEME */

themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "light"
        );


        const light =
            document.body.classList.contains(
                "light"
            );


        themeBtn.textContent =
            light ? "☀️" : "🌙";


        localStorage.setItem(
            "gameboxTheme",
            light ? "light" : "dark"
        );

    }
);


if (
    localStorage.getItem(
        "gameboxTheme"
    ) === "light"
) {

    document.body.classList.add(
        "light"
    );

    themeBtn.textContent = "☀️";

}


/* MOBILE MENU */

menuBtn.addEventListener(
    "click",
    function() {

        mobileMenu.classList.toggle(
            "show"
        );

    }
);


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            function() {

                mobileMenu.classList.remove(
                    "show"
                );

            }
        );

    });


/* START */

updateFavoriteCount();

renderGames(games);
