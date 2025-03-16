
function loader(req , res ,next){

    res.render('./pages/loaderapp');
    setTimeout(() => {
     return next()
    }, 3000); 
}
module.exports = {loader};