// Element references

let modalOverlay = document.getElementById("modal"),
    closemodal = document.getElementById("close"),
    keyView = document.getElementById("keyView"),
    copyView = document.getElementById("copyView"),
    copyUrl = document.getElementById("copyURL"),
    qrv = document.getElementById("qrView"),
    qr = document.getElementById("qr"),
    s = document.getElementById("share"),
    sqr = document.getElementById("showQR"),
    sk = document.getElementById("showKey");
    locationModal = document.getElementById("locationView");
    showLocation = document.getElementById("showLocation");

// Toggle modal visibility
function toggleModal(overlay) {
    if (overlay.style.visibility == "hidden") {
        overlay.style.visibility = "visible";
       overlay.style.opacity = 1;
    } else {
        overlay.style.opacity = 0;
        setTimeout(() => {
            overlay.style.visibility = "hidden";
        }, 200);
    }
}

// Hide element
function dN(element) {
    element.style.display = "none";
}

// On page load
window.addEventListener("load", () => {
    document.querySelector("#modal-actions").style.display = "flex";
    qr.innerHTML = new QRCode({
        content: window.location.href,
        container: "svg-viewbox",
        join: true,
        ecl: "L",
        padding: 0
    }).svg();
});

// Share button logic
if (navigator.canShare) {
    s.addEventListener("click", () => {
        navigator.share({
            title: document.title,
            text: "You can view my Digital Business Card here:",
            url: window.location.href
        });
    });
} else {
    s.addEventListener("click", () => {
        toggleModal(modalOverlay);
        copyView.style.display = "flex";
        dN(qrv);
        if (keyView) dN(keyView);
    });
}

// Show QR view
sqr.addEventListener("click", () => {
    toggleModal(modalOverlay);
    qrv.style.display = "block";
    dN(copyView);
    if (keyView) dN(keyView);
});

// Show key view
if (sk) {
    sk.addEventListener("click", () => {
        toggleModal(modalOverlay);
        if (keyView) keyView.style.display = "flex";
        dN(copyView);
        dN(qrv);
    });
}

// Close modal
closemodal.addEventListener("click", () => toggleModal(modalOverlay));

// Copy URL to clipboard
copyUrl.addEventListener("click", async () => {
    let e = copyUrl.querySelectorAll(".iconColor")[1];
    await navigator.clipboard.writeText(window.location.href).then(() => {
        e.innerText = "Copied";
        setTimeout(() => {
            e.innerText = "Copy URL";
        }, 1000);
    });
});

showLocation.addEventListener("click", () => {
  toggleModal(modalOverlay)
  toggleModal(locationModal);
});
