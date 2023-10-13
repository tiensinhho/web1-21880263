const API = 'https://web1-api.vercel.app/api';
const AUTHENTICATE_API = 'https://web1-api.vercel.app/users';
const CAPTCHA_SITE_KEY = '6LeFmZIoAAAAAPWySUGRb67tfrO0Pxq6WSiru_K7';
const CAPTCHA_PROJECT_ID = 'web1-21880263-1697009989589';
const CAPTCHA_API_KEY = 'AIzaSyC95MuNOKbKIpDZ-d6C9L-OZjwv64OVJdM';


//Load Data
async function loadData(request, templateId, viewId){
    const response = await fetch(`${API}/${request}`);
    const data = await response.json();

    // var source = document.getElementById(templateId).innerHTML;
    // var template = Handlebars.compile(source);

    var template = Handlebars.templates[`${templateId}.hbs`];

    var context = { data: data };
    var view = document.getElementById(viewId)
    view.innerHTML = template(context);

};
//Login
async function getAuthenticateToken(username, password){
  let response = await fetch(`${AUTHENTICATE_API}/authenticate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({username, password})
  });
  let result = await response.json();
  if (response.status == 200) {
    return result.token;
  }
  throw new Error(result.message);
}

async function login(e){
  e.preventDefault();

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  document.getElementById('errorMessage').innerHTML ='';

  try{
    let token = await getAuthenticateToken(username, password);
    if (token){
      window.localStorage.setItem('token', token);
      document.getElementsByClassName('btn-close')[0].click();
      displayControls();
      // window.localStorage.setItem("isLogin","true")

    } 
  }catch (error){
    document.getElementById('errorMessage').innerHTML = error;
    displayControls(false);
  }
}

function displayControls(isLogin = true) {
  let linkLogins = document.getElementsByClassName('linkLogin');
  let linkLogouts = document.getElementsByClassName('linkLogout');
  
  let displayLogin = 'none';
  let displayLogout = 'block'
  if (!isLogin){
    displayLogin = 'block';
    displayLogout = 'none';
  }
  for (let i = 0; i<2; i++){
    linkLogins[i].style.display =displayLogin;
    linkLogouts[i].style.display = displayLogout;
  }

  let leaveComment = document.getElementById('leave-comment');
  if (leaveComment) {
    leaveComment.style.display = displayLogout;
  }
}

async function checkLogin() {
  // let isLogin = window.localStorage.getItem("isLogin");
  let isLogin = await verifyToken();
  displayControls(isLogin);
}

async function verifyToken() {
  let token = window.localStorage.getItem('token');
  if (token) {
    let response = await fetch(`${AUTHENTICATE_API}/verify`,{
      method: 'POST',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": 'Bearer ' + token
      }
    });
    if (response.status == 200){
      return true;
    }
  }
  return false;
}

function logout() {
  localStorage.clear();
  // window.localStorage.removeItem("isLogin")
  displayControls(false);
}

