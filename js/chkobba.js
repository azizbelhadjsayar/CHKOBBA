
let pageVolume = 0.5;
let idmorceau = ""
var currentmusic="";

function displaymusic() {
    document.getElementById("musique").style.animation = "Ouvrir 1s ease 0s 1 normal forwards"
    document.getElementById("music-logo").style.visibility = "hidden"
}

function hidemusic () {
    document.getElementById("musique").style.animation = "Fermer 2.5s ease 0s 1 normal forwards"
    setTimeout(() => {
        document.getElementById("music-logo").style.visibility = "visible"
    }, 800);
}

function changeVolume(value) {
    pageVolume = parseInt(value)/100;
    currentmusic.volume = (parseInt(value)/100);
}


document.getElementById("j2mangees").children[0].innerHTML = "Cartes prises par " + localStorage.getItem('playerName');

function unflip(elt) {
    elt.children[0].style.transform = "rotateY(180deg)";
    elt.children[1].style.transform = "rotateY(360deg)";
}

function flip(elt) {
    elt.children[0].style.transform = "rotateY(360deg)";
    elt.children[1].style.transform = "rotateY(180deg)";
}

function random(max) {
    return Math.floor(Math.random() * max);
}

function playSound(path) {
    var sound = new Audio(path);
    sound.play();
}

function pauseplay(value) {
    if(currentmusic=="") {
        playMusic("../sounds/ZiedGharsa.mp3","morceau1")
    }
    if (value){
        currentmusic.play();
        currentmusic.volume = pageVolume;
        let waves = document.getElementById(idmorceau).querySelectorAll(".soundwave");
        for(let i=0; i<waves.length; i++) waves[i].style.animation="music-animation calc(0.03s * var(--i)) linear infinite"
    }
    else {
        currentmusic.pause();
        let waves = document.getElementById(idmorceau).querySelectorAll(".soundwave");
        for(let i=0; i<waves.length; i++) waves[i].style.animation="none"
    }
}


function playMusic(path,id) {
    if(currentmusic!="") currentmusic.pause();
    let waves = document.querySelectorAll(".soundwave");
    for(let i=0; i<waves.length; i++) waves[i].style.animation="music-animation calc(0.03s * var(--i)) linear infinite"
    var music = new Audio(path);
    idmorceau = id;
    music.volume = pageVolume;
    music.play();
    currentmusic = music;
    document.getElementById("PPbutton").checked = "true";
    let titres = document.getElementsByClassName("music")
    for(let i=0 ; i<titres.length ; ++i) {
        titres[i].classList.remove("activeMusic")
    }
    if(!document.getElementById(id).classList.contains("activeMusic"))
        document.getElementById(id).classList.toggle("activeMusic")
}

let marginBottom = 0;
const symbols = {1:"♦",2:"♥",3:"♠",4:"♣"}
let j2selectedTable=[]
let j2selectedcard=[]
let cartes = []

chkobbaj2=0
chkobbaj1=0

let lastPlayerTakes = 0

function chargerCartes() {
    const cards = []
    for(i=0;i<40;i++) {
        do {
            card = (random(10)+1).toString()+"-"+symbols[random(4)+1]
        }while(cards.includes(card))
        cards.push(card)
    }
    
    c = document.getElementById("CartesRestantes").children
    for(i=0;i<c.length;i++) {
        c[i].setAttribute("data-number",cards[i])
        car = c[i].children[0]
        car.style.backgroundImage = "url(../images/"+cards[i]+".png)";
        car.style.backgroundSize = "cover";
    }
}



/* CHKOBBAAAAA POP UP */
function showSurpriseText() {
    var surpriseText = document.getElementById("surpriseText");
    surpriseText.style.display = "block";
    setTimeout(function() {
      surpriseText.style.display = "none";
    }, 2000);
}
  
/* CHKOBBAAAAA POP UP */
function showSadEmoji() {
    var triste = document.getElementById("triste");
    triste.style.display = "block";
    setTimeout(function() {
      triste.style.display = "none";
    }, 2000);
}
//-------------------------------------



function preparerScore (cards,player) {
    let result = []
    let cartes = []
    result.push(player)
    if(player=='utilisateur') result.push(chkobbaj2)
    else result.push(chkobbaj1)
    for(let i=0; i<cards.length;i++) {
        cartes.push(cards[i].getAttribute("data-number"))
    }
    result.push(cartes)
    return result
}

