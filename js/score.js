function playSound(path) {
    var sound = new Audio(path);
    sound.play();
}

playSound("../sounds/ZiedGharsa.mp3");





// document.addEventListener('DOMContentLoaded', function (e) {
//     document.body.addEventListener('keydown', function (e) {
//         if (e.keyCode == 116) {
//             e.preventDefault();
//         }
//     }, false);
// }, false);

document.getElementById("j2name").innerHTML = localStorage.getItem('playerName')
document.getElementById("scoreNom").innerHTML = localStorage.getItem('playerName')

itemj1 = localStorage.getItem("scoreORDINATEUR")
itemj2 = localStorage.getItem("scoreUTILISATEUR")

chkobbaORDINATEUR = itemj1.split(",,,")[0].split(",")[1]
chkobbaUTILISATEUR = itemj2.split(",,,")[0].split(",")[1]

cartesORDINATEUR = itemj1.split(",,,")[1].split(",")
cartesUTILISATEUR = itemj2.split(",,,")[1].split(",")


document.getElementById("j1chkobba").innerHTML = chkobbaORDINATEUR
document.getElementById("j2chkobba").innerHTML = chkobbaUTILISATEUR
document.getElementById("j1karta").innerHTML += (cartesORDINATEUR.length + " cartes")
document.getElementById("j2karta").innerHTML += (cartesUTILISATEUR.length + " cartes")

cartesSYMBOLS = ["10-♦","9-♦","8-♦","7-♦","6-♦","5-♦","4-♦","3-♦","2-♦","1-♦","7-♦","7-♥","7-♠","7-♣","6-♦","6-♥","6-♠","6-♣","7-♦"]
bermilaSYMBOLS = ["7-♦","7-♥","7-♠","7-♣","6-♦","6-♥","6-♠","6-♣"]
dinariSYMBOLS = ["10-♦","9-♦","8-♦","7-♦","6-♦","5-♦","4-♦","3-♦","2-♦","1-♦"]



function chargerCartes() {
    let c = document.getElementById("Cartes").children
    for(let i=0;i<c.length;i++) {
        c[i].setAttribute("data-number",cartesSYMBOLS[i])
        c[i].style.backgroundImage = "url(../images/"+cartesSYMBOLS[i]+".png)";
        c[i].style.backgroundSize = "cover";
    }
}

chargerCartes()


function appendCard(id,carte) {
    carte.style.visibility = "visible"
    carte.style.position = "relative"
    document.getElementById(id).appendChild(carte)
}

function searchCard(symbol) {
    let x=document.getElementById("Cartes").children
    for(let i=0;i<x.length;i++) {
        if(x[i].getAttribute("data-number")==symbol) return x[i]
    }
}



function checkBermila7 () {
    let x = document.getElementById("7j1").children
    let y = document.getElementById("7j2").children
    if(x.length == y.length) return true
    return false
}
function bermilaScore() {
    for(let i=0;i<4;i++) {
        if(cartesORDINATEUR.includes(bermilaSYMBOLS[i])) appendCard("7j1",searchCard(bermilaSYMBOLS[i]))
        else appendCard("7j2",searchCard(bermilaSYMBOLS[i]))
    }    
    if(checkBermila7()) {
        for(let j=4; j<8;j++) {
            if(cartesORDINATEUR.includes(bermilaSYMBOLS[j])) appendCard("6j1",searchCard(bermilaSYMBOLS[j]))
            else appendCard("6j2",searchCard(bermilaSYMBOLS[j]))
        }
    }
    let j1sbou3=document.getElementById("7j1")
    let j2sbou3=document.getElementById("7j2")
    let j1stout=document.getElementById("6j1")
    let j2stout=document.getElementById("6j2")
    if(j1sbou3.children.length+j1stout.children.length>j2sbou3.children.length+j2stout.children.length) {
        document.getElementById("j1bermila").innerHTML="1"
        document.getElementById("j2bermila").innerHTML="0"
    }
    else if (j1sbou3.children.length+j1stout.children.length<j2sbou3.children.length+j2stout.children.length) {
        document.getElementById("j1bermila").innerHTML="0"
        document.getElementById("j2bermila").innerHTML="1"
    }
    else {
        document.getElementById("j1bermila").innerHTML="0"
        document.getElementById("j2bermila").innerHTML="0"
    }
}




