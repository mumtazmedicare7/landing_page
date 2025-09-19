
// New modal logic for modal-overlay and card

window.addEventListener("DOMContentLoaded", () => {
    const modalOverlay = document.getElementById("modal-overlay");
    const closeBtn = document.getElementById("close");
    const keyView = document.getElementById("keyView");
    const copyView = document.getElementById("copyView");
    const qrView = document.getElementById("qrView");
    const copyUrlBtn = document.getElementById("copyURL");
    const qr = document.getElementById("qr");
        const showKeyBtn = document.getElementById("showKey");
        const showQRBtn = document.getElementById("showQR");
        const shareBtn = document.getElementById("share");
        const showLocationBtn = document.getElementById("showLocation");
        const locationView = document.getElementById("locationView");

        function showModal(view) {
            modalOverlay.style.display = "flex";
            // Hide all views
            if (keyView) keyView.style.display = "none";
            if (copyView) copyView.style.display = "none";
            if (qrView) qrView.style.display = "none";
            if (locationView) locationView.style.display = "none";
            // Show selected view
            if (view === "key") {
                if (keyView) keyView.style.display = "block";
            } else if (view === "copy") {
                if (copyView) copyView.style.display = "block";
            } else if (view === "qr") {
                if (qrView) qrView.style.display = "block";
            } else if (view === "location") {
                if (locationView) locationView.style.display = "block";
            }
        }
    // Location button
    if (showLocationBtn) {
        showLocationBtn.addEventListener("click", () => showModal("location"));
    }

    function hideModal() {
        modalOverlay.style.display = "none";
    }

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener("click", hideModal);
    }

    // Modal-actions triggers
    if (showKeyBtn) {
        showKeyBtn.addEventListener("click", () => showModal("key"));
    }
    if (showQRBtn) {
        showQRBtn.addEventListener("click", () => showModal("qr"));
    }
    if (shareBtn) {
        if (navigator.canShare) {
            shareBtn.addEventListener("click", () => {
                navigator.share({
                    title: document.title,
                    text: "Mumtaz Medicare\nBusiness Card\n\nVisit:",
                    url: window.location.href
                });
            });
        } else {
            shareBtn.addEventListener("click", () => showModal("copy"));
        }
    }

    // Copy URL button
    if (copyUrlBtn) {
        copyUrlBtn.addEventListener("click", async () => {
            await navigator.clipboard.writeText(window.location.href);
            const span = copyUrlBtn.querySelector("span");
            if (span) {
                span.textContent = "Copied!";
                setTimeout(() => {
                    span.textContent = "Copy URL";
                }, 1200);
            }
        });
    }

    // Generate QR code
    if (qr) {
        qr.innerHTML = new QRCode({
            content: window.location.href,
            container: "svg-viewbox",
            join: true,
            ecl: "L",
            padding: 0
        }).svg();
    }
});