function distribuerTable() {
    for(i=0;i<4;i++) {
        setTimeout(()=>{
            x = cartes[0]
            cartes.splice(0,1);
            x.style.position="relative"
            x.style.marginBottom="0px"
            x.addEventListener("click", selectFromTable)
            x.classList.toggle("ajouterTABLE")
            setTimeout(()=>{
                document.getElementById("table").appendChild(x)
                x.classList.remove("ajouterTABLE")
                playSound("../sounds/carta.mp3")
                setTimeout(()=>{flip(x)},150)
                document.getElementById("nbrestantes").innerHTML = "il reste "+document.getElementById("CartesRestantes").children.length+" cartes";
            },250)
        },500*i)       
    }
}


function selectedTable(clickedCard) {
    if(j2selectedTable.includes(clickedCard)) {
        clickedCard.classList.remove("selected")
        clickedCard.classList.toggle("unselected")
        let index = j2selectedTable.indexOf(clickedCard)
        j2selectedTable.splice(index,1)
        if(j2selectedTable.length==0) document.getElementById("Jeter").disabled = false;
    }
    else {
        document.getElementById("Jeter").disabled = true;
        clickedCard.classList.remove("unselected")
        clickedCard.classList.toggle("selected")
        j2selectedTable.push(clickedCard)
    }
}



function ajusterCartes() {
    x=document.getElementById("CartesRestantes").getElementsByClassName("card")
    for(let i=0; i<x.length;i++) {
        marginBottom++;
        x[i].style.marginBottom=marginBottom.toString()+"px";
    }
}



for(let i=0;i<document.getElementById("CartesRestantes").children.length;i++) {
    cartes.unshift(document.getElementById("CartesRestantes").children[i]);
}



function selected(clickedCard) {
    if(j2selectedcard.length==0||j2selectedcard[0]==clickedCard) {
        if(j2selectedcard.length==0) {
            clickedCard.classList.remove("unselected")
            clickedCard.classList.toggle("selected")
            j2selectedcard.push(clickedCard)
        }
        else {
            clickedCard.classList.remove("selected")
            clickedCard.classList.toggle("unselected")
            j2selectedcard.shift()
        }   
    }
    else if(j2selectedcard.length==1) {
        j2selectedcard[0].classList.remove("selected")
        j2selectedcard[0].classList.toggle("unselected")
        j2selectedcard.shift()
        clickedCard.classList.remove("unselected")
        clickedCard.classList.toggle("selected")
        j2selectedcard.push(clickedCard)
    }
}

function preparerCarte(card,j) {
    if(j==1) {
        card.style.cursor="default"
        card.style.position="relative"
        card.style.marginBottom="0px"
    }
    else {
        card.addEventListener("click", selectFromHand)
        card.style.position="relative"
        card.style.marginBottom="0px"
        setTimeout(()=>{flip(card)},200)
    }
    return card
}


function distribuerJoueurs () {
    setButtons()
        for(let i=0; i<6;i++) {
            if(i==0||i==1||i==2) {
                setTimeout(()=>{
                    c=cartes[0];
                    c.classList.toggle("ajouterJ1");
                    setTimeout(()=>{c.classList.remove("ajouterJ1"); document.getElementById("joueur1").appendChild(preparerCarte(c,1));
                    cartes.splice(0,1);
                    playSound("../sounds/carta.mp3");
                    document.getElementById("nbrestantes").innerHTML = "il reste "+document.getElementById("CartesRestantes").children.length+" cartes";},250)

                },500*i)
    
            }
            else {
                setTimeout(()=>{
                    j = cartes[0]
                    j.classList.toggle("ajouterJ2")
                    setTimeout(()=>{j.classList.remove("ajouterJ2"); document.getElementById("joueur2").appendChild(preparerCarte(j,2));
                    cartes.splice(0,1);
                    playSound("../sounds/carta.mp3");
                    document.getElementById("nbrestantes").innerHTML = "il reste "+document.getElementById("CartesRestantes").children.length+" cartes";},250)
                },500*i)
    
            }
        }
    
    setTimeout(()=>{setButtons()},4000)
}


var selectFromTable = function() {
    selectedTable(this)
};

var selectFromHand = function() {
    selected(this)
};

