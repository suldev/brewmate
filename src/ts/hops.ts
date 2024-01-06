function formHops() {
    const form = document.getElementById("main-form") as HTMLElement | null;
    hiLiteSubNav("b-hb-hops");
    if(form != null) {
        form.innerHTML = "";
        var p = document.createElement("p");
        p.innerHTML = "Hops";
        form.appendChild(p);
    }
}