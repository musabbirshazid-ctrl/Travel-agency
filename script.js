/* =========================================================
   WANDERLY TRAVEL WEBSITE
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* ================= MOBILE MENU ================= */

    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            nav.classList.toggle("open");

            const icon = menuToggle.querySelector("i");

            if (nav.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        /* Close menu when clicking a link */

        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                const icon = menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* ================= DARK MODE ================= */

    const themeToggle = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("wanderly-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        if (themeToggle) {

            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        }

    }


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            const isDark =
                document.body.classList.contains("dark");

            localStorage.setItem(
                "wanderly-theme",
                isDark ? "dark" : "light"
            );


            if (isDark) {

                themeToggle.innerHTML =
                    '<i class="fa-solid fa-sun"></i>';

            } else {

                themeToggle.innerHTML =
                    '<i class="fa-solid fa-moon"></i>';

            }

        });

    }


    /* ================= SEARCH TABS ================= */

    const searchTabs =
        document.querySelectorAll(".search-tab");

    const destinationInput =
        document.getElementById("destinationInput");


    searchTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            searchTabs.forEach(item => {

                item.classList.remove("active");

            });

            tab.classList.add("active");

            const type = tab.dataset.type;


            if (!destinationInput) return;


            if (type === "flights") {

                destinationInput.placeholder =
                    "Where do you want to fly?";

            }

            else if (type === "hotels") {

                destinationInput.placeholder =
                    "Where do you want to stay?";

            }

            else if (type === "tours") {

                destinationInput.placeholder =
                    "Where do you want to explore?";

            }

        });

    });


    /* ================= SEARCH ================= */

    const searchButton =
        document.getElementById("searchButton");

    const dateInput =
        document.getElementById("dateInput");

    const travelersInput =
        document.getElementById("travelersInput");


    if (searchButton) {

        searchButton.addEventListener("click", performSearch);

    }


    function performSearch() {

        const destination =
            destinationInput.value.trim();

        const date =
            dateInput.value;

        const travelers =
            travelersInput.value;


        if (!destination) {

            showMessage(
                "Please enter a destination.",
                "error"
            );

            destinationInput.focus();

            return;
        }


        let message =
            `Searching for ${destination}`;

        if (date) {

            message += ` on ${formatDate(date)}`;

        }

        message += ` for ${travelers} traveler`;

        if (Number(travelers) !== 1) {

            message += "s";

        }

        message += ".";


        showMessage(message, "success");

    }


    /* ================= ENTER KEY SEARCH ================= */

    if (destinationInput) {

        destinationInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                performSearch();

            }

        });

    }


    /* ================= DATE MINIMUM ================= */

    if (dateInput) {

        const today =
            new Date().toISOString().split("T")[0];

        dateInput.min = today;

    }


    /* ================= FAVORITE BUTTONS ================= */

    const favoriteButtons =
        document.querySelectorAll(".favorite-btn");


    favoriteButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.stopPropagation();

            button.classList.toggle("active");

            const icon =
                button.querySelector("i");


            if (button.classList.contains("active")) {

                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");

                showMessage(
                    "Added to your favorites.",
                    "success"
                );

            } else {

                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");

                showMessage(
                    "Removed from your favorites.",
                    "success"
                );

            }

        });

    });


    /* ================= DESTINATION CLICK ================= */

    const destinationCards =
        document.querySelectorAll(".destination-card");


    destinationCards.forEach(card => {

        card.addEventListener("click", () => {

            const destination =
                card.querySelector("h3")?.textContent.trim();


            if (!destination) return;


            if (destinationInput) {

                destinationInput.value =
                    destination;

            }


            document
                .getElementById("home")
                ?.scrollIntoView({
                    behavior: "smooth"
                });


            showMessage(
                `${destination} selected.`,
                "success"
            );

        });

    });


    /* ================= NEWSLETTER ================= */

    const newsletterForm =
        document.getElementById("newsletterForm");

    const emailInput =
        document.getElementById("emailInput");


    if (newsletterForm) {

        newsletterForm.addEventListener("submit", event => {

            event.preventDefault();


            const email =
                emailInput.value.trim();


            if (!validateEmail(email)) {

                showMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                emailInput.focus();

                return;
            }


            showMessage(
                "Thank you! You are now subscribed.",
                "success"
            );


            emailInput.value = "";

        });

    }


    /* ================= SMOOTH SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    /* ================= CURRENT YEAR ================= */

    const currentYear =
        document.getElementById("currentYear");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* ================= SCROLL HEADER ================= */

    const header =
        document.getElementById("header");


    window.addEventListener("scroll", () => {

        if (!header) return;


        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 10px 35px rgba(0,0,0,0.18)";

        } else {

            header.style.boxShadow = "none";

        }

    });


    /* ================= INTERSECTION ANIMATION ================= */

    const animatedElements =
        document.querySelectorAll(
            ".destination-card, .package-card, .feature-card, .review-card"
        );


    animatedElements.forEach(element => {

        element.classList.add("fade-up");

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    animatedElements.forEach(element => {

        observer.observe(element);

    });


    /* ================= HELPERS ================= */

    function validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }


    function formatDate(dateString) {

        const date =
            new Date(dateString + "T00:00:00");


        return date.toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        );

    }


    /* ================= NOTIFICATION ================= */

    function showMessage(message, type = "success") {

        let notification =
            document.querySelector(".notification");


        if (!notification) {

            notification =
                document.createElement("div");

            notification.className =
                "notification";


            document.body.appendChild(
                notification
            );

        }


        notification.textContent =
            message;


        notification.className =
            `notification ${type}`;


        requestAnimationFrame(() => {

            notification.classList.add(
                "show"
            );

        });


        clearTimeout(
            notification.hideTimer
        );


        notification.hideTimer =
            setTimeout(() => {

                notification.classList.remove(
                    "show"
                );

            }, 3500);

    }

});