marginTj2 = 0
document.getElementById("Manger").addEventListener("click",function(){
    sommeTable = 0; 
    for(i=0;i<j2selectedTable.length;i++) {
        sommeTable += parseInt(j2selectedTable[i].getAttribute("data-number").split("-")[0])
    }
    valeurCarte = parseInt(j2selectedcard[0].getAttribute("data-number").split("-")[0])

    if(sommeTable==valeurCarte) {
        document.getElementById("Jeter").disabled = false
        for(i=0;i<j2selectedTable.length;i++) {
            j2selectedTable[i].style.position = "absolute"
            j2selectedTable[i].classList.remove("selected")
            j2selectedTable[i].removeEventListener("click",selectFromTable)
            j2selectedTable[i].style.height = "73px";
            j2selectedTable[i].style.width = "50px";
            j2selectedTable[i].style.marginTop = marginTj2.toString()+"px";
            j2selectedTable[i].style.marginLeft = "50px";
            marginTj2+=5;
            document.getElementById("j2mangees").appendChild(cleanTableCard(j2selectedTable[i]))
        }
        j2selectedcard[0].style.position = "absolute"
        j2selectedcard[0].classList.remove("selected")
        j2selectedcard[0].removeEventListener("click",selectFromHand)
        j2selectedcard[0].children[0].style.cursor="default"
        j2selectedcard[0].style.height = "73px";
        j2selectedcard[0].style.width = "50px";
        j2selectedcard[0].style.marginTop = marginTj2.toString()+"px";
        j2selectedcard[0].style.marginLeft = "50px";
        marginTj2+=5;
        document.getElementById("j2mangees").appendChild(j2selectedcard[0])

        document.getElementById("totalJ2").innerHTML = "Total cartes gagnées " + ((document.getElementById("j2mangees").children.length)-2)
        if((document.getElementById("table").children.length==0)&&(document.getElementById("CartesRestantes").children.length>0)) {
            showSurpriseText()
            playSound("../sounds/chkobba.mp3")
            chkobbaj2++
            unflip(document.getElementById("j2mangees").children[document.getElementById("j2mangees").children.length-1])
            marginTj2+=10
        }

        j2selectedTable=[]
        j2selectedcard=[]

        lastPlayerTakes = 2
        setTimeout(() => {
            jouerOrdinateur()
        }, 500);
    }
})

function lawah () {
    j2selectedcard[0].classList.remove("selected")
    j2selectedcard[0].removeEventListener("click", selectFromHand)
    j2selectedcard[0].addEventListener("click", selectFromTable)
    document.getElementById("table").appendChild(j2selectedcard[0])
    j2selectedcard = []
    if(j2selectedTable.length>0) {
        x=document.getElementById("table").children
        for(let i=0;i<x.length;i++) {
            if(j2selectedTable.includes(x[i])) x[i].classList.remove("selected")
        }
    j2selectedTable=[]
    }
    setTimeout(() => {
        jouerOrdinateur()
    }, 500);
}


document.getElementById("Jeter").addEventListener("click",lawah);

marginTj1 = 0
timeout = 500
/*..............................

.*/
function moveCardsToJ1mangees(cards) {
    timeout = 500
    cards.reverse();
    cards.forEach(card => {
      card.style.transition = 'transform 1s, opacity 4s';
      card.style.transform = 'scale(0.5)';
      card.style.opacity = '0';
      card.children[0].style.cursor = "default";
      setTimeout(() => {
        document.getElementById("j1mangees").appendChild(card);
        card.style.transform = 'translate(0, 0)';
        card.style.opacity = '1';
        card.style.position = 'absolute';
        card.style.height = "73px";
        card.style.width = "50px";
        card.style.marginTop = marginTj1.toString()+"px";
        card.style.marginLeft = "50px";
        marginTj1+=5;
        document.getElementById("totalJ1").innerHTML = "Total cartes gagnées " + ((document.getElementById("j1mangees").children.length)-2)
      }, timeout);
      timeout+=500
    });

    setTimeout(()=>{
        if((document.getElementById("table").children.length==0)&&(document.getElementById("CartesRestantes").children.length>0)) {
            showSadEmoji()
            chkobbaj1++; 
            unflip(document.getElementById("j1mangees").children[document.getElementById("j1mangees").children.length-1])
            marginTj1+=10
        }

        if ((document.getElementById("joueur1").children.length==0)&&(document.getElementById("CartesRestantes").children.length>0)) 
            distribuerJoueurs(); 
        else 
           setTimeout(()=>{checkEND()},1000);
    },timeout+200)
}

