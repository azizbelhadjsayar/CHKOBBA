function commencer () {
    if((document.getElementById("score").value=="")||(document.getElementById("nom").value=="")) alert("Vous devez remplir les deux champs !")
    else {
        localStorage.setItem("score",document.getElementById("score").value)
        localStorage.setItem("playerName",document.getElementById("nom").value)
        localStorage.setItem("scorefinalj1" , 0)
        localStorage.setItem("scorefinalj2" , 0)
        window.location.href = "pages/chkobba.html"
    }
}