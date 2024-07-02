# Contribuisci a The Bocchette 2
Il team di The Bocchette 2 è felice per tua iniziativa di contribuire, ma prima ti chiediamo di seguire le istruzioni qui per avere info su come contribuire al meglio.

## Nuovo Issue
### Prima di inizare
- **Cerca un Issue già esistente** che è simile al tuo, in questo modo eviteremo duplicati.
- Se è un **problema riguardante la sicurezza**, usa: [Segnala una vulnerabilità di sicurezza](https://github.com/Croc-Prog-github/The-Bocchette-2/security/advisories/new). Si prega di non segnalare vulnerabilità di sicurezza tramite Issue pubblici.

### Passaggi per contribuire
- **Sciegli il tipo di Issue**: 
  - Hai una idea per una **nuova funzionalità**? Utilizza: [Richiedi nuova funzionalità](https://github.com/Croc-Prog-github/The-Bocchette-2/issues/new?assignees=&labels=Richiedi+funzionalit%C3%A0&projects=&template=richiedi-funzionalit%C3%A0.md&title=)
  - Hai trovato un **errore/problema**? Utilizza: [Segnala un Bug](https://github.com/Croc-Prog-github/The-Bocchette-2/issues/new?assignees=&labels=Bug&projects=&template=segnala-un-bug.md&title=)
  - Hai trovato errori/imprecisioni nella **documentazione** (contenuta nella Wiki di GitHub)? Utilizza: [Problemi nella documentazione](https://github.com/Croc-Prog-github/The-Bocchette-2/issues/new?assignees=&labels=Docs+Issue&projects=&template=problemi-documentazione.md&title=)
- **Compila il modulo**: Completa le informazioni richieste nel modulo, fornisci abbastanza informazioni in maniera chiara. Seguendo questi requisiti è più probabile che il tuo problema/richiesta venga compreso e implementato/risolto.

Grazie per aver contribuito a rendere migliore The Bocchette 2! 🚀🎉

<hr>

## Risolvi un Issue
### Prima di iniziare
- Assicurati di avere istallato [Git](https://git-scm.com/downloads) nel tuo PC.
- Clona il repository da GitHub usando il comando: `git clone https://github.com/Croc-Prog-github/The-Bocchette-2.git`

### Passaggi per contribuire
1. **Sciegli un Issue**: Scegli un problema dal [registro degli Issue](https://github.com/Croc-Prog-github/The-Bocchette-2/issues) o apri un [nuovo issue](#nuovo-issue).
2. **Indica il tuo impegno**: Assegna a te stesso l'Issue per indicare che stai lavorando su di esso.
3. **Crea il tuo ramo**: Crea un nuovo Branch separato, per implementare Commits sul tuo contributo. Per creare un nuovo ramo usa il comando:
```git_bash
  git checkout -b branch-name
```
4. **Modifica**: Fai le tue modifiche, seguendo, possibilmente lo [stile di programmazione](#stile-di-programmazione) e utilizzando le informazioni fornite nel Issue.
5. **Commissiona**: Fai il commit delle tue modifiche, usa il comando:
```git_bash
  git commit -m "Description of your commit"
```
6. **Update nel tuo branch**: Pusha il tuo branch, usa il comando:
```git_bash
  git push origin branch-name
```
7. **Pull Request**: Apri una [Pull Request](https://github.com/Croc-Prog-github/The-Bocchette-2/compare) sul repository. Assicurati di descrivere chiaramente le tue modifiche.

Grazie per aver contribuito a rendere migliore The Bocchette 2! 🚀🎉

## Stile di programmazione
Lo stile di programmazione di The Bocchette 2, serve per facilitare il modo di revisionare il codice tra Contributori e Revisori, creando così un metodo comune e velocizzando il lavoro.
### HTML
Regole per ottimizzare lo stile del codice per il linguaggio HTML:
- L'elemento `<script></script>`
  - Se contine JS và definito dopo la chiusura di `</body>` e `</html>`, ci possono essere eccezioni, se lo script ha a che fare con il caricamento "anticipato" di qualcosa.
  - Se contiene la definizione per file JS, deve essere dichiarato dentro `<head></head>`, più precisamente dove c'è il commento `<!-- Content -->`, sotto l'ultima dichiarazione (dall'alto verso il basso). Esempio:
  ```HTML
  <head>
    <!-- Content -->
    <script src="/Script.js"></script>
  </head>
  ```
  - Negli `<script></script>` che contengono JS, subito dopo `<script>`, va scritto un commento che descriva brevemente il comportamento dello script. Esempio:
  ```HTML
  <script> //Comportamento dello script
    // JS
  </script>
  ```
- Per l'elemento `<style></style>`
  - Se contine CSS và definito dopo la chiusura di `</body>` e `</html>`.
  - Se contiene la definizione per file CSS, deve essere dichiarato dentro `<head></head>`, più precisamente dove c'è il commento `<!-- Content -->`, sotto l'ultima dichiarazione (dall'alto verso il basso). Esempio:
  ```HTML
  <head>
    <!-- Content -->
    <link rel="stylesheet" href="/Style.css">
  </head>
  ```
- Per tutti gli altri elementi, predefinitivamente, l'ordine degli attributi è: `<div name="" id="" class="" style=""></div>`.
  - L'attributo `name=""` è utilizzato come annotazione a scopo di riferimento per un particolare punto di codice.
  - Non preferiamo usare `id` per assegnare css ai singoli elementi, ma usiamo direttamente per i singoli elementi l'attibuto `style=""`. Ovviamente per elementi che si ripetono si utilizza `class=""`.

### JavaScript/TypeScript
Regole per ottimizzare lo stile del codice per il linguaggio JS/TS:
- Quando bisogna effettuare un'unione, stringa-numero, preferiamo utilizzare `console.log("Counter: " + VarCounter)` anzichè `console.log(Counter: ${VarCounter})`.
- Quando bisogna interaggire con l'ID di qualcosa, preferiamo evitare l'uso di variabili e di aquisirlo direttamente, così, esempio:
```JS
  document.getElementById("ID").innerText = "New text";
```
Ovviamente se è necessario usare delle variabili, si può bypassare questa regola.

<!--
### CSS
-->