function moveCardsToJ1mangeesFINAL(cards) {
    timeout = 500
    cards.forEach(card => {
      card.style.transition = 'transform 4s, opacity 4s';
      card.style.transform = 'translate(0, -50px)';
      card.style.opacity = '0';
      card.style.height = "73px";
      card.style.width = "50px";
      card.style.cursor = "default";

      setTimeout(() => {
        document.getElementById("j1mangees").appendChild(card);
        card.style.transform = 'translate(0, 0)';
        card.style.opacity = '1';
        card.style.position = 'absolute';
        card.style.marginTop = marginTj1.toString()+"px";
        card.style.marginLeft = "50px";
        marginTj1+=20;
        document.getElementById("totalJ1").innerHTML = "Total cartes gagnées " + ((document.getElementById("j1mangees").children.length)-2)

        localStorage.setItem('scoreORDINATEUR',preparerScore(document.getElementById("j1mangees").children,"ordinateur"))
        localStorage.setItem('scoreUTILISATEUR',preparerScore(document.getElementById("j2mangees").children,"utilisateur"))
      }, timeout);
      timeout+=500
    });
    setTimeout(()=>{window.location.href = "../pages/score.html";},timeout+700)
}
/*...............................*/
function moveCardsToJ2mangeesFINAL(cards) {
    timeout = 500
    cards.forEach(card => {
      card.style.transition = 'transform 4s, opacity 4s';
      card.style.transform = 'translate(0, -50px)';
      card.style.opacity = '0';
      card.style.height = "73px";
      card.style.width = "50px";
      card.style.cursor = "default";
      card.style.marginLeft = "50px";
      setTimeout(() => {
        document.getElementById("j2mangees").appendChild(card);
        card.style.transform = 'translate(0, 0)';
        card.style.opacity = '1';
        card.style.position = 'absolute';
        card.style.marginTop = marginTj2.toString()+"px";
        marginTj2+=20;
        document.getElementById("totalJ2").innerHTML = "Total cartes gagnées " + ((document.getElementById("j2mangees").children.length)-2)

        localStorage.setItem('scoreORDINATEUR',preparerScore(document.getElementById("j1mangees").children,"ordinateur"))
        localStorage.setItem('scoreUTILISATEUR',preparerScore(document.getElementById("j2mangees").children,"utilisateur"))
      }, timeout);
      timeout+=500
    })
    setTimeout(()=>{window.location.href = "../pages/score.html";},timeout+700)
}


function cleanTableCard (elt) {
    elt.classList.remove("selected")
    elt.removeEventListener("click", selectFromTable)
    elt.children[0].style.cursor="default"
    return elt
}


function setButtons () {
    x = document.getElementsByClassName("gamebuttons")
    for(i=0;i<2;i++) {
        if(x[i].disabled==true) x[i].disabled=false
        else x[i].disabled = true
    }
}

function possibleTakes (valeur,cartesTable) {
    result = []
    for(let i=0;i<cartesTable.length-1;i++) {
        for(let j=i+1;j<cartesTable.length;j++) {
            if(parseInt(cartesTable[i].getAttribute("data-number").split("-")[0])+parseInt(cartesTable[j].getAttribute("data-number").split("-")[0])==valeur) {
                result.push([cartesTable[i],cartesTable[i].getAttribute("data-number"),cartesTable[j],cartesTable[j].getAttribute("data-number")])
            }
        }
    }

    if(result.length==0) return [false,false]

    for(let x =0; x<result.length;x++) {
        if(result[x].includes("7-♦")) return [true,result[x]]
        else if (result[x].includes("6-♦")) return [true,result[x]]
        else if ((result[x].includes("7-♥"))||(result[x].includes("7-♠"))||(result[x].includes("7-♣"))||(result[x].includes("6-♥"))||(result[x].includes("6-♠"))||(result[x].includes("6-♣"))) return [true,result[x]]
        else if ((result[x].includes("1-♦"))||(result[x].includes("2-♦"))||(result[x].includes("3-♦"))||(result[x].includes("4-♦"))||(result[x].includes("5-♦"))||(result[x].includes("6-♦"))||(result[x].includes("7-♦"))||(result[x].includes("8-♦"))||(result[x].includes("9-♦"))||(result[x].includes("10-♦"))) return [true,result[x]]
    }

    return [true,result[0]]
}


