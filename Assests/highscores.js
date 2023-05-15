var scoreList = document.getElementById("highscores")
var savedInitals = localStorage.getItem("savedInitals");
if (!savedInitals){
    document.getElementById("noscores").textContent="No scores saved."
    
} else {
    var parsedInitals = JSON.parse(savedInitals);
    for (var i = 0; i < parsedInitals.length; i++){
        var highNames = document.createElement("li")
        highNames.textContent= parsedInitals[i].name + " : " + parsedInitals[i].score
        scoreList.appendChild(highNames);
    }
}