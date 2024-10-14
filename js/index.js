import "./styles";

window.Globals = {
    isHeaderListShown: false
};

// TODO: position fixed and absolute for header on mobile
// followed by flex column for footer
// followed by first section of landing and dashboard screenshot
// followed by features list
const headerList = document.querySelector(".header-list");
const headerListHandler = (e) => {
    Globals.isHeaderListShown = !Globals.isHeaderListShown;
    document.querySelector(".header-links").className = (Globals.isHeaderListShown) ? "header-links show" : "header-links hide";
}

headerList.addEventListener("click", headerListHandler);