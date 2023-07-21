function AppImp() { //Applica impostazioni
  //Seleziona tutti gli input di: Partita
  const QndStPICh = document.getElementById('QndStPICh'); //Quand. Start Partit. Invia Chan.
  const GiocMax = document.getElementById('GiocMax'); //Giocat. Max
  const Sqad = document.getElementById('Sqad'); //Squadre
  const DimSq = document.getElementById('DimSq'); //Dimens. Squad.
  const LimGen = document.getElementById('LimGen'); //Limite Gener.
  const DURPASq = document.getElementById('DURPASq'); //Dopo Ultim. Gener. Pas. A Squad.
  const NumR = document.getElementById('NumR'); //Numer. Round
  const LimTemp = document.getElementById('LimTemp'); //Limit. temp.
  const ElimFin = document.getElementById('ElimFin'); //Eliminaz. per Finire
  const CSopVin = document.getElementById('CSopVin'); //Chi Soprav. Vince
  const SqGiocIngDP = document.getElementById('SqGiocIngDP'); //Squad. Giocatat. Ingres. Durant. partit.
  const LuogGen = document.getElementById('LuogGen'); //Luog. Generaz.
  const SpetASq = document.getElementById('SpetASq'); //Spet. Altre Squad.

  //Controlla che i valori siano corretti

  //Mette le impostazioni nel three di dati:
  const data = {
    Mappa_Creativa_senza_nome: {
      ImpostazioniMappa_Partita: {
        "QndStPICh": QndStPICh.value,
        "GiocMax": GiocMax.value,
        "Sqad": Sqad.value,
        "DimSq": DimSq.value,
        "LimGen": LimGen.value,
        "DURPASq": DURPASq.value,
        "NumR": NumR.value,
        "LimTemp": LimTemp.value,
        "ElimFin": ElimFin.value,
        "CSopVin": CSopVin.value,
        "SqGiocIngDP": SqGiocIngDP.value,
        "LuogGen": LuogGen.value,
        "SpetASq": SpetASq.value,
      },
      ImpostazioniMappa_Impostazioni: {
        "a": "a",
      },
      Terreno_mappa: {

      },
    },
  };
  // Converti l'oggetto in formato JSON
  const jsonData = JSON.stringify(data);
  // Salva il JSON nel Session Storage
  sessionStorage.setItem("Dati Creativa", jsonData);



  //Seleziona gli input di: Impostazioni

  return "Dati Creativa impostati";
}