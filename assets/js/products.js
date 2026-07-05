// Products page: category filter + product detail modal.
// Catalog data ported verbatim from the design handoff (Products.dc.html).
(function () {
  'use strict';

  // ---------- Catalog data (verbatim from the prototype's products() method) ----------

  function baseProps(iv) {
    return [
      { k: 'Appearance', v: 'White Powder' },
      { k: 'Volatile Level', v: '≤1.0 wt%' },
      { k: 'Particle Size (0.425 mm mesh on)', v: '≤2.0%' },
      { k: 'Bulk Density', v: '≥0.30 g/cm³' },
      { k: 'Intrinsic Viscosity [η]', v: iv + ' (100 ml/g)' },
    ];
  }

  var theme = {
    processing: { headerBg: '#f3f6f1', codeColor: '#0d2e1a', accent: '#3a9e2e' },
    foaming:    { headerBg: '#e8f1e3', codeColor: '#0d2e1a', accent: '#3a9e2e' },
    impact:     { headerBg: '#dbe7d6', codeColor: '#0d2e1a', accent: '#2f7d27' },
  };
  var catLabel = { processing: 'Processing Aid', foaming: 'Foaming Aid', impact: 'Impact Modifier' };

  var PRODUCTS = [
    { code: 'AS-869', cat: 'processing', name: 'Ultra-High MW Processing Aid',
      spec: 'IV 10.0–15.0 · 100 ml/g',
      blurb: 'Styrene-acrylonitrile copolymer, MW ~5,000,000. Smaller additions for the same processing function at lower cost; also lifts gloss in ABS.',
      longDesc: 'AS-869 is a styrene-acrylonitrile copolymer with ultra-high molecular weight (~5,000,000). Compared with other processing aids it delivers the same processing function with smaller additions and at lower cost. Mainly used in ABS, PVC and other polymers.',
      tags: ['SAN copolymer', 'PVC + ABS'],
      benefits: ['Good dispersion into PVC and other polymers', 'Decreases fusion time; improves foam cell structure & strength', 'Improves thermoforming control', 'Facilitates high gloss for ABS and other polymers'],
      properties: baseProps('10.0–15.0'),
      images: [] },
    { code: 'K-121', cat: 'processing', name: 'General-Purpose Processing Aid',
      spec: 'IV 3.0–5.0 · 100 ml/g',
      blurb: 'Acrylic process aid for window profile, siding, fence, pipe, fittings and transparent sheet. Improves fusion and melt strength.',
      longDesc: 'K-121 is a general-purpose acrylic process aid for PVC building and construction materials such as window profile, siding, fence, pipe, fittings and other injection parts — and for transparent sheet. It improves fusion behaviour and enhances melt strength.',
      tags: ['Acrylic', 'Profiles & pipe'],
      benefits: ['Higher dispersibility in the PVC melt', 'Better melt-strength enhancement', 'Improvement on surface uniformity', 'Excellent fusion promotion efficiency'],
      properties: baseProps('3.0–5.0'),
      images: [{ src: '../assets/images/products/K-121-1.gif', cap: 'Fig. 1 — Brabender fusion behaviour' }] },
    { code: 'K-123', cat: 'processing', name: 'General-Purpose Processing Aid',
      spec: 'IV 3.0–5.0 · 100 ml/g',
      blurb: 'Versatile process aid for building products and foam applications. High dispersibility with efficient fusion promotion.',
      longDesc: 'K-123 is a general-purpose process aid for PVC building and construction materials — window profile, siding, fence, pipe, fittings and injection parts — and can also be used in foam applications. It accelerates fusion and improves surface uniformity and gloss.',
      tags: ['Acrylic', 'Foam-ready'],
      benefits: ['Higher dispersibility in the PVC melt', 'Excellent fusion promotion efficiency', 'Better melt-strength enhancement', 'Improvement on surface uniformity'],
      properties: baseProps('3.0–5.0'),
      images: [{ src: '../assets/images/products/K-123-1.gif', cap: 'Fig. 1 — Fusion behaviour' }, { src: '../assets/images/products/K-123-2.gif', cap: 'Fig. 2 — Surface uniformity comparison' }, { src: '../assets/images/products/K-123-3.gif', cap: 'Fig. 3 — Fusion promotion' }] },
    { code: 'K-125', cat: 'processing', name: 'General-Purpose Processing Aid',
      spec: 'IV 4.0–6.0 · 100 ml/g',
      blurb: 'For profiles and pipe plus foam molding, deep-draw containers and semi-rigid / soft PVC. Excellent melt-strength enhancement.',
      longDesc: 'K-125 is a general-purpose acrylic processing aid for building and construction materials, and for special applications such as PVC foam moulding, deep-bottom containers and semi-rigid / soft PVC goods. It improves fusion behaviour and enhances melt strength.',
      tags: ['Acrylic', 'Versatile'],
      benefits: ['Higher dispersibility in the PVC melt', 'Excellent melt-strength enhancement', 'Improvement on surface uniformity', 'Excellent fusion promotion efficiency'],
      properties: baseProps('4.0–6.0'),
      images: [{ src: '../assets/images/products/K-125-1.jpg', cap: 'Figs. 1 & 2 — Fusion time & curve vs. competitor' }] },
    { code: 'K-175', cat: 'processing', name: 'Lubricating Processing Aid',
      spec: 'IV 0.5–1.5 · 100 ml/g',
      blurb: 'Acrylic aid with external-lubricant performance — enhanced metal release, higher output and high clarity for clear PVC.',
      longDesc: 'K-175 is an acrylic processing aid with lubricant performance. Used alone or with other aids to promote PVC fusion, its acrylic composition provides external lubrication without the incompatibility of conventional lubricants — valuable in clear PVC for blow-moulded containers and calendered or extruded sheet, plus opaque siding, pipe and fittings.',
      tags: ['Acrylic', 'Lubricating'],
      benefits: ['Enhanced metal release', 'Increased output rates & improved flow', 'Improved thermal stability', 'High clarity and brilliance', 'Reduced downtime for roll or mould cleanup', 'Less scrap'],
      properties: baseProps('0.5–1.5'),
      images: [{ src: '../assets/images/products/K-175-1.png', cap: 'Fig. 1 — Brabender fusion time comparison' }, { src: '../assets/images/products/K-175-2.png', cap: 'Fig. 2 — Brabender fusion curve' }] },
    { code: 'K-385', cat: 'foaming', name: 'Foaming Processing Aid',
      spec: 'IV 6.0–7.5 · 100 ml/g',
      blurb: 'Multi-layer high-MW acrylate aid for low-foamed boards, profiles and ceilings. Low density, uniform cells, high surface gloss.',
      longDesc: 'K-385 is a multi-layer structured high-molecular-weight foaming processing aid made from acrylate copolymer by multi-step emulsion polymerisation. It suits PVC foaming processes — clapboard, billboard, profiles and ceiling — and general low-foamed boards, pipes and profiles, plus special PVC sheet and tile.',
      tags: ['Foaming', 'High MW'],
      benefits: ['Low density', 'Uniform cell structure', 'Excellent surface gloss', 'Outstanding melt-strength enhancement'],
      properties: baseProps('6.0–7.5'),
      images: [{ src: '../assets/images/products/K-385-1.jpg', cap: 'Figs. 1–4 — Fusion, melt strength, gloss & density' }, { src: '../assets/images/products/K-385-2.jpg', cap: 'Foam performance data' }, { src: '../assets/images/products/K-385-3.jpg', cap: 'Foam performance data' }] },
    { code: 'K-418', cat: 'foaming', name: 'Foaming Processing Aid',
      spec: 'IV 10.0–12.0 · 100 ml/g',
      blurb: 'Multi-layer (methyl)methacrylate aid for free, Celuka and co-extrusion foam. Outstanding melt strength and surface gloss.',
      longDesc: 'K-418 is a multi-layer structured high-molecular-weight foaming processing aid made from (methyl) methacrylate copolymer by multi-step emulsion polymerisation. It suits PVC foam processes such as free foam, Celuka foam and co-extrusion foam — favourable for foam boards, pipes and profiles.',
      tags: ['Foaming', 'Multi-layer'],
      benefits: ['Low density', 'Uniform cell structure', 'Excellent surface gloss', 'Outstanding melt-strength enhancement'],
      properties: baseProps('10.0–12.0'),
      images: [{ src: '../assets/images/products/K-418-1.gif', cap: 'Fig. 1 — Fusion behaviour' }, { src: '../assets/images/products/K-418-2.gif', cap: 'Fig. 2 — Melt cohesion & uniformity' }, { src: '../assets/images/products/K-418-3.gif', cap: 'Fig. 3 — Melt strength' }] },
    { code: 'KM-310', cat: 'impact', name: 'Acrylic Impact Modifier',
      spec: 'Bulk density ≥0.40 g/cm³',
      blurb: 'Core/shell acrylic modifier for rigid PVC — windows, pipe, fittings and siding. Excellent weatherability and impact strength.',
      longDesc: 'KM-310 is an acrylic impact modifier with a core/shell structure — a moderately cross-linked core grafted with shell. It improves the impact strength of rigid PVC and accelerates fusion with minimal effect on the resin’s inherent properties — ideal for window profiles, pipes, fittings, frames, siding, fence and injection moulding.',
      tags: ['Core / shell', 'Weatherable'],
      benefits: ['Excellent weatherability', 'Better impact strength', 'Lower post-extrusion shrinkage', 'Outstanding surface quality', 'Better thermal stability'],
      properties: [
        { k: 'Appearance', v: 'White Powder' },
        { k: 'Volatile Level', v: '≤1.0 wt%' },
        { k: 'Particle Size (0.425 mm mesh on)', v: '≤2.0%' },
        { k: 'Bulk Density', v: '≥0.40 g/cm³' },
      ],
      images: [{ src: '../assets/images/products/KM-310-1.gif', cap: 'Fig. 1 — Fusion behaviour vs. CPE' }, { src: '../assets/images/products/KM-310-2.gif', cap: 'Fig. 2 — Impact efficiency' }] },
    { code: 'KM-355', cat: 'impact', name: 'Acrylic Impact Modifier',
      spec: 'Charpy ≥18.0 KJ/m² (23°C)',
      blurb: 'Impact modifier for outdoor rigid PVC with strong fusion promotion, reducing processing-aid use and post-extrusion shrinkage.',
      longDesc: 'KM-355 is an acrylic impact modifier for outdoor rigid PVC — window profiles, clapboards, siding, fence, pipes, fittings and injection moulding. Its strong fusion-promotion performance increases extrusion capacity and reduces the need for processing aid or inner lubricant.',
      tags: ['Acrylic', 'Outdoor'],
      benefits: ['Excellent impact strength', 'Better weatherability', 'Efficient fusion promotion (more capacity, less processing aid)', 'Lower shrinkage after extrusion'],
      properties: [
        { k: 'Appearance', v: 'White Powder' },
        { k: 'Volatile Level', v: '≤1.0 wt%' },
        { k: 'Particle Size (0.425 mm mesh on)', v: '≤2.0%' },
        { k: 'Bulk Density', v: '≥0.40 g/cm³' },
        { k: 'Charpy Impact Strength (23°C)', v: '≥18.0 KJ/m²' },
        { k: 'Charpy Impact Strength (−10°C)', v: '≥10.0 KJ/m²' },
      ],
      images: [{ src: '../assets/images/products/KM-355-1.jpg', cap: 'Fig. 1 — Fusion curve vs. competitor' }, { src: '../assets/images/products/KM-355-2.jpg', cap: 'Fig. 2 — Impact strength' }] },
    { code: 'MBS JHB-23', cat: 'impact', name: 'MBS Impact Modifier',
      spec: 'Equiv. Rohm & Haas BTA-730',
      blurb: 'MMA-butadiene-styrene terpolymer for transparent rigid PVC film and sheet — high impact resistance with high clarity.',
      longDesc: 'MBS JHB-23 is a terpolymer of methyl methacrylate (M), butadiene (B) and styrene (S), used mainly in rigid PVC processing. It gives PVC products high impact resistance with high transparency and good crease-whitening resistance — chiefly for PVC film and sheet. Equivalent grade: Rohm & Haas BTA-730.',
      tags: ['Transparent', 'MBS'],
      benefits: ['High impact resistance', 'High transparency', 'Good crease-whitening resistance', 'Excellent chemical stability & thermoplasticity'],
      properties: [
        { k: 'Appearance', v: 'White Powder' },
        { k: 'Granularity (20 mesh throughput)', v: '98%' },
        { k: 'Volatile Component', v: '≤1.0%' },
        { k: 'Bulk Density', v: '0.30–0.50 g/cm³' },
        { k: 'Equivalent Grade', v: 'R&H BTA-730' },
      ],
      images: [] },
    { code: 'CPE-135A', cat: 'impact', name: 'Chlorinated Polyethylene',
      spec: 'Chlorine 35 ± 2%',
      blurb: 'CPE impact modifier delivering toughness and weatherability for profiles, pipe and sheet across demanding outdoor service.',
      longDesc: 'CPE-135A is a chlorinated polyethylene impact modifier with ~35% chlorine content. It delivers toughness and weatherability for rigid PVC profiles, pipe and sheet, and is produced under strict quality control to consistent index values.',
      tags: ['CPE', '35% Cl'],
      benefits: ['Toughness and impact resistance', 'Weatherability for outdoor service', 'Low heat of fusion', 'Consistent, certified quality'],
      properties: [
        { k: 'Chlorine Content', v: '35 ± 2%' },
        { k: 'Heat of Fusion', v: '≤2.0 J/g' },
        { k: 'Volatile Matter', v: '≤0.4%' },
        { k: 'Particle Size (0.9 mm sieve on)', v: '≤2.0%' },
        { k: 'Hardness (Shore A)', v: '≤65' },
        { k: 'Tensile Strength', v: '≥6.0 MPa' },
        { k: 'Ultimate Elongation', v: '≥600%' },
      ],
      images: [] },
  ];

  // ---------- Category filter ----------

  var chips = document.querySelectorAll('.filter-chip');
  var cards = document.querySelectorAll('.product-card');

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var filter = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.classList.toggle('active', c === chip); });
      cards.forEach(function (card) {
        var show = filter === 'all' || card.getAttribute('data-cat') === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  // ---------- Detail modal ----------

  var overlay = document.getElementById('product-modal');
  var head = document.getElementById('modal-head');
  var catEl = document.getElementById('modal-cat');
  var codeEl = document.getElementById('modal-code');
  var nameEl = document.getElementById('modal-name');
  var bodyEl = document.getElementById('modal-body');
  var closeBtn = document.getElementById('modal-close');
  var isOpen = false;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var CHECK_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a9e2e" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>';
  var ARROW_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>';

  function renderModal(p) {
    var t = theme[p.cat];
    head.style.background = t.headerBg;
    catEl.style.color = t.accent;
    catEl.textContent = catLabel[p.cat];
    codeEl.style.color = t.codeColor;
    codeEl.textContent = p.code;
    nameEl.textContent = p.name;

    var html = '<p class="modal-desc">' + esc(p.longDesc) + '</p>';

    html += '<div class="modal-sec">' +
      '<span class="modal-sec-label">Key benefits</span>' +
      '<div class="benefit-grid">' +
      p.benefits.map(function (b) {
        return '<div class="benefit">' + CHECK_SVG + '<span>' + esc(b) + '</span></div>';
      }).join('') +
      '</div></div>';

    html += '<div class="modal-sec modal-sec--props">' +
      '<span class="modal-sec-label">Typical properties</span>' +
      '<div class="props-table">' +
      p.properties.map(function (r) {
        return '<div class="prop-row"><span class="k">' + esc(r.k) + '</span><span class="v">' + esc(r.v) + '</span></div>';
      }).join('') +
      '</div></div>';

    if (p.images.length) {
      html += '<div class="figures-sec">' +
        '<span class="modal-sec-label">Performance data</span>' +
        '<div class="figure-list">' +
        p.images.map(function (img) {
          return '<figure><img src="' + esc(img.src) + '" alt="' + esc(img.cap) + '">' +
            '<figcaption>' + esc(img.cap) + '</figcaption></figure>';
        }).join('') +
        '</div></div>';
    }

    html += '<a href="#site-footer" class="modal-cta" id="modal-cta-link">Request a sample or TDS' + ARROW_SVG + '</a>';

    bodyEl.innerHTML = html;
    document.getElementById('modal-cta-link').addEventListener('click', closeModal);
  }

  function openModal(code) {
    var p = null;
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (PRODUCTS[i].code === code) { p = PRODUCTS[i]; break; }
    }
    if (!p) return;
    renderModal(p);
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    overlay.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    isOpen = true;
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    isOpen = false;
  }

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card.getAttribute('data-code'));
    });
  });

  closeBtn.addEventListener('click', closeModal);

  // Backdrop click closes (clicks inside the panel don't).
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  // Escape key closes.
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) closeModal();
  });
})();
