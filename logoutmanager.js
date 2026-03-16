lt = document.querySelector(".logoutTrigger")
lt.onclick = function(){
    if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem("sessionCreated");
    localStorage.removeItem("sessionIV");
    localStorage.removeItem("sessionToken")
    window.location.replace("login.html");
    }
}