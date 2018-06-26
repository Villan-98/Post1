
$(function(){
    console.log("connected")
    function refreshPage(data,postId){
        let Id='C'+postId
        console.log(Id)
        $('#'+Id).empty()
        console.log("Reached in refreh")
        console.log(data.length)
        for (let i = 0; i < data.length; i++)
        {
            let Pdata = data[i]// {task: jasgvjahv, done: }
            console.log("kfldsjf"+Pdata.Ctext)
            $('#'+Id).append(
                $(`
                        <div class="bg-light mb-1">
                            ${Pdata.user.name}
                        </div>
                        <div>
                        <div class="bg-light mb-3">   ${Pdata.Ctext}
                        </div>
                    </div>`)
            )
        }


    }

    var comment
    $('#Cb').on('change',()=>{

        comment=$('#Cb')[0].value;
        console.log($('#Cb')[0].value)
    })
    console.log("in send funciton"+comment)



    window.send_comment=function(postId)
    {
        $('#Cb')[0].value=''

        let data={
            postId:postId,
            Ctext:comment
        }
        $.post('/post/comment',data,function(data){
            refreshPage(data,postId)
            console.log("done dana don")
            console.log(data)


        })
    }
})