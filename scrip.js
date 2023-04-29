function changeImage(btn){
    let img = document.querySelector(".foto");
    img.setAttribute("src", btn);
}

function verificaPalindromo(palavra){
    var inverso = palavra.split("").reverse().join("");    
    if(palavra.toLowerCase() == inverso.toLowerCase()){
        console.log("é palindromo");
    }else{
        console.log("não é palindromo");
    }
}


