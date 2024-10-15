import { localize } from './localize';
import "./styles";

window.Globals = {
    localize: localize,
    isHeaderListShown: false
};

// TODO: Multilingual content
// followed by first section of landing and dashboard screenshot
// followed by features list
// followed by pricing template
// followed by contact us
function loadApp() {
    loadLang();
    loadEvents();
}


async function loadLang() {
    let lang = '';
    const queryString = window.location.search;
    if (queryString.includes("lang")) {
        lang = loadPreferredLang(queryString);
        window.location = '/';
    }
    else
        lang = localStorage.getItem("lang") || "ar";
    const html = document.querySelector("html");
    html.setAttribute("lang", lang);
    html.setAttribute("dir", (lang == "en") ? "ltr" : "rtl");
    // elements
    document.querySelectorAll("[data-text]").forEach(element => element.insertAdjacentHTML("afterbegin", localize.l(element.getAttribute("data-text"))));
}

async function loadPreferredLang(queryString) {
    let params = queryString;
    params = "{\"" +
        params
            .replace(/\?/gi, "")
            .replace(/\&/gi, "\",\"")
            .replace(/\=/gi, "\":\"") +
        "\"}";
    params = JSON.parse(params);
    if (params.lang == "ar" || params.lang == "en") {
        await localStorage.setItem("lang", params.lang);
        return params.lang;
    }
    else
        return "ar";
}

function loadEvents() {
    const headerList = document.querySelector(".header-list");
    const headerListHandler = (e) => {
        Globals.isHeaderListShown = !Globals.isHeaderListShown;
        document.querySelector(".header-links").className = (Globals.isHeaderListShown) ? "header-links show" : "header-links hide";
    }
    headerList.addEventListener("click", headerListHandler);
}

loadApp();