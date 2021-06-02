function matchingPasswords(){
    if (document.getElementById("password").value === document.getElementById("passwordAgain").value){
        return true
    }
    document.getElementById("passwords-not-matching").style.display = 'block'
    return false
}