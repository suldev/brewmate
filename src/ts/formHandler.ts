type SLHTMLTable = HTMLTableElement | null;
import { MongoGrain, getGrainAsync, getGrainNamesAsync } from "./grain";
function initializeForm() {
    console.log("bork!");
    grainTableNewRow();
    hopsTableNewRow();
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
    console.log('here');
    // Begin creating new row
    var row = document.createElement('tr')
    // Define grain cell
    var grainCell = document.createElement('td');
    var grainComboBox = document.createElement('select');
    grainComboBox.name = "grainComboBox";
    grainComboBox.className = "comboBox";
    grainComboBox.onchange = function(){ grainTableNewRow() };
    var typeCell = document.createElement('td');
    var typeComboBox = document.createElement('select');
    typeComboBox.className = "comboBox";
    typeComboBox.disabled = true;
    var grains: string[] = [];
    getGrainNamesAsync().then(
        (names) => { 
            if(names != undefined) {
                grains = names; 
            }
        }
    )
    for(const grain of grains) {
        var grainOption = document.createElement('option');
        grainOption.value = grain;
        grainOption.innerHTML = grain;
        grainComboBox.appendChild(grainOption);
    }
    grains.forEach(item => {
        var typeOption = document.createElement('option');
        //typeOption.value = item.type;
        //typeOption.innerHTML = item.type;
        typeComboBox.appendChild(typeOption);
    })
    grainCell.appendChild(grainComboBox);
    row.appendChild(grainCell);
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

function hopsTableNewRow() {
    var table: SLHTMLTable = document.querySelector("#hopsTable");
    if(table === null) return;
    // Check and update current row
    var preRowIndex: number = table.rows.length - 1;
    console.log(preRowIndex);
    if(preRowIndex > 0) {
        var speciesComboBox = table.rows[preRowIndex].cells[0].children[0] as HTMLSelectElement;
        if(speciesComboBox.value === "none") return;
        speciesComboBox.options[0].remove();
        var typeComboBox = table.rows[preRowIndex].cells[1].children[0] as HTMLSelectElement;
        typeComboBox.options[0].remove();
        typeComboBox.disabled = false;
        var weightComboBox = table.rows[preRowIndex].cells[2].children[0] as HTMLInputElement;
        weightComboBox.value = "0";
        weightComboBox.disabled = false;
        var timeTextBox = table.rows[preRowIndex].cells[3].children[0] as HTMLInputElement;
        weightComboBox.value = "0";
        timeTextBox.disabled = false;
    }
    // Begin creating new row
    var row = document.createElement('tr')
    // Define grain cell
    var speciesCell = document.createElement('td');
    var speciesComboBox = document.createElement('select');
    speciesComboBox.name = "speciesComboBox";
    speciesComboBox.className = "comboBox";
    speciesComboBox.onchange = function(){ hopsTableNewRow() };
    /*for(var i = 0; i < grainNames.length; i++) {
        var speciesOption = document.createElement('option');
        speciesOption.value = grainValues[i];
        speciesOption.innerHTML = grainNames[i];
        speciesComboBox.appendChild(speciesOption);
    }*/
    speciesCell.appendChild(speciesComboBox);
    row.appendChild(speciesCell);
    // Define type cell
    var typeCell = document.createElement('td');
    var typeComboBox = document.createElement('select');
    typeComboBox.className = "comboBox";
    /*for(var i = 0; i < typeNames.length; i++) {
        var typeOption = document.createElement('option');
        typeOption.value = typeValues[i];
        typeOption.innerHTML = typeNames[i];
        typeComboBox.appendChild(typeOption);
    }*/
    typeComboBox.disabled = true;
    typeCell.appendChild(typeComboBox);
    row.appendChild(typeCell);
    // Define weight cell
    var weightCell = document.createElement('td');
    var weightTextBox = document.createElement('input');
    weightTextBox.type = "text";
    weightTextBox.className = "checkBox"
    weightTextBox.disabled = true;
    weightCell.appendChild(weightTextBox);
    row.appendChild(weightCell);
    // Define time cell
    var timeCell = document.createElement('td');
    var timeTextBox = document.createElement('input');
    timeTextBox.type = "text";
    timeTextBox.className = "checkBox"
    timeTextBox.disabled = true;
    timeCell.appendChild(timeTextBox);
    row.appendChild(timeCell);
    table.appendChild(row);
}

initializeForm();