type SLHTMLTable = HTMLTableElement | null;

function initializeForm() {
    console.log("bork!");
    grainTableNewRow();
}

function logit(textBox: HTMLInputElement) {
    console.log("hello!");
    var table: SLHTMLTable = document.querySelector("#grainTable");
    if(table != null) {
        console.log(textBox.value);
    }
}

function grainTableNewRow() {
    var table: SLHTMLTable = document.querySelector("#grainTable");
    if(table === null) return;
    // Check and update current row
    var preRowIndex: number = table.rows.length - 1;
    if(preRowIndex > 0) {
        var grainComboBox = table.rows[preRowIndex].cells[0].children[0] as HTMLSelectElement;
        if(grainComboBox.value === "none") return;
        grainComboBox.options[0].remove();
        var typeComboBox = table.rows[preRowIndex].cells[1].children[0] as HTMLSelectElement;
        typeComboBox.options[0].remove();
        typeComboBox.disabled = false;
        var weightComboBox = table.rows[preRowIndex].cells[2].children[0] as HTMLInputElement;
        weightComboBox.value = "0";
        weightComboBox.disabled = false;
    }
    // Begin creating new row
    var row = document.createElement('tr')
    // Define grain cell
    var grainCell = document.createElement('td');
    var grainComboBox = document.createElement('select');
    grainComboBox.name = "grainComboBox";
    grainComboBox.className = "comboBox";
    grainComboBox.onchange = function(){ grainTableNewRow() };
    for(var i = 0; i < grainNames.length; i++) {
        var grainOption = document.createElement('option');
        grainOption.value = grainValues[i];
        grainOption.innerHTML = grainNames[i];
        grainComboBox.appendChild(grainOption);
    }
    grainCell.appendChild(grainComboBox);
    row.appendChild(grainCell);
    // Define type cell
    var typeCell = document.createElement('td');
    var typeComboBox = document.createElement('select');
    typeComboBox.className = "comboBox";
    for(var i = 0; i < typeNames.length; i++) {
        var typeOption = document.createElement('option');
        typeOption.value = typeValues[i];
        typeOption.innerHTML = typeNames[i];
        typeComboBox.appendChild(typeOption);
    }
    typeComboBox.disabled = true;
    typeCell.appendChild(typeComboBox);
    row.appendChild(typeCell);
    // Define weight cell
    var weightCell = document.createElement('td');
    var weightTextBox = document.createElement('input');
    weightTextBox.type = "number";
    weightTextBox.className = "checkBox"
    weightTextBox.disabled = true;
    weightTextBox.onchange = function(){logit(this as HTMLInputElement)};
    weightCell.appendChild(weightTextBox);
    row.appendChild(weightCell);
    table.appendChild(row);
}

initializeForm();