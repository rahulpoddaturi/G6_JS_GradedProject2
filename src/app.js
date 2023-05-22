function addData(){
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  localStorage.setItem('userUname', username);
  localStorage.setItem('userPwd', password);
  window.location.replace("/src/login.html");
}