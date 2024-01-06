function formBill() {
    const form = document.getElementById("main-form") as HTMLElement | null;
    hiLiteSubNav("b-hb-bill");
    if(form != null) {
        form.innerHTML = "";
        var p = document.createElement("p");
        p.innerHTML = "Bill";
        form.appendChild(p);
    }
}