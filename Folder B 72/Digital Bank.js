let saving = 0;

function deposit() {
    const value = parseFloat(document.getElementById("value").value);
    if (isNaN(value) || value <= 0) {
        showMessage("Invalid Deposit Value.");
        return;
    }
    saving += value;
    showMessage(`R$ ${value.toFixed(2)} deposited`);
    clearField();
}

function claim() {
    const value = parseFloat(document.getElementById("value").value);
    if (isNaN(value) || value <= 0) {
        showMessage("Invalid Claim Value.");
        return;
    }
    saving -= value;
    showMessage(`- R$ ${value.toFixed(2)} claimed`);
    clearField();
}

function showSaving() {
    showMessage(`Savings: RS ${saving.toFixed(2)}`);
}

function clear() {
    clearField();
    showMessage("");
}

function showMessage(msg) {
    document.getElementById("message").textContent = msg;
}
function clearField() {
    document.getElementById("value").value = "";
}