//-----------------------------------------------------
function dinariScore () {
    for(let i=0;i<dinariSYMBOLS.length;i++) {
        if(cartesORDINATEUR.includes(dinariSYMBOLS[i])) appendCard("j1dinaricartes",searchCard(dinariSYMBOLS[i]))
        else appendCard("j2dinaricartes",searchCard(dinariSYMBOLS[i]))
    }
    let j1=document.getElementById("j1dinaricartes")
    let j2=document.getElementById("j2dinaricartes")
    if(j1.children.length>j2.children.length) {
        document.getElementById("j1dinari").innerHTML="1"
        document.getElementById("j2dinari").innerHTML="0"
    }
    else if (j1.children.length<j2.children.length) {
        document.getElementById("j1dinari").innerHTML="0"
        document.getElementById("j2dinari").innerHTML="1"
    }
    else {
        document.getElementById("j1dinari").innerHTML="0"
        document.getElementById("j2dinari").innerHTML="0"
    }
}
//-----------------------------------------------------------------------------------------


function hayaScore() {
    if(cartesORDINATEUR.includes("7-♦")) {
        appendCard("j1hayacartes",searchCard("7-♦"))
        document.getElementById("j1haya").innerHTML="1"
        document.getElementById("j2haya").innerHTML="0"
    }
    else {
        appendCard("j2hayacartes",searchCard("7-♦"))
        document.getElementById("j1haya").innerHTML="0"
        document.getElementById("j2haya").innerHTML="1"
    }
}

function scoreJoueurs() {
    let score1 = 0
    let score2 = 0
    
    score1+=parseInt(chkobbaORDINATEUR)
    score1+=parseInt(document.getElementById("j1dinari").innerHTML)
    score1+=parseInt(document.getElementById("j1bermila").innerHTML)
    score1+=parseInt(document.getElementById("j1haya").innerHTML)

    score2+=parseInt(chkobbaUTILISATEUR)
    score2+=parseInt(document.getElementById("j2dinari").innerHTML)
    score2+=parseInt(document.getElementById("j2bermila").innerHTML)
    score2+=parseInt(document.getElementById("j2haya").innerHTML)
    
    if (parseInt((document.getElementById("j1karta").innerHTML))>parseInt((document.getElementById("j2karta").innerHTML))){
        score1+=1;
        document.getElementById("j1karta").innerHTML += '<span id="checkedj1"> ✔(+1)</span>';
    }
    else if (parseInt((document.getElementById("j2karta").innerHTML))>parseInt((document.getElementById("j1karta").innerHTML))) {
        score2+=1;
        document.getElementById("j2karta").innerHTML += '<span id="checkedj2"> ✔(+1)</span>';
    }

    document.getElementById("j1totalmanche").innerHTML = score1
    document.getElementById("j2totalmanche").innerHTML = score2

    document.getElementById("score1").innerHTML = parseInt(localStorage.getItem("scorefinalj1"))+parseInt(document.getElementById("j1totalmanche").innerHTML)+"/"+localStorage.getItem("score")
    document.getElementById("score2").innerHTML = parseInt(localStorage.getItem("scorefinalj2"))+parseInt(document.getElementById("j2totalmanche").innerHTML)+"/"+localStorage.getItem("score")
}

dinariScore()
bermilaScore()
hayaScore()
scoreJoueurs()




function continuer () {
    localStorage.setItem("scorefinalj1" , (parseInt(localStorage.getItem("scorefinalj1"))+parseInt(document.getElementById("j1totalmanche").innerHTML)))
    localStorage.setItem("scorefinalj2" , (parseInt(localStorage.getItem("scorefinalj2"))+parseInt(document.getElementById("j2totalmanche").innerHTML)))
    window.location.href = "../pages/chkobba.html";
}

let scoreJeu = parseInt(localStorage.getItem("score"))
let SJ1 = parseInt(document.getElementById("score1").innerHTML.split("/")[0])
let SJ2 = parseInt(document.getElementById("score2").innerHTML.split("/")[0])


if((SJ1>=scoreJeu)&&(SJ1>SJ2)){
    document.getElementById("continuer").disabled=true;
    setTimeout(()=>{window.location.href = "../pages/gameover.html";},2000)
}
else if((SJ2>=scoreJeu)&&(SJ2>SJ1)){
    document.getElementById("continuer").disabled=true;
    setTimeout(()=>{window.location.href = "../pages/congrats.html";},2000)
}








