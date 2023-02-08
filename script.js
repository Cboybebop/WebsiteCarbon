var tablink = null;
var encodeLink = null;
var apiLink = null;

async function fetchData() {
    const res = await fetch (apiLink);
    const record = await res.json();
    //console.log(record);
    document.getElementById("co2").innerHTML=record.c;
    document.getElementById("percentile").innerHTML=record.p;
}

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
     tablink = tabs[0].url;
    console.log(tablink);
     encodeLink = encodeURIComponent(tablink);
    console.log(encodeLink);
     apiLink = "https://api.websitecarbon.com/b?url="+encodeLink;
    console.log(apiLink);
    fetchData();
});

