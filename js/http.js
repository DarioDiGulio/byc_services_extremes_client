const API_URL = 'https://bycservicesextremes.herokuapp.com/extremes';

const getExtremes = () => {
  fetch(API_URL).then(function (response) {
    if (response.ok) {
      response.json().then(function (json) {
        console.log(json);
      });
    }
  }).catch(function (error) {
    console.log('Hubo un problema con la petición Fetch:' + error.message);
  });
}

const createExtreme = (body) => {
  const request = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  }
  fetch(API_URL, request).then(function (response) {
    if (response.ok) {
      response.json().then(function (json) {
        console.log(json);
      });
    }
  }).catch(function (error) {
    console.log('Hubo un problema con la petición Fetch:' + error.message);
  });
}

const deleteExtreme = (id) => {
  const request = {
    method: 'DELETE',
    body: JSON.stringify({}),
    headers: {'Content-Type': 'application/json'}
  }
  fetch(`${API_URL}?id=${id}`, request).then(function (response) {
    if (response.ok) {
      response.json().then(function (json) {
        console.log(json);
      });
    }
  }).catch(function (error) {
    console.log('Hubo un problema con la petición Fetch:' + error.message);
  });
}