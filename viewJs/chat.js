let socket=io.connect('http://localhost:2400/')
$(function() {
    console.log("connected")
    let container_login = $('#login')
    let chat_container = $('#chatbox')
    chat_container.hide()

    let start_chat = $('#start_chat')
    let inp_username=$('#inp_username')
    let btn_send = $('#send_btn')
    let inp_msg=$('#inp_msg')
    let listchats=$('#chatlist')

    start_chat.click(()=>{
      socket.emit('login',{
          username:"sachin"
        })
    })
    socket.on('logged_in',(data)=>{
        if(data.success){
            chat_container.show()
            container_login.hide()
            console.log("stored")
        }
    })
    btn_send.click(()=>{
        socket.emit('chat',{
            message:inp_msg.val()
        })
    })
    socket.on('chat',(data)=>{
        listchats.append(
            $(      `
            <div class="card ${cardExtraClass} col-12">
                <div class="card-body">
                    <div class="card-title">${data.sender}</div>
                    <div class="card-subtitle text-muted small">${data.timestamp}</div>
                    <div class="card-text">${data.message}</div>
                </div>
            </div>
                `)
    )
    })

})