const ctrlAchv=require('../controllers/achievements')
module.exports={
    insertMedal:async(requery)=>{
        console.log(requery.badgeType)
        ctrlAchv.insertBadge(requery).then((data)=>{
            console.log(data[0].dataValues.badgeType)
            if(data[0].badgeType===null||data[0].badgeType==='Bronze')
            {
                ctrlAchv.updateBadge(requery).then((data)=>{
                    console.log("entered in bronze")
                })
            }
            else if(data[0].badgeType==='Silver' && (requery.badgeType==='Gold'))
            {
                ctrlAchv.updateBadge(requery).then(()=>{
                    console.log("entered in silver")
                }).catch(()=>{
                    console.log(err)
                })
            }
            else if(data[0].badgeType==='Gold'&& (requery.badgeType==='Trophy'))
            {
                ctrlAchv.updateBadge(requery).then(()=>{
                    console.log('entered in gold')
                }).catch(()=>{
                    console.log(err)
                })
            }

            else if(data[0].badgeType==='Silver'&& (requery.badgeType==='Trophy'))
            {
                ctrlAchv.updateBadge(requery).then(()=>{}).catch(()=>{
                    console.log(err)
                })
            }

        })
    }
}