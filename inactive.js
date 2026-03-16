let inactivityTimeout;

function resetInactivityTimer() {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(logoutUser, 1 * 60 * 1000);
}

function logoutUser() {
    localStorage.removeItem("sessionCreated");
    localStorage.removeItem("sessionIV");
    localStorage.removeItem("sessionToken");
    window.location.replace("login.html?reason=timeout");
}

document.addEventListener("mousemove", resetInactivityTimer);
document.addEventListener("keydown", resetInactivityTimer);

resetInactivityTimer();
