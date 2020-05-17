
console.log("Content script running!!!...");
let productName = '';
let productPrice = '';
try{
   productName = document.getElementById('productTitle').innerText || null;
   productPrice = document.getElementById('priceblock_ourprice').innerText.split("$")[1] || null;  
}catch(e){
  console.log(e);
  // throw new Error("Something went badly wrong!");
  setTimeout(() => {  console.log("wait a sec!"); }, 3000);
}

let dataObject, priceResult = {};
let productSearch = document.getElementById('twotabsearchtextbox').value || null ;
try{
  if(productName != null && productPrice != null && productSearch != null){
    dataObject = {productName, productPrice, productSearch};
    console.log(`My object: ${productName} , ${productPrice}, ${productSearch}`); 
  
    chrome.runtime.sendMessage(dataObject, function(response) {
        console.log(`message from background: ${JSON.stringify(response)}`);
        if(response.result === 'success'){
          console.log('OK: send message success');
        }
        else{
          console.log('NOT OK: we dont have value from backend');
        }      
      });  
  }

}catch(e){
  console.log(e);
}

