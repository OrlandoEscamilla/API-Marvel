const privatekey = '653171f2c1d9bc04755cce40b2d63b43632231d9',
      publickey = '6abbf1d737a477407397eee3d8eca7b2',
      content = document.getElementById('content'),
      search = document.getElementById('search');

const getConnection = () => {
  const ts = Date.now(),
      hash = md5(ts + privatekey + publickey),
       URL = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publickey}&hash=${hash}`;
       fetch(URL)
       .then(response => response.json())
       .then(response => {
         response.data.results.forEach(e =>{
           drawHero(e);
         });
       });
}


const drawHero = e =>{
    const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
    const hero = `<div class="hero ed-item l-1-3">
                    <h3>${e.name}</h3>
                    <div class="hero-img">
                      <img class="thumbnail" src="${image}">
                    <p class="description">${e.description}</p>
                    </div>
                  </div>
                `;
                content.insertAdjacentHTML('beforeEnd', hero);
};



const searchHero = name => {
  const ts = Date.now(),
  hash = md5(ts + privatekey + publickey),
  hero = encodeURIComponent(name),
  URL = `http://gateway.marvel.com/v1/public/characters?name=${hero}&ts=${ts}&apikey=${publickey}&hash=${hash}`;
  fetch(URL)
  .then(response => response.json())
  .then(response => {
    response.data.results.forEach(e => {
      drawHero(e);
    });
  })
  .catch(e => console.log(e));
}



search.addEventListener('keyup', e => {
  if(e.keyCode === 13){
    content.innerHTML = '';
    searchHero(e.target.value.trim());
  }
});

getConnection();
