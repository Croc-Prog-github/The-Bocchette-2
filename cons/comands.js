const inp = document.getElementById('inp');
const out = document.getElementById('out');

inp.placeholder = 'digita: @, / per iniziare...';

function Enter() {
    let comand = inp.value;

    if (comand == '--help') {
        out.innerText += comand;
        out.innerHTML += '<br>';
        window.open('https://github.com/Croc-Prog-github/The-Bocchette-2/wiki/Guida-Terminale-The-Bocchette-2', '_blank');
    }
    else if (comand == '--clear') {
        out.innerHTML = 'The Bocchette 2 Console<br>Digita: --help per consultare la guida<br>';
    }
    else if (/^@ [^\s]+$/.test(comand)) {
        inp.placeholder = 'Digita: break per dissociare utente; comandi indirizzati a:' + comand;

        out.innerText += comand;
        out.innerHTML += '<br>';
        out.innerText += 'Comandi indirizzati a utente:' + comand;
        out.innerHTML += '<br>';
    } if (comand == 'break') {
        out.innerText += comand;
        out.innerHTML += '<br>';
        inp.placeholder = 'digita: @, / per iniziare...';
    }
    else {
        out.innerText += comand;
        out.innerHTML += '<br>';
        out.innerText += 'Comando sconosciuto.';
        out.innerHTML += '<br>';
    }


    inp.value = '';
}