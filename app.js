const request = require('request')
const express = require('express')
const Handlebars = require("handlebars")
const path = require('path')
const app = express()
const port = 3000
app.set('view engine', 'hbs');
const hbs = require('hbs')
const publicDirectory = path.join(__filename,'../public')

app.use(express.static(publicDirectory))
const viewsPath = path.join(__filename,'../tempals/views')
 app.set('views',viewsPath)

const pathPartiales = path.join(__filename,'../tempals/partial')
hbs.registerPartials(pathPartiales)

app.get('',(req,res)=>{
    const news= 'https://newsapi.org/v2/top-headlines?country=eg&category=entertainment&apiKey=08683f50c1694ae6ad7178197e9119d3'
    request({url:news,json:true},(error,response)=>{
        if(error){
            return  res.send('Error has occurred')
        }
        else if(response.body.message){
            return  res.send('enter your correct key')
        }
        
         else if(response.body.articles.length==0){
            return  res.send('enter your correct country')
        }
        
        else{
            
            res.render('index',{
                "articles":[{
                urltoimage:response.body.articles[1].urlToImage,
                title:response.body.articles[1].title,
                discription:response.body.articles[1].description
                    },
                    {
                    urltoimage:response.body.articles[2].urlToImage,
                    title:response.body.articles[2].title,
                    discription:response.body.articles[2].description},
                    {
                        urltoimage:response.body.articles[4].urlToImage,
                        title:response.body.articles[4].title,
                        discription:response.body.articles[4].description
                    },
  
         ] }) 
        }
    })   
})
app.get('*',(req,res)=>{
    res.render('404page',{
      msg:'404 PAGE NOT FOUND',
      title:'404'
    })
  })
app.listen(port, () => {
    console.log('Server is running')
  })
