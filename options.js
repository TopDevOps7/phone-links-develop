window.onload = doInit;

function doInit() {
    document.querySelector("#save").addEventListener("click", saveOptions);
    document.querySelector("#usRegex").addEventListener("change", openCloseCustomRegex);
    document.querySelector("#customRegexRadio").addEventListener("change", openCloseCustomRegex);
    loadOptions();
}

function openCloseCustomRegex() {
    var useUs = document.getElementById('usRegex').checked;

    if (useUs) {
        document.getElementById('customRegex').disabled = true;
    } else {
        document.getElementById('customRegex').disabled = false;
    }
}

function saveOptions() {

    var useUs = document.getElementById('usRegex').checked;
    var customRegex = document.getElementById('customRegex').value;
    var prot = document.querySelector('input[name="protgroup"]:checked').id;
    var isRegexValid = true;
    try {
        var re = new RegExp(customRegex, "ig");
    } catch (e) {
        isRegexValid = false;
    }

    if (!isRegexValid) {
        var status = document.getElementById('status');
        status.innerText = "Regex not valid!";
        status.style.visibility = "visible";

        setTimeout(function () {
            status.style.visibility = "hidden";
        }, 750);

        return;
    }

    chrome.storage.sync.set({
        "useUs": useUs,
        "customRegex": customRegex,
        "prot": prot
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.innerText = "Options Saved";
        status.style.visibility = "visible";

        setTimeout(function () {
            status.style.visibility = "hidden";
        }, 750);
    });
}

function loadOptions() {

    chrome.storage.sync.get({
        useUs: true,
        customRegex: '',
        prot: 'tel'
    }, function (items) {
        document.getElementById('usRegex').checked = items.useUs;
        document.getElementById('customRegexRadio').checked = !items.useUs;
        document.getElementById(items.prot).checked = true;
        if (items.useUs) {
            document.getElementById('customRegex').disabled = true;
        } else {
            document.getElementById('customRegex').disabled = false;
        }

        document.getElementById('customRegex').value = items.customRegex;
    });
}