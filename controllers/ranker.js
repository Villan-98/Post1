const fs = require('fs');
let data = {}
const dateStore=require('date-store')
const store=new dateStore()
const ranker=require('../db/models').Ranker
const post=require('../db/models')
const ctrl_achv=require('../controllers/achievements')
const college=require('./college')

var requery     ={}           //to store the date stored in json file

/**********In this file
 * BH is for highest vote for a batch in a particular college
 * CH is for the highest vote in a particular college
 * GH stands for the highest votes globally
 * third alphbet stands i.e W for week and T or till day from beginning
 * *********/


let writeDate=function(){
    var currentDate=store.date('today')
    var updateDate=store.date('1 hour from now ')               //set time accordingly
    data['lastUpdation']=currentDate
    data['nextUpdation']=updateDate
    fs.writeFile('dateStore.json', JSON.stringify(data), function (err) {
        if (err) throw err;
        //console.log('Date Saved!');
    })
}
//writeDate()         //it should be called when there is no date written in datestore.json otherwise no updation occur
let insertGHT=function()
{
    ranker.findOrCreate({where:{

            scope:'Global',
            period:'Till Date',
            role:'H.V.P'
        }
    })
    insertGHW()
}
let insertBHT=function()
{
    college.getAllCollege()
        .then((data)=>{
            for(let i=0;i<data.length;i++)
            {
                for(let j=1;j<=5;j++)
                {
                    ranker.findOrCreate({
                        where:{

                            scope:data[i].collegeName,
                            period:'Till Date',
                            role:'H.V.P',
                            courseYear:''+j
                        }
                    })
                }
            }
        })

}
let insertGHW=function()
{
    ranker.findOrCreate({
        where:{

            scope:'Global',
            period:'Week',
            role:'H.V.P'
        }
    })
    insertCHT()
}

let insertCHT=function()
{
    college.getAllCollege()
        .then((data)=>{
            for(let i=0;i<data.length;i++)
            {
                ranker.findOrCreate({
                    where:{
                        scope:data[i].collegeName,
                        period:'Till Date',
                        role:'H.V.P'
                    }
                })
            }
        })
    insertCHW()
}
let insertCHW=function()
{
    college.getAllCollege()
        .then((data)=>{
        for(let i=0;i<data.length;i++)
        {
            ranker.findOrCreate({
                where:{
                    scope:data[i].collegeName,
                    period:'Week',
                    role:'H.V.P'
                }
            })
        }
    })

}
let insertBHW=function()
{
    college.getAllCollege()
        .then((data)=>{
        for(let i=0;i<data.length;i++)
        {
            for(let j=1;j<=5;j++)
            {
                ranker.findOrCreate({
                    where:{
                        scope:data[i].collegeName,
                        period:'Week',
                        role:'H.V.P',
                        courseYear:''+j
                    }
                })
            }
        }
    })

}

let updateGH=function(){
    ctrl_achv.GlHScorer()
        .then((data)=>{
            if(data)
            {
                //console.log("data is")
                //console.log(data)
                ranker.update({                             //updating GHT
                    username:data.Puser.username
                },{
                    where:{
                        scope:'Global',
                        period:'Till date'
                    }
                })
            }
        })

    updateGHW()
}
let updateGHW=function(){
    ctrl_achv.GHW(requery)             // you have to pass two dates in this function in an object which
    // include current date and last updated date
        .then((data)=>{
            //updating GHW
            if(data)
            {
                ranker.update({
                    username:data.Puser.username
                },{
                    where:{
                        scope:'Global',
                        period:'Week'
                    }
                })
            }
        })
    updateCH()
}
let updateBH=function(){
    college.getAllCollege()
        .then((data)=>{
            for(let i=0;i<data.length;i++)
            {
                requery['college']=data[i].collegeName
                for(let j=1;j<=5;j++)
                {
                    requery['courseYear']=j;
                    ctrl_achv.BHT(requery)
                        .then((data)=>{
                            if(data)
                            {

                                ranker.update({
                                    username:data.Puser.username
                                },{
                                    where:{
                                        scope:data.college,
                                        courseYear:data.courseYear,
                                        period:'Till date'
                                    }
                                })
                            }
                            ctrl_achv.BHW(requery)
                                .then((data)=>{
                                    if(data)
                                    {

                                        ranker.update({
                                            username:data.Puser.username
                                        },{
                                            where:{
                                                scope:data.college,
                                                period:'Week',
                                                courseYear:data.courseYear
                                            }
                                        })
                                    }
                                })
                        })


                }
            }
        })

}
let updateCH=function(){
    college.getAllCollege()
        .then((data)=>{
            for(let i=0;i<data.length;i++)
            {
                requery['college']=data[i].collegeName
                ctrl_achv.ClGScorer(requery)
                    .then((data)=>{
                        if(data)
                        {
                            ranker.update({
                                username:data.Puser.username
                            },{
                                where:{
                                    scope:data.college,              //here if you will requery.college then due to
                                     courseYear:null,    // asyncronous function requery.college may contain any college
                                    period:'Till date'
                                }
                            })
                        }

                    })

            }
        })
    updateCHW()
}
let updateCHW=function(){
    college.getAllCollege()
        .then((data)=> {
            for (let i = 0; i < data.length; i++)
            {
                requery['college']=data[i].collegeName

                ctrl_achv.CHW(requery)
                    .then((data)=>{
                                            //why this function was not working properly in updateCH function
                        if(data)
                        {
                            ranker.update({
                                username:data.Puser.username
                            },{
                                where:{
                                    scope:data.college,
                                    courseYear:null,
                                    period:'Week'
                                }
                            })
                        }
                    })
            }
        })
        writeDate()         //to write date in datestore.json

}
let upInsertion=function(){
    console.log("upInsertion")
    let jsonData = JSON.parse(fs.readFileSync('./dateStore.json', 'utf-8'))
    requery['lastUpdation']=jsonData.lastUpdation
    requery['nextUpdation']=jsonData.nextUpdation
    if(Date.parse(requery.nextUpdation)<=Date.now())
    {
       console.log( Date.parse(requery.nextUpdation))
        console.log("done")
        console.log(Date.now())
        try{
           /***here many updation and insertion function
            * are linked one after other i.e.,
            * all insertion function will be called
            * on execution of insertGHT() and same for case  of updation****/

            //insertGHT()      //commented so that less no. of query run in terminal(there are just findOr create query)
            updateGH()
        }catch(err){
            writeDate()
        }
    }
    else{

    }
}
//insertGHT()
//
//insertCHT()
/*insertBHT()
insertBHW()*/
//insertCHW()

setInterval(upInsertion,660000)             //set time according to the timing you want updation

/////fetching the data of rankers//////////////////////////
module.exports={
    getRanker:async(requery)=>{
        return ranker.findAll({
            where:{
                $or:[{
                    scope:{$eq:'Global'}
                },
                    {
                        scope:requery.college
                    }
                ]
            }
        })
    }
}