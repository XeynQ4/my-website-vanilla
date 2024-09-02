// Cookie functions
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires;
}

function getCookie(cname) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function setSimbriefIdBox() {
    let simbriefIdBox = document.getElementById('simbrief-id-box');
    console.log(simbriefIdBox);
    let simbriefTextbox = getCookie('simbriefTextbox');
    if (simbriefTextbox == '') return;
    simbriefIdBox.value = simbriefTextbox;
}

function setSimbriefTextbox() {
    let simbriefIdBox = document.getElementById('simbrief-id-box');
    setCookie('simbriefTextbox', simbriefIdBox.value, 1000);
}

window.onload = setSimbriefIdBox;

// API
async function redirectFlightPlan() {
    try {
        let simbriefId = document.getElementById('simbrief-id-box').value;
        let baseURL = 'https://www.simbrief.com/ofp/flightplans/';
        let flightPlanRaw = await fetch(
            'https://www.simbrief.com/api/xml.fetcher.php?userid=' + simbriefId
        );

        flightPlanRaw = await flightPlanRaw.text();
        let flightPlanXML = new window.DOMParser().parseFromString(
            flightPlanRaw,
            'text/xml'
        );

        let flightPlanAddress = flightPlanXML.documentElement
            .getElementsByTagName('files')[0]
            .getElementsByTagName('pdf')[0]
            .getElementsByTagName('link')[0].innerHTML;

        let flightPlanURL = baseURL + flightPlanAddress;
        window.location.href = flightPlanURL;
    } catch (error) {
        return;
    }
}
