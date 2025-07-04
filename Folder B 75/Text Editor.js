function format(command) {
    document.execCommand(command, false, null);
}

function saveText() {
    const content = document.getElementById("editor").innerHTML;
    localStorage.setItem("textSaved", content);
    alert("Text Saved Successfully");
}

function loadText() {
    const content = localStorage.getItem("textSaved");
    if (content) {
        document.getElementById("editor").innerHTML = content;
    } else {
        alert("No Saved Text Found");
    }
}

function clearText() {
    if (confirm("Do you Wish to Clear Content?")) {
        document.getElementById("editor").innerHTML = "";
    }
}