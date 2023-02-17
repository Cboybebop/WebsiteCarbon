var tablink = null;
var encodeLink = null;
var apiLink = null;

function PercentValueCellStyle(value, id) {
	var classes = [];
	var percent = 0;
	var backColor = '';

	if (value == 0) {
		percent = 0;
	}
	else {
		percent = (value / 100).toFixed(1);
	}           

	backColor = GetColorFromPercentage(percent);

  document.getElementById(id).style.background = backColor;
}

function GetColorFromPercentage(pctInput) {

	//define colors here:
	var percentColors = [
		{ pct: 0.0, color: { r: 245, g: 198, b: 203 } },
    { pct: 0.5, color: { r: 255, g: 238, b: 186 } },
    { pct: 1.0, color: { r: 195, g: 230, b: 203 } }];

	for (var i = 1; i < percentColors.length - 1; i++) {
		if (pctInput < percentColors[i].pct) {
			break;
		}
	}

	var lower = percentColors[i - 1];
	var upper = percentColors[i];
	var range = upper.pct - lower.pct;
	var rangePct = (pctInput - lower.pct) / range;
	var pctLower = 1 - rangePct;
	var pctUpper = rangePct;
	var color = {
		r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
		g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
		b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
	};

	return 'rgba(' + [color.r, color.g, color.b].join(',') + ')';
};

async function fetchData() {
    const res = await fetch (apiLink);
    const record = await res.json();
    //console.log(record);
    document.getElementById("co2").innerHTML=record.c;
    document.getElementById("percentile").innerHTML=record.p;
	PercentValueCellStyle(document.getElementById("percentile").innerHTML,"percentile");
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

