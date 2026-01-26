console.log('[ATK] Vehicle modal JS FILE LOADED');

(function () {
  'use strict';

console.log('[ATK] Vehicle modal JS FILE LOADED');

window.ATK_STATE = window.ATK_STATE || {};

//======display vehicle transaction on user portal=======
(function () {
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('#atk_continue_btn');
    if (!btn) return;

    const urlTrack = new URLSearchParams(window.location.search).get('track');
   let status = '';
   
  if (urlTrack) {
    
    if (urlTrack === 'priority'){
        status = 'Skip-The-Line';
        //localStorage.setItem('track', urlTrack);
        console.log('[ATK] Track:', urlTrack);
    }else{
        status = 'Standard';
    }
  }

    const payload = {
      page: window.location.pathname,
      key_type: document.getElementById('key_type')?.value,
      make: document.getElementById('vehicle_make')?.value,
      model: document.getElementById('vehicle_model')?.value,
      year: document.getElementById('vehicle_year')?.value,
      price: document.getElementById('price')?.value,
      bookingStatus: status,
    };

    fetch('/atk/activity/save', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });

    console.log('[ATK] Activity saved', payload);
  });
})();

/*
 status: isPriority ? 'Skip-The-Line' : 'Standard',
    key_type: data.key_type,
    make: data.make,
    model: data.model,
    year: data.year,
    vehicle_type: data.vehicle_type,
    price: finalPrice,
    battery: data.battery,
    vehicle_info: data.vehicle_info,
    donation: '$5 (Non-refundable)'

    let makeEl      = qs('vehicle_make');
  let modelEl     = qs('vehicle_model');
  let modelWrapEl = qs('vehicle_model_wrapper');
  let yearEl      = qs('vehicle_year');
  let yearWrapEl  = qs('vehicle_year_wrapper');

const urlTrack = new URLSearchParams(window.location.search).get('track');

  if (urlTrack) {
    localStorage.setItem('track', urlTrack);
    console.log('[ATK] Track:', urlTrack);
  }

  const params = new URLSearchParams(window.location.search);

  if (params.get('reset') !== 'open_vehicle_modal') return;

  console.log('[ATK] URL reset detected → waiting for vehicle modal');

  const track = params.get('track') || 'standard';
  //priority

*/


})();
