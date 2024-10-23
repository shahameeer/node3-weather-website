
const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//paths
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'./templates/views')
const partialsPath=path.join(__dirname,'./templates/partials')


//handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//static directory
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'sha ameer'
    })

})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about page',
        name:'sha ameer'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        phone:'7510715303',
        name:'sha ameer'
    })
})






app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'enter an address'
        })
    }
    
    
        geocode(req.query.address,(error, {latitude,longitude,location}={}) => {
            if(error){
            return res.send({
                error
            })
            }
            



            
            res.send({
                latitude,
                location,
                longitude
            })
            console.log('Data',latitude,location,longitude)
        })
        }
        
    )




app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'provide a search term'
        })

    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})





app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 page',
        name:'sha',
        errorMessage:'help article not found'
        
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 page',
        name:'sha',
        errorMessage:'article not found'
    })
    
})


app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})

