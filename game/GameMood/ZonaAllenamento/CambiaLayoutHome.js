function ZonaAddestramentoLayout() {
  if (localStorage.getItem('GameMode') == 'ZonaAddestramento') {
    document.getElementById('M_princ').style.top = '-505px'

    document.getElementById('Component+Slots').style.display = 'none';
    document.getElementById('BocchettaRender+Inviti').style.display = 'none';
    document.getElementById('LayoutZonAddestr').style.display = 'flex';
  }
  if (localStorage.getItem('GameMode') == 'BattleRoyale' || localStorage.getItem('GameMode') == 'CampoDiProva') {
    document.getElementById('LayoutZonAddestr').style.display = 'none';
  }
}
