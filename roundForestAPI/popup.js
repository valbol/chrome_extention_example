

let findEbay = document.getElementById('findEbay');
let res = document.getElementById('result');
let txt = document.getElementById('txt');
let final = '';
let firstTime = true;

//futrhter features 
// chrome.tabs.onCreated.addListener(function(){
//     txt.innerText = "clear";
//     res.innerText = "clear";

// });

findEbay.onclick = function() {
    if(!firstTime){
        res.innerText = '';
        final = '';
    }
    let bgpage =  chrome.extension.getBackgroundPage();
    let products = bgpage.tmpArr;
    if(products === undefined){
        setTimeout(() => {  console.log("wait a sec!"); }, 1000);
    }
    try{
        products.forEach(prod => {
            console.log(prod.price);
            final = final + prod.product + ' price ' + prod.price + '\n';    
        });
    }catch(e){
        console.log("undefined");
    }
    if(final === ''){
        txt.innerText = "Pitty!!\nWe didn't Found anything chepaer!";
    }else{
        txt.innerText = "We Found the follwoing products:";
        firstTime = false;
    }
    res.innerText = final;
};

