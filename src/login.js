function checkLoginData(event) {
    event.preventDefault();
    var enterUname = document.getElementById('uname').value;
    var enterPwd = document.getElementById('pwd').value;

    var getUname = localStorage.getItem('userUname');
    var getPwd = localStorage.getItem('userPwd');
    if (enterUname == getUname && enterPwd == getPwd) {
        window.location.replace("/src/resume.html");
        sessionStorage.setItem("islogged", "true");
    }
    else {
        alert("Either the username or password you entered is incorrect.\nPlease try again.");
        sessionStorage.setItem("islogged", "flase");
        return;
    }
}