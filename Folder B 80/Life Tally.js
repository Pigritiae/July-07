function calculateDays() {
    const dataInput = document.getElementById("birthDate").value;

    if (!dataInput) {
        alert("Please insert your birth date");
        return;
    }
    const birth = new Date(dataInput);
    const today = new Date();

    birth.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffMilliseconds = today - birth;
    const daysLived = Math.floor(diffMilliseconds /  (1000 * 60 * 60 * 24));

    document.getElementById("result").innerText = `You lived approximately ${daysLived} days until today.`;
}