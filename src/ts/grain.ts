function formGrain() {
    const form = document.getElementById("main-form") as HTMLElement | null;
    hiLiteSubNav("b-hb-grain");
    if(form != null) {
        form.innerHTML = "";
        var p = document.createElement("p");
        p.innerHTML = "Grain";
        form.appendChild(p);
    }
}