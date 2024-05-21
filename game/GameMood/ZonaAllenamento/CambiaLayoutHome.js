function ZonaAddestramentoLayout() {
  if(localStorage.getItem('GameMode') == 'ZonaAddestramento') {
    document.getElementById('M_princ').style.top = '203px';

    document.getElementById('Component+Slots').style.display = 'none';
    document.getElementById('BocchettaRender+Inviti').style.display = 'none';
  }
}

