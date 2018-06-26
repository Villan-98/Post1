$.delete = function(url, data,callback){

    /*if ( $.isFunction(data) ){
        type = type || callback,
            callback = data,                    // what is the use of this function and how this function works
            data = {}
    }*/
    console.log("hi")
    return $.ajax({
        url: url,
        type: 'DELETE',
        success: callback,
        data: data,
    });
}
$.patch=function(url,data,callback){
    console.log("reaching in the  patch")
    return $.ajax({
        url:url,
        type:'PATCH',
        success:callback,
        data:data
    })
}
$.post=function(url,data,callback){
    console.log("reachig in the post")
    return $.ajax({
        url:url,
        type:'POST',
        success:callback,
        data:data
    })
}
$(function(){
    console.log("hi")
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
              $(`<div>
                        <div class="bg-light mb-1">
                            ${Pdata.user.name}
                        </div>
                        
                        <div class="bg-light mb-3">   ${Pdata.Ctext}</div>
                    </div>`)
            )
        }


    }
    function refreshLike(body){
        console.log("reached in refresh like"+body.vote)

        let VId='V'+body.postId
        body.vote=(parseInt(body.vote)+parseInt(body.value))
        /*here on the basis of body.value and body.val_but
        that we are determining the new value after refreshing
         the content  in the onclick function of both thumbs
         */
        if(body.val_but===1&&(body.value===1||body.value===2))
        {
            let Id='N'+body.postId
            $('#'+Id).empty()
            $('#'+Id).append(
                $(` <i class="fa fa-thumbs-up" onclick="like_post(${body.postId},-1,${body.vote},0)" style="font-size: 36px" aria-hidden="true"></i></div>
                    <i class="far fa-thumbs-down" onclick="like_post(${body.postId},-2,${body.vote},1)" style="font-size: 36px" aria-hidden="true"></i></div>`)
            )

        }
        else if(body.val_but===1&&(body.value===-1||body.value===-2))
        {
            //console.log("2")
            let Id='N'+body.postId
            $('#'+Id).empty()
            $('#'+Id).append(
                $(`<i class="far fa-thumbs-up" onclick="like_post(${body.postId},2,${body.vote},1)" style="font-size: 36px" aria-hidden="true"></i></div>
                     <i class="fa fa-thumbs-down" onclick="like_post(${body.postId},1,${body.vote},0)" style="font-size: 36px" aria-hidden="true"></i></div>`)
            )

        }
        else if((body.val_but===0))
        {
            //console.log("3")
            let Id='N'+body.postId
            $('#'+Id).empty()
            $('#'+Id).append(
                $(` 
                    <i class="far fa-thumbs-up" onclick="like_post(${body.postId},1,${body.vote},1)" style="font-size: 36px" aria-hidden="true"></i>
                     <i class="far fa-thumbs-down"onclick="like_post(${body.id},-1,${body.vote},1)" style="font-size:36px"aria-hidden="true"></i>
                  `)
            )
        }
        $('#'+VId).empty()
        $('#'+VId).append(
            $(`<div>
                    ${body.vote}
                    </div>`)
        )

    }
   window.deletePost= function(postId){
        console.log("deletion clicked")
       let body={
           postId:postId
       }
        $.delete(`/post`,body,function(){
        location.reload(true)
       })
   }
   window.fetch_comment=function(postId){
       // console.log("listening to "+postId)

       $.get(`/post/comment?postId=${postId}`,function(data){
           refreshPage(data,postId)
           //console.log("done dana don")
           //console.log(data)

       })

    }
    window.like_post=function(postId,value,postVote,val_but)
    {       //val-but is 0 if it come from dark thumb and vice versa
              console.log("like button clicked")                                                      //value will be  if user like post else it will be -1
        let body={
            postId:postId,
            value:value,
            val_but:val_but,
            vote:postVote,                                      //post vote are the current vote on any post
        }
        refreshLike(body)
        //console.log("listening to like post")
        $.patch('/upload',body,function(){            //updating the post value of the given post
            console.log("sdfasdffff")

            if(val_but===1)
            {
                /* in the route.post of the like we will determine
                on the basis of value whether entry is for
                 adding like and deleting dislike and vice-versa*/
                $.post('/like',body,function(data){
                    console.log("dfjskfdjklsjfklsjfklsjakljkdl.......")
                })
            }
            else if(val_but===0&&value===-1)
            {

                /* by entering body.like=1 , in route.delete(of '/route/like')we
                will delete  entry in the like table for the given post of the given user*/
                body['like']=1
                console.log(body.like)
                $.delete('/like',body,function(){
                    console.log("deleted")
                })
            }
            else if(val_but===0&&value===1)
            {
                /* by entering body.like=0 , in route.delete(of '/route/like')we
                will delete  entry in the dislike table for the given post of the given user*/
                body['like']=0
                $.delete('/like',body,function(){
                    console.log("deleted")
                })
            }
        })
    }

})
