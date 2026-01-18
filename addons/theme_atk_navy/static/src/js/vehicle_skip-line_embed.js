(function () {
  'use strict';

  console.log('[ATK] Phase 2 Vehicle Logic INITIALIZED');

  /*=====================================================
     HELPERS
     =====================================================*/

  function qs(id) {
    return document.getElementById(id);
  }

  function clearSelect(select, placeholder) {
    if (!select) return;
    select.innerHTML = '';
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = placeholder;
    select.appendChild(opt);
  }

  function unique(arr) {
    return [...new Set(arr)];
  }

  function showHiddenContents() {
    const hidden = qs('hidden-contents');
    if (hidden) {
      hidden.style.display = 'block';
      console.log('[ATK] Hidden contents SHOWN');
    }
  }

  function hideHiddenContents() {
    const hidden = qs('hidden-contents');
    if (hidden) {
      hidden.style.display = 'none';
      console.log('[ATK] Hidden contents HIDDEN');
    }
  }

  function allRequiredFilled() {
    return (
      qs('vehicle_make')?.value &&
      qs('vehicle_model')?.value &&
      qs('vehicle_year')?.value
    );
  }

  function debugState(label) {
    console.log(`[ATK DEBUG] ${label}`, {
      make: qs('vehicle_make')?.value,
      model: qs('vehicle_model')?.value,
      year: qs('vehicle_year')?.value,
      price: qs('price')?.value,
      vehicle_type: qs('vehicle_type')?.value,
      makeTag: qs('vehicle_make')?.tagName,
      modelTag: qs('vehicle_model')?.tagName,
      yearTag: qs('vehicle_year')?.tagName
    });
  }

  function replaceSelectWithInput(id) {
    const old = qs(id);
    if (!old || old.tagName === 'INPUT') return;

    const input = document.createElement('input');
    input.type = 'text';
    input.id = old.id;
    input.name = old.name;
    input.className = old.className;
    input.placeholder = old.previousElementSibling?.textContent || '';
    input.required = true;

    old.replaceWith(input);
  }

  function setPriceAndType(records) {
    if (!records.length) return;

    const price = records[0].price || '';
    const type  = records[0].type  || '';

    if (priceEl) priceEl.value = price;
    if (vehicleTypeEl) vehicleTypeEl.value = type;

    console.log('[ATK DEBUG] Price & Vehicle Type SET', {
      price,
      vehicle_type: type
    });
  }

  /* =====================================================
     ELEMENT REFERENCES
     ===================================================== */

  let makeEl        = qs('vehicle_make');
  let modelEl       = qs('vehicle_model');
  let modelWrapEl   = qs('vehicle_model_wrapper');
  let yearEl        = qs('vehicle_year');
  let yearWrapEl    = qs('vehicle_year_wrapper');
  let priceLabelE1    = qs('price_label');
  let vehicleTypeLabelE1    = qs('vehicle_type_label');
  const priceEl     = qs('price');
  const vehicleTypeEl = qs('vehicle_type');

  if (!makeEl || !modelEl || !yearEl) {
    console.warn('[ATK] Vehicle inputs not found');
    return;
  }

  /* =====================================================
     DATA
     ===================================================== */

  const DATA = window.ATK_VEHICLE_DATA || [];
  if (!DATA.length) {
    console.warn('[ATK] ATK_VEHICLE_DATA is empty');
  }

  /* =====================================================
     INITIAL POPULATION (MAKE)
     ===================================================== */

  const makes = unique(DATA.map(d => d.make));
  makes.forEach(m => makeEl.appendChild(new Option(m, m)));
  makeEl.appendChild(new Option('Others', 'Others'));

  hideHiddenContents();

  /* =====================================================
     HANDLE MAKE CHANGE
     ===================================================== */

  makeEl.addEventListener('change', function () {

    const make = this.value;
    debugState('Make changed');

    clearSelect(modelEl, '');
    clearSelect(yearEl, '');

    if (!make) {
      hideHiddenContents();
      return;
    }

/* -------- OTHERS MODE -------- */
if (make === 'Others') {

  // Replace all selects with text inputs
  ['vehicle_make', 'vehicle_model_wrapper', 'vehicle_year_wrapper'].forEach(id => {
    replaceSelectWithInput(id);
  });

  //Rebind elements after DOM replacement
  makeEl  = qs('vehicle_make');
  modelWrapEl   = qs('vehicle_model_wrapper');
  yearWrapEl    = qs('vehicle_year_wrapper');

  // Hide price & vehicle type for Others
  if (priceEl) {
    priceEl.value = '';
    priceEl.style.display = 'none';
  }

  if (vehicleTypeEl) {
    vehicleTypeEl.value = '';
    vehicleTypeEl.style.display = 'none';
  }

   if (priceLabelE1) {
    priceLabelE1.style.display = 'none';
  }

   if (vehicleTypeLabelE1) {
    vehicleTypeLabelE1.style.display = 'none';
  }

  let vehicleReseBtnE1    = qs('vehicle_reset_btn');
  if(vehicleReseBtnE1){
        vehicleReseBtnE1.style.display = 'flex';
   }

  console.log('[ATK DEBUG] Others mode activated → all fields are inputs');
  debugState('Others mode state');

  showHiddenContents();
  return;
}


    /* -------- NORMAL FLOW -------- */

    const filtered = DATA.filter(d => d.make === make);

    setPriceAndType(filtered);

    /* MODELS */
    const models = unique(
      filtered
        .map(d => d.model)
        .join(',')
        .split(',')
        .map(m => m.trim())
        .filter(Boolean)
    );

    models.forEach(m => modelEl.appendChild(new Option(m, m)));

    /* YEARS */
    const years = unique(
      filtered
        .map(d => String(d.year).trim())
        .filter(Boolean)
    );

    years.forEach(y => yearEl.appendChild(new Option(y, y)));

    debugState('After dependent population');

    if (allRequiredFilled()) {
      showHiddenContents();
      debugState('Hidden shown after auto population');
    } else {
      hideHiddenContents();
    }
  });

  /* =====================================================
     HANDLE MODEL / YEAR CHANGE
     ===================================================== */

  [modelEl, yearEl].forEach(el => {
    el.addEventListener('change', function () {
      debugState('Model/Year changed by user');
      if (allRequiredFilled()) {
        showHiddenContents();
      }
    });
  });
})();
