function formYeast() {
    const form = document.getElementById("main-form") as HTMLElement | null;
    hiLiteSubNav("b-hb-yeast");
    if(form != null) {
        form.innerHTML = "";
        var p = document.createElement("p");
        p.innerHTML = "Yeast";
        form.appendChild(p);
    }
}