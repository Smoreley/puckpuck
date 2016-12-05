var playername;

$(function() {
    
    if(document.cookie != "") {
        loadName(JSON.parse(document.cookie));
    } else {
        
        document.getElementById("playerName").innerHTML = "<input id=\"playerNameInput\" type=\"text\" placeholder=\"Name\"> <i id=\"setName\" class=\"plus link icon\"></i>";
        
        document.getElementById("setName").onclick = function() {
            saveName(document.getElementById("playerNameInput").value);
        };
    }
    
});

function saveName(pName) {
//        playername = document.getElementById("playerNameInput").value;
    playername = pName;
        
    var obj = {playername : pName};
    document.cookie = JSON.stringify(obj);
    document.getElementById("playerName").innerHTML = "<div class=\"header item\">"+pName+"</div>";
}

function loadName(pName) {
    playername = pName.playername;
    
    // Saves cookies
//    document.cookie = JSON.stringify(obj);
    document.getElementById("playerName").innerHTML = "<div class=\"header item\">"+playername+"</div>";
}