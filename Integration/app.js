"_comment": "02/10/2022 Carlos Oliveira"

const endpoint = 'https://untitled-v22ja244g53y.runkit.sh'

function getAccessToken() {
  return fetch(`${endpoint}/token`, { method: 'GET' })
    .then(response => response.json())
    .then(data => data.access)
    .catch(error => console.error('Error:', error))
}

function getInstitutionName(institution) {
  return fetch(`${endpoint}/success`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ institution })
  })
    .then(response => response.json())
    .then(data => {
      let content = document.querySelector('#demo-content')
      content.innerHTML = `Você conectou com sucesso em ${data[0].display_name}`
    })
}

function openBelvoWidget(accessToken) {
  belvoSDK
    .createWidget(accessToken, {
      callback: (link, institution) => console.log(institution, link),
      access_mode: 'single',
      country_codes: ['BR'],
      institution_types: ['retail'],
      locale: 'pt'
      // onExit: (event) => console.log(event),
      // onEvent: (event) => console.log(event)
    })
    .build()
}

document.body.onload = getAccessToken().then(openBelvoWidget)
