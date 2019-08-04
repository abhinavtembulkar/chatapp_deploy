console.log('HELLO')

//var PORT = process.env.PORT || 5000
/*const port = document.getElementById('port')
console.log(port)*/

const socket = io.connect()
//const socket = io.connect('http://b83d2546.ngrok.io')

const user = document.getElementById('user')
const msgs = document.getElementById('msgs')
const mbox = document.getElementById('mbox')
const clear = document.getElementById('clear')

var str1,str2,str3='CHATS'

mbox.addEventListener('keydown',(event)=>{
    if(event.which === 13)
    {
        
        str1=user.value
        str2=mbox.value
        console.log(str2)
        
        str3+=`<li> ${str1} : ${str2}</li>`
        
        //msgs.textContent=str3
        msgs.innerHTML=str3
        console.log(msgs.value)

        socket.emit('newuser',{
            name:str1,
            chat:str2,
        })
        
        socket.on('newmsg',(data)=>{
            
            var chatlog=data.chat
            var Name=data.name

            str3+=`<li>${Name} : ${chatlog}</li>`
            console.log('backup!')
            msgs.innerHTML=str3
        })
    }
})

clear.addEventListener('click',(event)=>{
    document.location.reload()
})
