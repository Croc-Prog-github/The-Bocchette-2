# Guida Terminale The Bocchette 2
In questa guida è illustrato come usare molti dei comandi del Terminale di The Bocchete 2.<br>
> [!IMPORTANT] 
> Solo gli Account Sviluppatore hanno accesso alla console di TB2, che si trova nel menù principale della Lobby.

## Comandi di sistema del Terminale
I comandi di sistema servono per visualizzare valori e per modificare impostazioni comuni, questi sono i principali comandi:
<br>
**`--help`**: Apre la guida dei comandi.<br>
**`--clear`**: Pulisce il testo del terminale.<br>

## Comandi iniziali
Quando scrivi un nuovo comando nel Terminale di TB2, puoi iniziare da questi comandi di partenza, dalla quale si diramano altri sotto-comandi.

### Citazione utente: 
Serve per _targhettare_ un utente, tutti i comandi successivi saranno applicati all'utente che è stato nominato. Utilizza:
```cmd
@ Username
```
[Scopri sottocomandi di: @ Username](#sottocomandi-per--username)

<hr>

### Esplora risorse dei Server:
Serve per indirizzarti nel file Explorer dei server di TB2, tutti i comandi successivi saranno applicati al percorso digitato.
```cmd
/ path
```
[Scopri sottocomandi di: / path](#sottocomandi-per--path)

> [!NOTE]
> Per digitare un nuovo comando e interrompere i comandi destinati al comando precedente, digitare:
```cmd
break
```



## Sottocomandi per `/ path`
**/ ActualPath/ expl**: Mostra l'elenco di file che sono dento il percorso attuale.
<br>

**/ ArchivServ**: Vai al percorso per il server dedicato all'archiviazione.
<br>

**/ MultipServ**: Vai al percorso per il server dedicato al multiplayer, dove sono in esecuzione tutte le partite Multiplayer.

## Sottocomandi per `@ Username`
**`ban ${motivazione} ${tempo(m, h, d)}`**: banna il giocatore dal gioco con una motivazione per un dato tempo (scrivi %p) per ban permanente.<br>
**`set ${valuta(soldi,gemme,gett)} ${numero}`**: Imposta una valùta ad un valore numerico intero.<br>
**`chance ${valuta(soldi,gemme,gett)} ${±numero}`**: Aggiunge o sottrae il valore numerico della valùta selezionata.<br>

