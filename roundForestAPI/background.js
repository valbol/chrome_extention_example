// 'use strict';
// const NEW = ' new'; //add to the API search - only new products.
// const ENTRIES = '5';// num of pages entries

const ebay_fake_db = {apple_watch: 
  [
                               {product: 'apple watch series 5', price: 700},
                               {product: 'apple watch series 5', price: 200},
                               {product: 'apple watch series 5', price: 400},
                               {product: 'apple watch series 5', price: 4500},
                               {product: 'apple watch series 5', price: 600},
                               {product: 'apple watch series 5', price: 200}
  ]
};

//This function setup our DB once popup availble on the page
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(ebay_fake_db, function() {
    console.log(`products stored in MOCK-DB:  ${JSON.stringify(ebay_fake_db)}`);
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.amazon.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

function lowestPrice(products, productKey, price_to_compare){
 
  var result = products[productKey].filter(elem => parseFloat(elem.price) <=  parseFloat( price_to_compare));
  console.log(result);
  window.tmpArr = result;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(`BG SCOPE: name: ${request.productName}, price: ${request.productPrice}, searchKey ${request.productSearch}`);
  if(request != null ){
    chrome.storage.sync.get([request.productSearch], function(result) {
      console.log(`BG SCOPE: Value currently is  ${JSON.stringify(result)}`);
      // lowestPrice(result, productKey, price_to_compare);
      lowestPrice(result, request.productSearch, request.productPrice);
    });
    sendResponse({result: 'success'});
  }else{
    sendResponse({result: "Error: no data recieved"});
  }
});

//Ebay - API 
function sendToEbay(request){
  let productNameHttp = request.productName;
  productNameHttp = productNameHttp.concat(NEW);
  productNameHttp = productNameHttp.replace(/ /g, '%20');

  // Construct ebay  request
  let url = "http://svcs.ebay.com/services/search/FindingService/v1";
  url += "?OPERATION-NAME=findItemsByKeywords";
  url += "&SERVICE-VERSION=1.0.0";
  // Replace MyAppID with my Production AppID
  url += "&SECURITY-APPNAME=MyAppID";
  url += "&GLOBAL-ID=EBAY-US";
  url += "&RESPONSE-DATA-FORMAT=JSON";
  url += "&callback=_cb_findItemsByKeywords";
  url += "&REST-PAYLOAD";
  //eample url += "&keywords=harry%20potter";
  url += `&keywords=${productNameHttp}`;
  url += `&paginationInput.entriesPerPage=${ENTRIES}`;
}

