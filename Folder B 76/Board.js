function lightswitchLight(id, lightswitch) {
    const light = document.getElementById(id);
    light.classList.toggle('on');
    lightswitch.classList.toggle('active');
}