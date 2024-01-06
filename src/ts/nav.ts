function renderHomeSubNav() {
    document.title = "Slowcat Labs"
    const subNav = refreshSubNav();
    if(subNav != null) {
        subNav.innerHTML = "";
        formBlank();
    }
}

function renderBrewmateSubNav() {
    document.title = "Slowcat Labs - Brewmate"
    const subNav = refreshSubNav();
    if(subNav != null) {
        const ids: string[] = ["b-hb-recipe", "b-hb-grain", "b-hb-hops", "b-hb-yeast", "b-hb-bill"];
        const values: string[] = ["RECIPE", "GRAIN", "HOPS", "YEAST", "BILL"];
        const clicks: string[] = ["formRecipe()", "formGrain()", "formHops()", "formYeast()", "formBill()"];
        for(var i = 0; i < ids.length; i++) {
            var button = document.createElement("input");
            button.setAttribute("type", "button");
            button.setAttribute("class", "sub-nav-button");
            button.setAttribute("id", ids[i]);
            button.setAttribute("value", values[i]);
            button.setAttribute("onclick", clicks[i]);
            subNav.appendChild(button);
        }
    }
}

function refreshSubNav(): HTMLElement | null {
    const subNav = document.getElementById("sub-nav") as HTMLElement | null;
    if(subNav != null) {
        subNav.innerHTML = "";
    }
    return subNav;
}

function formBlank() {
    const form = document.getElementById("main-form") as HTMLElement | null;
    if(form != null) {
        form.innerHTML = "";
    }
}

function hiLiteSubNav(id: string) {
    const subNav = document.getElementById("sub-nav") as HTMLElement | null;
    if(subNav != null) {
        subNav.childNodes.forEach(element => {
            (element as HTMLElement).style.backgroundColor = "transparent";
        });
        const btn = document.getElementById(id) as HTMLElement | null;
        if(btn != null) {
            btn.style.backgroundColor = "lightslategray";
        }
    }
}