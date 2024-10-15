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
    loadActiveLang();
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
        lang = localize.getLang();
    const html = document.querySelector("html");
    html.setAttribute("lang", lang);
    html.setAttribute("dir", (lang == "en") ? "ltr" : "rtl");
    // elements
    document.querySelectorAll("[data-text]").forEach(element => {
        element.innerHTML = localize.l(element.getAttribute("data-text"));
    });
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

function loadActiveLang() {
    const currentLang = localize.getLang();
    const langs       = document.querySelectorAll('input[name="lang"]');
    langs.forEach(element => {
        if(element.id == currentLang)
            element.setAttribute("checked", "checked");
        element.addEventListener("change", async () => await setLang(element.id));
    });
}

function loadEvents() {
    const headerList = document.querySelector(".header-list");
    const headerListHandler = (e) => {
        Globals.isHeaderListShown = !Globals.isHeaderListShown;
        document.querySelector(".header-links").className = (Globals.isHeaderListShown) ? "header-links show" : "header-links hide";
    }
    headerList.addEventListener("click", headerListHandler);
}

async function setLang(lang) {
    localize.setLang(lang);
    await loadLang();
}

loadApp();