function choixCarte (cartes) {
    if(cartes.length==1) return 0
    else {
        let min = 0
        for(let i=1;i<cartes.length;i++) {
            if (parseInt(cartes[i])<parseInt(cartes[min])) min = i
        }
        return min
    }
}

function jouerOrdinateur () {
    setButtons()
    cartesORDdivs = document.getElementById("joueur1").getElementsByClassName("card")
    cartesTABdivs = document.getElementById("table").getElementsByClassName("card")

    cartesTABnb = []
    cartesTABsymb = []
    cartesORDnb = []
    cartesORDsymb = []

    cartesORD = []
    cartesTAB = []

    for(i=0;i<cartesTABdivs.length;i++) cartesTAB.push(cartesTABdivs[i].getAttribute("data-number"));
    for(i=0;i<cartesORDdivs.length;i++) cartesORD.push(cartesORDdivs[i].getAttribute("data-number"));
    for(i=0;i<cartesTABdivs.length;i++) cartesTABnb.push(cartesTABdivs[i].getAttribute("data-number").split("-")[0]);
    for(i=0;i<cartesTABdivs.length;i++) cartesTABsymb.push(cartesTABdivs[i].getAttribute("data-number").split("-")[1]);
    for(i=0;i<cartesORDdivs.length;i++) cartesORDnb.push(cartesORDdivs[i].getAttribute("data-number").split("-")[0]);
    for(i=0;i<cartesORDdivs.length;i++) cartesORDsymb.push(cartesORDdivs[i].getAttribute("data-number").split("-")[1]);


    CardsToMove = []

    if((cartesORD.includes("7-♦"))&&(possibleTakes(7,cartesTABdivs)[0])) {
        var index = cartesORD.indexOf("7-♦")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(possibleTakes(7,cartesTABdivs)[1][0]))
        CardsToMove.push(cleanTableCard(possibleTakes(7,cartesTABdivs)[1][2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if((cartesTAB.includes("7-♦"))&&(cartesORDnb.includes("7"))) {
        var index = cartesORDnb.indexOf("7")
        var index2 = cartesTAB.indexOf("7-♦")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(cartesTABdivs[index2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if((cartesORDnb.includes("7"))&&(possibleTakes(7,cartesTABdivs)[0])) {
        var index = cartesORDnb.indexOf("7")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(possibleTakes(7,cartesTABdivs)[1][0]))
        CardsToMove.push(cleanTableCard(possibleTakes(7,cartesTABdivs)[1][2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }
    
    else if((cartesORDnb.includes("6"))&&(possibleTakes(6,cartesTABdivs)[0])) {
        var index = cartesORDnb.indexOf("6")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(possibleTakes(6,cartesTABdivs)[1][0]))
        CardsToMove.push(cleanTableCard(possibleTakes(6,cartesTABdivs)[1][2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if((cartesORD.includes("10-♦"))&&(possibleTakes(10,cartesTABdivs)[0])) {
        var index = cartesORD.indexOf("10-♦")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(possibleTakes(10,cartesTABdivs)[1][0]))
        CardsToMove.push(cleanTableCard(possibleTakes(10,cartesTABdivs)[1][2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if((cartesORD.includes("9-♦"))&&(possibleTakes(9,cartesTABdivs)[0])) {
        var index = cartesORD.indexOf("9-♦")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(possibleTakes(9,cartesTABdivs)[1][0]))
        CardsToMove.push(cleanTableCard(possibleTakes(9,cartesTABdivs)[1][2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if((cartesORD.includes("8-♦"))&&(possibleTakes(8,cartesTABdivs)[0])) {
        var index = cartesORD.indexOf("8-♦")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(possibleTakes(8,cartesTABdivs)[1][0]))
        CardsToMove.push(cleanTableCard(possibleTakes(8,cartesTABdivs)[1][2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if((cartesORD.includes("5-♦"))&&(possibleTakes(5,cartesTABdivs)[0])) {
        var index = cartesORD.indexOf("5-♦")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(possibleTakes(5,cartesTABdivs)[1][0]))
        CardsToMove.push(cleanTableCard(possibleTakes(5,cartesTABdivs)[1][2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if((cartesORD.includes("4-♦"))&&(possibleTakes(4,cartesTABdivs)[0])) {
        var index = cartesORD.indexOf("4-♦")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(possibleTakes(4,cartesTABdivs)[1][0]))
        CardsToMove.push(cleanTableCard(possibleTakes(4,cartesTABdivs)[1][2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if((cartesORD.includes("3-♦"))&&(possibleTakes(3,cartesTABdivs)[0])) {
        var index = cartesORD.indexOf("3-♦")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(possibleTakes(3,cartesTABdivs)[1][0]))
        CardsToMove.push(cleanTableCard(possibleTakes(3,cartesTABdivs)[1][2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if((cartesORD.includes("2-♦"))&&(possibleTakes(2,cartesTABdivs)[0])) {
        var index = cartesORD.indexOf("2-♦")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(possibleTakes(2,cartesTABdivs)[1][0]))
        CardsToMove.push(cleanTableCard(possibleTakes(2,cartesTABdivs)[1][2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if((cartesORDnb.includes("10"))&&(possibleTakes(10,cartesTABdivs)[0])) {
        var index = cartesORDnb.indexOf("10")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(possibleTakes(10,cartesTABdivs)[1][0]))
        CardsToMove.push(cleanTableCard(possibleTakes(10,cartesTABdivs)[1][2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if((cartesORDnb.includes("9"))&&(possibleTakes(9,cartesTABdivs)[0])) {
        var index = cartesORDnb.indexOf("9")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(possibleTakes(9,cartesTABdivs)[1][0]))
        CardsToMove.push(cleanTableCard(possibleTakes(9,cartesTABdivs)[1][2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if((cartesORDnb.includes("8"))&&(possibleTakes(8,cartesTABdivs)[0])) {
        var index = cartesORDnb.indexOf("8")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(possibleTakes(8,cartesTABdivs)[1][0]))
        CardsToMove.push(cleanTableCard(possibleTakes(8,cartesTABdivs)[1][2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if((cartesORDnb.includes("5"))&&(possibleTakes(5,cartesTABdivs)[0])) {
        var index = cartesORDnb.indexOf("5")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(possibleTakes(5,cartesTABdivs)[1][0]))
        CardsToMove.push(cleanTableCard(possibleTakes(5,cartesTABdivs)[1][2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if((cartesORDnb.includes("4"))&&(possibleTakes(4,cartesTABdivs)[0])) {
        var index = cartesORDnb.indexOf("4")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(possibleTakes(4,cartesTABdivs)[1][0]))
        CardsToMove.push(cleanTableCard(possibleTakes(4,cartesTABdivs)[1][2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if((cartesORDnb.includes("3"))&&(possibleTakes(3,cartesTABdivs)[0])) {
        var index = cartesORDnb.indexOf("3")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(possibleTakes(3,cartesTABdivs)[1][0]))
        CardsToMove.push(cleanTableCard(possibleTakes(3,cartesTABdivs)[1][2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }


    else if((cartesORD.includes("7-♦"))&&(cartesTABnb.includes("7"))) {
        index = cartesORD.indexOf("7-♦")
        index2 = cartesTABnb.indexOf("7")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(cartesTABdivs[index2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if(cartesORDnb.includes("7")&&(cartesTABnb.includes("7"))) {
        index = cartesORDnb.indexOf("7")
        index2 = cartesTABnb.indexOf("7")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(cartesTABdivs[index2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if(cartesORDnb.includes("6")&&(cartesTABnb.includes("6"))) {
        index = cartesORDnb.indexOf("6")
        index2 = cartesTABnb.indexOf("6")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(cartesTABdivs[index2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if(cartesORDnb.includes("5")&&(cartesTABnb.includes("5"))) {
        index = cartesORDnb.indexOf("5")
        index2 = cartesTABnb.indexOf("5")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(cartesTABdivs[index2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if(cartesORDnb.includes("4")&&(cartesTABnb.includes("4"))) {
        index = cartesORDnb.indexOf("4")
        index2 = cartesTABnb.indexOf("4")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(cartesTABdivs[index2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if(cartesORDnb.includes("3")&&(cartesTABnb.includes("3"))) {
        index = cartesORDnb.indexOf("3")
        index2 = cartesTABnb.indexOf("3")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(cartesTABdivs[index2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if(cartesORDnb.includes("2")&&(cartesTABnb.includes("2"))) {
        index = cartesORDnb.indexOf("2")
        index2 = cartesTABnb.indexOf("2")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(cartesTABdivs[index2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if(cartesORDnb.includes("1")&&(cartesTABnb.includes("1"))) {
        index = cartesORDnb.indexOf("1")
        index2 = cartesTABnb.indexOf("1")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(cartesTABdivs[index2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if(cartesORDnb.includes("8")&&(cartesTABnb.includes("8"))) {
        index = cartesORDnb.indexOf("8")
        index2 = cartesTABnb.indexOf("8")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(cartesTABdivs[index2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if(cartesORDnb.includes("9")&&(cartesTABnb.includes("9"))) {
        index = cartesORDnb.indexOf("9")
        index2 = cartesTABnb.indexOf("9")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(cartesTABdivs[index2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else if(cartesORDnb.includes("10")&&(cartesTABnb.includes("10"))) {
        index = cartesORDnb.indexOf("10")
        index2 = cartesTABnb.indexOf("10")
        flip(cartesORDdivs[index])
        CardsToMove.push(cartesORDdivs[index])
        CardsToMove.push(cleanTableCard(cartesTABdivs[index2]))
        lastPlayerTakes = 1
        setTimeout(()=>{moveCardsToJ1mangees(CardsToMove)},700)
    }

    else {
        index = choixCarte(cartesORDnb) 
        flip(cartesORDdivs[index])
        setTimeout(()=>{
            cartesORDdivs[index].children[0].style.cursor = "pointer"
            cartesORDdivs[index].addEventListener("click", selectFromTable)
            document.getElementById("table").appendChild(cartesORDdivs[index])
        },1000)

        setTimeout(()=>{
            if ((document.getElementById("joueur1").children.length==0)&&(document.getElementById("CartesRestantes").children.length>0)) {
                setTimeout(()=>{distribuerJoueurs()},1000)
            }
            else if((document.getElementById("joueur1").children.length==0)&&(document.getElementById("table").children.length==0)&&(document.getElementById("CartesRestantes").children.length==0)) {
                localStorage.setItem('scoreORDINATEUR',preparerScore(document.getElementById("j1mangees").children,"ordinateur"))
                localStorage.setItem('scoreUTILISATEUR',preparerScore(document.getElementById("j2mangees").children,"utilisateur"))
                setTimeout(()=>{window.location.href = "../pages/score.html";},timeout+700)
            }
            else setTimeout(()=>{checkEND()},1000) 
        },1000)
    }

    setTimeout(()=>{setButtons()},2700)
}

function checkEND () {
    if((document.getElementById("CartesRestantes").children.length==0)&&(document.getElementById("joueur1").children.length==0)) {
        //alert("WFEEEEEEEEEEEET LO3BAAAAAAAAAAA")
        let last=""
        if(lastPlayerTakes==1) last="ordinateur"
        else last="utilisateur"

        if (document.getElementById("table").children.length>0) {
            if(last=="utilisateur") {
                let CardsToMove = []
                for(i=0;i<document.getElementById("table").children.length;i++) {
                    x=document.getElementById("table").children[i]
                    CardsToMove.push(cleanTableCard(x))
                }
                setTimeout(()=>{moveCardsToJ2mangeesFINAL(CardsToMove)},700)
            }
            else {
                let CardsToMove = []
                for(i=0;i<document.getElementById("table").children.length;i++) {
                    x=document.getElementById("table").children[i]
                    CardsToMove.push(cleanTableCard(x))
                }
                setTimeout(()=>{moveCardsToJ1mangeesFINAL(CardsToMove)},700)
            }
        }

        else {
            localStorage.setItem('scoreORDINATEUR',preparerScore(document.getElementById("j1mangees").children,"ordinateur"))
            localStorage.setItem('scoreUTILISATEUR',preparerScore(document.getElementById("j2mangees").children,"utilisateur"))
            window.location.href = "../pages/score.html";
        }
    }
}

function startGame () {
    chargerCartes()
    ajusterCartes()
    setTimeout(()=>{
        distribuerTable()
    },800)
    setTimeout(()=>{
        distribuerJoueurs()
    },3500)
}

startGame()


