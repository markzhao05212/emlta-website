// About page — "Global reach" dot-matrix world map.
// Continent polygon data, customer city list, and buildMap() approach ported
// verbatim from the design prototype (About.dc.html). Requires the
// @keyframes emltaPulse animation defined in the page's <style> block.
(function () {
  // Rough continent outlines as [lon,lat] polygons — stylized, not survey-grade.
  var continents = [
    // North America
    [[-168,66],[-150,70],[-95,72],[-60,68],[-52,52],[-66,45],[-70,42],[-81,25],[-97,18],[-105,22],[-110,30],[-124,40],[-130,52],[-141,60]],
    // Central America strip
    [[-105,22],[-92,16],[-83,9],[-77,8],[-82,15],[-92,18],[-101,21]],
    // South America
    [[-78,9],[-70,11],[-60,5],[-50,0],[-35,-6],[-40,-20],[-48,-25],[-58,-35],[-66,-43],[-72,-50],[-75,-46],[-71,-30],[-70,-18],[-76,-12],[-80,-4],[-79,2]],
    // Europe
    [[-10,43],[-9,38],[3,40],[12,38],[18,40],[28,41],[40,44],[40,55],[30,60],[22,62],[12,58],[5,58],[-5,50],[-10,50]],
    // Africa
    [[-16,28],[-5,32],[10,34],[24,32],[32,31],[35,24],[43,12],[51,12],[42,-2],[40,-12],[35,-22],[28,-33],[20,-34],[16,-28],[12,-16],[9,4],[-4,5],[-12,12],[-17,20]],
    // Asia
    [[28,41],[40,44],[50,42],[60,38],[68,30],[78,22],[80,12],[92,20],[98,9],[104,10],[109,18],[108,22],[120,32],[122,40],[130,43],[142,48],[140,60],[120,70],[100,76],[70,72],[50,68],[40,66],[36,60],[40,52],[40,44]],
    // SE Asia / Indonesia
    [[96,4],[104,2],[112,-2],[120,-4],[132,-3],[141,-6],[130,-8],[118,-9],[106,-7],[98,2]],
    // Australia
    [[114,-22],[122,-18],[131,-12],[142,-11],[147,-19],[153,-28],[150,-37],[141,-38],[131,-32],[123,-34],[115,-34],[113,-26]],
    // Japan
    [[131,33],[136,35],[140,38],[142,43],[139,40],[135,34],[131,31]],
    // UK
    [[-6,50],[-3,53],[-3,58],[-7,57],[-8,53],[-6,51]],
    // Madagascar
    [[44,-16],[48,-15],[50,-20],[47,-25],[44,-22]],
    // New Zealand
    [[170,-37],[174,-39],[175,-42],[170,-46],[167,-44]],
  ];

  function pointInPoly(lon, lat, poly) {
    var inside = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      var xi = poly[i][0], yi = poly[i][1];
      var xj = poly[j][0], yj = poly[j][1];
      var intersect = ((yi > lat) !== (yj > lat)) &&
        (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  var customers = [
    { city: 'Houston',      lon: -95.4, lat: 29.8 },
    { city: 'Mexico City',  lon: -99.1, lat: 19.4 },
    { city: 'São Paulo',    lon: -46.6, lat: -23.6 },
    { city: 'Frankfurt',    lon: 8.7,   lat: 50.1 },
    { city: 'Istanbul',     lon: 29.0,  lat: 41.0 },
    { city: 'Cairo',        lon: 31.2,  lat: 30.0 },
    { city: 'Johannesburg', lon: 28.0,  lat: -26.2 },
    { city: 'Moscow',       lon: 37.6,  lat: 55.8 },
    { city: 'Mumbai',       lon: 72.9,  lat: 19.1 },
    { city: 'Hanoi',        lon: 105.9, lat: 21.0 },
    { city: 'Jakarta',      lon: 106.8, lat: -6.2 },
    { city: 'Sydney',       lon: 151.2, lat: -33.9 },
  ];
  var hq = { city: 'Weihai', lon: 122.1, lat: 37.5 };

  function proj(lon, lat) {
    return { x: (lon + 180) / 360 * 100, y: (90 - lat) / 180 * 100 };
  }

  function buildMap() {
    var svg = document.getElementById('about-map-svg');
    var pins = document.getElementById('about-map-pins');
    if (!svg || !pins) return;
    var NS = 'http://www.w3.org/2000/svg';

    // --- dot-matrix continents ---
    var step = 3.1;
    for (var lat = 84; lat >= -58; lat -= step) {
      for (var lon = -180; lon <= 180; lon += step) {
        var hit = false;
        for (var k = 0; k < continents.length; k++) {
          if (pointInPoly(lon, lat, continents[k])) { hit = true; break; }
        }
        if (!hit) continue;
        var c = document.createElementNS(NS, 'circle');
        c.setAttribute('cx', (lon + 180).toFixed(1));
        c.setAttribute('cy', (90 - lat).toFixed(1));
        c.setAttribute('r', '0.62');
        c.setAttribute('fill', 'rgba(255,255,255,0.20)');
        svg.appendChild(c);
      }
    }

    // --- pins ---
    var addPin = function (item, isHQ) {
      var p = proj(item.lon, item.lat);
      var wrap = document.createElement('div');
      wrap.style.cssText = 'position:absolute; transform:translate(-50%,-50%); display:flex; align-items:center; gap:6px; white-space:nowrap;';
      wrap.style.left = p.x + '%';
      wrap.style.top = p.y + '%';
      var color = isHQ ? '#5cb84a' : '#e8482e';

      var dotWrap = document.createElement('span');
      dotWrap.style.cssText = 'position:relative; width:' + (isHQ ? 12 : 9) + 'px; height:' + (isHQ ? 12 : 9) + 'px; flex:none;';
      var ring = document.createElement('span');
      ring.style.cssText = 'position:absolute; inset:0; border-radius:50%; background:' + color + '; animation:emltaPulse 2.6s ease-out infinite;';
      var dot = document.createElement('span');
      dot.style.cssText = 'position:absolute; inset:0; border-radius:50%; background:' + color + '; box-shadow:0 0 0 2px rgba(10,19,12,0.9), 0 0 10px ' + color + ';';
      dotWrap.appendChild(ring); dotWrap.appendChild(dot);
      wrap.appendChild(dotWrap);

      if (isHQ) {
        var label = document.createElement('span');
        label.textContent = 'Weihai HQ';
        label.style.cssText = "font-family:'Schibsted Grotesk',sans-serif; font-weight:600; font-size:11px; letter-spacing:0.2px; color:#cfe9c6;";
        wrap.appendChild(label);
      }
      pins.appendChild(wrap);
    };

    customers.forEach(function (c) { addPin(c, false); });
    addPin(hq, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildMap);
  } else {
    buildMap();
  }
})();
