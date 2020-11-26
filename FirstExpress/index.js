const express = require('express')
const app = express()
const port = 3000
const path = require('path')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let baseURL = 'https://api.themoviedb.org/3/';
let popularMovies='discover/movie?api_key=9caad578a066655588a4ab8acfc004a9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
let imageBaseUrl="https://image.tmdb.org/t/p/"
app.set('views',path.join(__dirname,'views'))
app.set('view engine','pug')

app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req, res) => {

  var movies=httpGet(baseURL+""+popularMovies)

  // let articles=[
  //   {
  //     id:1,
  //     title:'Article One',
  //     author:'Mousa',
  //     body:'This is the first article'
  //   },
  //   {
  //     id:2,
  //     title:'Article Two',
  //     author:'Othman',
  //     body:'This is the second article'
  //   },
  //   {
  //     id:3,
  //     title:'Article Three',
  //     author:'Waleed',
  //     body:'This is the third article'
  //   }
  // ]
  res.render('index.pug',{title:'Popular Movies',header:'Popular Movies',movies:movies,imageBaseUrl:imageBaseUrl})
})

app.get('/movie/:i',(req,res)=>{
  var movies=httpGet(baseURL+""+popularMovies)
  var movie= movies.results[req.params.i]
  res.render('movie.pug',{title:movie.title,movie:movie,imageBaseUrl:imageBaseUrl})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}