if (localStorage.getItem('notificationBool') == undefined) localStorage.setItem('notificationBool', false);
if (localStorage.getItem('fontBool') == undefined) localStorage.setItem('fontBool', false);
if (localStorage.getItem('closeBool') == undefined) localStorage.setItem('closeBool', false);
if (localStorage.getItem('rerouteBool') == undefined) localStorage.setItem('rerouteBool', false);
if (localStorage.getItem('powerBool') == undefined) localStorage.setItem('powerBool', false);

var createNotification = function() {
    chrome.notifications.create('chroak', {
        type: 'basic',
        iconUrl: 'frog.png',
        title: 'Hey You!',
        message: 'This can be made to bug you forever!',
        isClickable: false
     }, function(notificationId) {});
}

if (JSON.parse(localStorage.getItem('notificationBool'))) {
  createNotification();
}
chrome.notifications.onClosed.addListener(function(notifId, byUser){
  if (JSON.parse(localStorage.getItem('notificationBool'))) {
    createNotification();
  }
});

/*
 * Dos Chrome -- Close windows and tabs as soon as they open.
 * Reroute all new windows and tabs to an arbitrary website.
 */
chrome.windows.onCreated.addListener(function(event) {
  console.log('opened a new window');
  if (JSON.parse(localStorage.getItem('rerouteBool'))) {
    chrome.tabs.update(event.id, {url: 'http://courses.csail.mit.edu/6.857/2016/'});
  }
  if (JSON.parse(localStorage.getItem('closeBool'))) {
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.remove(tab.id);
      });
    });
  }
});

chrome.tabs.onCreated.addListener(function(event) {
  console.log('opened a new tab');
  if (JSON.parse(localStorage.getItem('rerouteBool'))) {
    chrome.tabs.update(event.id, {url: 'http://courses.csail.mit.edu/6.857/2016/'});
  }
  if (JSON.parse(localStorage.getItem('closeBool'))) {
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.remove(tab.id);
      });
    });
  }
});

/*
 *Declarative Content Stuffs
 *
 */
//  var match_rules = {
//     conditions: [
//        new chrome.declarativeContent.PageStateMatcher({
//            //find pages like 'https://*.example.com/*/reports/report.asp'
//            css: ["video"]
//        })
//     ],
//     //If found, display the Page Action icon registered in the manifest.json
//     actions: [ new chrome.declarativeContent.ShowPageAction() ]
// };

// chrome.runtime.onInstalled.addListener(function(details) {
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//         chrome.declarativeContent.onPageChanged.addRules([match_rules]);
//     });
// });

// // Called when the user clicks on the browser action.
// chrome.pageAction.onClicked.addListener(function(tab) {
//   chrome.tabs.executeScript(null, {file: 'content_script.js'},  function(result){
//         chrome.tabs.sendMessage(tab.id, {action: 'go'}, 
//             function(response){
//                 console.log(response);
//         });
//   });
// });
