/*
include this snippet if you're changing sources/adding a new set of markers in order to clear up the markers on your timeline before setting new ones
var clear = document.getElementsByClassName('amp-timeline-marker');
                 var i=0;
                 for (i<= 0; i < clear.length; i++){
                     //do thing
                     document.getElementsByClassName('amp-timeline-marker')[i].style.visibility='hidden';
                 }


*/

duration = 0;
(function () {
    console.log("At top");
    amp.plugin('timelineMarker', function (options) {
        var player = this;
        console.log("In marker setup")
        player.addEventListener(amp.eventName.durationchange, function () {
            duration = player.duration();
            var progressControlSlider = getElementsByClassName("vjs-progress-control", "vjs-slider");
            if (progressControlSlider) {
                console.log("Found progressControlSlider")
            }
            else {
                console.log("ERROR could not find progressControlSlider");
            }



            if (progressControlSlider) {
                for (var index = 0; index < options.markertime.length; index++) {
                    var marker = options.markertime[index];
                    if (marker) {
                        var secs = convertTimeFormatToSecs(marker);
                        if (secs >= 0 && secs <= duration) {
                            var markerLeftPosition = (secs / duration * 100);
                            var div = document.createElement('div');
                            div.className = "amp-timeline-marker";
                            div.style.left = markerLeftPosition + "%";
                            div.innerHTML = "&nbsp;&nbsp;"
                            progressControlSlider.appendChild(div);
                        }
                    }
                }
            }
        });





    });

}).call(this);

function getElementsByClassName(className, childClass) {
    var elements = document.getElementById("myplayer").getElementsByClassName(className);
    var matches = [];

    function traverse(node) {
        if (node && node.childNodes) {
            for (var i = 0; i < node.childNodes.length; i++) {
                if (node.childNodes[i].childNodes.length > 0) {
                    traverse(node.childNodes[i]);
                }

                if (node.childNodes[i].getAttribute && node.childNodes[i].getAttribute('class')) {
                    if (node.childNodes[i].getAttribute('class').split(" ").indexOf(childClass) >= 0) {
                        matches.push(node.childNodes[i]);
                    }
                }
            }
        }
    }

    if (!childClass)
        return elements && elements.length > 0 ? elements[0] : null;

    if (elements && elements.length > 0) {
        for (var i = 0; i < elements.length; i++)
            traverse(elements[i]);
    }
    return matches && matches.length > 0 ? matches[0] : null;
}

function convertTimeFormatToSecs(timeFormat) {
            if (timeFormat) {
                if (typeof(timeFormat) == "number") return parseInt(timeFormat, 10);
                var timeFragments = timeFormat.split(":");
                if (timeFragments.length > 0) {
                    switch (timeFragments.length) {
                        case 4:
                            return (parseInt(timeFragments[0], 10) * 60 * 60) + (parseInt(timeFragments[1], 10) * 60) + parseInt(timeFragments[2], 10) + (timeFragments[3] / 100);
                        case 3:
                            return (parseInt(timeFragments[0], 10) * 60 * 60) + (parseInt(timeFragments[1], 10) * 60) + parseInt(timeFragments[2], 10);
                        case 2:
                            return parseInt(timeFragments[0], 10) * 60 + parseInt(timeFragments[1], 10);
                        case 1:
                            return parseInt(timeFragments[0], 10);
                        default:
                            return parseInt(timeFragments[0], 10);
                    }
                }
                else
                    return parseInt(timeFormat, 10);
            }

            return 0;
        }

function convertSecsToTimeFormat(nSecs) {
    hours = Math.floor(nSecs / 3600);
    mins = Math.floor((nSecs - (hours * 3600)) / 60);
    secs = nSecs - (hours * 3600) - (mins * 60);
    str = "";
    if (hours > 0) {
        str += hours + ":"
    }
    str += ("00" + mins).slice (-2) + ":" + ("00" + secs).slice (-2);
    return(str)
}


function addMarker(progressControlSlider, marker) {
    if (!progressControlSlider) {
        progressControlSlider = getElementsByClassName("vjs-progress-control", "vjs-slider");
    }
    var secs = convertTimeFormatToSecs(marker);
    if (secs >= 0 && secs <= duration) {
        var markerLeftPosition = (secs / duration * 100);
        var div = document.createElement('div');
        div.className = "amp-timeline-marker";
        div.style.left = markerLeftPosition + "%";
        div.innerHTML = "&nbsp;&nbsp;"
        progressControlSlider.appendChild(div);
    }
}
function clearMarkers() {
    var clear = document.getElementsByClassName('amp-timeline-marker');
    var i = 0;
    for (i <= 0; i < clear.length; i++) {
        //do thing
        document.getElementsByClassName('amp-timeline-marker')[i].style.visibility = 'hidden';
    }
}
