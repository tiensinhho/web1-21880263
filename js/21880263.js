const API = 'https://web1-api.vercel.app/api'
const AUTHENTICATE_API = 'https://web1-api.vercel.app/users'

async function loadData(request, templateId, viewId){
    const response = await fetch(`${API}/${request}`);
    const data = await response.json();

    var source = document.getElementById(templateId).innerHTML;
    var template = Handlebars.compile(source);
    var context = { data: data };
    var view = document.getElementById(viewId)
    view.innerHTML = template(context);

  };

  async function getAuthenticateToken(username, password){
    let reponse = await fetch(`${AUTHENTICATE_API}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({username, password})
    });
    let result = await reponse.json();
    if (reponse.status == 200) {
      return result.token;
    }
    throw new (result.message)
  }
