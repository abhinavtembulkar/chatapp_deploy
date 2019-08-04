const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const hbs = require('hbs')

var PORT = process.env.PORT || 5000

server.listen(PORT,()=>{
    console.log('runninn on %s',PORT)
})

app.set('view engine','hbs')

app.use(express.static(__dirname+'/views'))

app.get('/',(req,res)=>{
    console.log('this is GET !')

    const name = req.query.name

    res.render('srvr.hbs',{
        //key pairs here !
        name:name,
        port:PORT
    })
})

var chats=[]

io.on('connection',(socket)=>{
    console.log('connected')

    
    socket.on('newuser',(data)=>{
        console.log("new ",data)

        //socket.emit('init',chats)
        
        var ele = chats.find((ele,i,chats)=>{
            return ele.name==data.name
        })
        
        console.log(ele)

        if(chats.length==0 || !ele) chats.push(data)
        else
        {
            /*console.log(ele.name,data.chat)
            ele.chat+=data.chat*/

            socket.broadcast.emit('newmsg',data)
        }
        console.log(chats)
    })


})