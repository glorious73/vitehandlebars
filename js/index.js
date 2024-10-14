import "./styles";

window.Globals = {
    isHeaderListShown: false
};

const headerList = document.querySelector(".header-list");
const headerListHandler = (e) => {
    Globals.isHeaderListShown = !Globals.isHeaderListShown;
    document.querySelector(".header-links").className = (Globals.isHeaderListShown) ? "header-links show" : "header-links";
}

headerList.addEventListener("click", headerListHandler);