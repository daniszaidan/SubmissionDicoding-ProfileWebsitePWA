loadPageContent = async page => {
    const content = document.querySelector("#body-content");
    const response = await fetch(`/pages/${page}.html`);
    const { status } = response;

    if (status === 200) {
        const data = await response.text();
        content.innerHTML = data;
    } else if (status === 404) {
        content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
    } else {
        content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
    }
}

loadNavigation = async () => {
    const response = await fetch('navigation.html');
    if (response.status !== 200) return;

    const data = await response.text();
    document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
        elm.innerHTML = data;
    });

    document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
        elm.addEventListener("click", function (event) {

            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            page = event.target.getAttribute("href").substr(1);
            loadPageContent(page);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {

    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNavigation();

    var page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPageContent(page);

});