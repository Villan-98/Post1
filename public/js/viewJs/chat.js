let socket=io.connect()
$(function() {
    let container_login = $('#login')
    let chat_container = $('#chatbox')
    chat_container.hide()
    let start_chat = $('#start_chat')
    let inp_username=$('#inp_username')
    let btn_send = $('#send_btn')
    let inp_msg=$('#inp_msg')
    let listchats=$('#chatlist')
    let join=$('.joinChat')

    const path=window.location.pathname
    const  splitPath=path.split('/')
    console.log(splitPath)
    console.log(path)

    socket.emit('joinRoom',{
          username:splitPath[1],
            room:splitPath[3]
        })
    socket.on('joined',(data)=>{
        data.forEach((ele)=>{

            listchats.append(
                $(      `
            <div class="card ${listchats} col-12">
                <div class="card-body">
                    <div class="card-title">sender:${ele.sender}</div>
                    <div class="card-text">${ele.message}</div>
                </div>
            </div>
                `)
            )
        })
    })
    socket.on('message',(data)=>{
        console.log(data)
        listchats.append(
            $(      `
            <div class="card ${listchats} col-12">
                <div class="card-body">
                    <div class="card-title">sender:${data.sender}</div>
                    <div class="card-text">${data.message}</div>
                </div>
            </div>
                `)
        )
    })
    btn_send.click(()=>{
        console.log("send button clicked")
        socket.emit('discuss',{
            message:inp_msg.val(),
            room:splitPath[3]

        })
    })
    socket.on('chat',(data)=>{
        console.log("in teh on chat")
        console.log(data)

    })

})