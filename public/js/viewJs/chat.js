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

            let myMsgClass=(ele.sender===splitPath[1] ? 'bg-light ' :'')
            listchats.append(
                $(      `
            <div class="card ${listchats} col-12 ${myMsgClass}">
                <div class="card-body">
                    <div class="card-title">sender:<a style="color: inherit;text-decoration: none" href="../upload/${ele.sender}">${ele.sender}</a></div>
                    <div class="card-text">${ele.message}</div>
                </div>
            </div>
                `)
            )
        })
    })

    btn_send.click(()=>{
        console.log("send button clicked")
        socket.emit('discuss',{
            message:inp_msg.val(),
            room:splitPath[3]
        })
        inp_msg.attr('placeholder',"Write your view here").val('').focus()
    })
    socket.on('message',(data)=>{
        let myMsgClass=(data.sender===splitPath[1] ? 'bg-light' :'')
        listchats.append(
            $(      `
            <div class="card ${listchats} ${myMsgClass} col-12">
                <div class="card-body ">
                    <div class="card-title">sender:<a style="color:inherit;text-decoration: none" href="../upload/{{ranker.2.username}}">${data.sender}</a></div>
                    <div class="card-text">${data.message}</div>
                </div>
            </div>
                `)
        )


    })
})