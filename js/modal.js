const carModal = document.getElementById('car-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalInfo = document.getElementById('modal-info');
const closeModalButton = document.getElementById('close-modal');

function openCarModal(car) {
  modalTitle.textContent = `${car.make} ${car.model_name}`;
  modalImage.src = car.imageSrc || '/images/car-image.jpg';
  modalInfo.innerHTML = `
    <p><strong>Model:</strong> ${car.model_name || 'Onbekend'}</p>
    <p><strong>Jaar:</strong> ${car.model_year || 'Onbekend'}</p>
    <p><strong>Type:</strong> ${car.model_body || 'Onbekend'}</p>
    <p><strong>Deuren:</strong> ${car.doors || 'Onbekend'}</p>
    <p><strong>Aandrijving:</strong> ${car.drive || 'Onbekend'}</p>
    <p><strong>Motorpositie:</strong> ${car.engine_position || 'Onbekend'}</p>
    <p><strong>Motortype:</strong> ${car.engine_type || 'Onbekend'}</p>
    <p><strong>Brandstoftype:</strong> ${car.fuel_type || 'Onbekend'}</p>
    <p><strong>Max cilinders:</strong> ${car.max_cylinders || 'Onbekend'}</p>
    <p><strong>Vermogen:</strong> ${car.max_power || 'Onbekend'}</p>
    <p><strong>Max snelheid:</strong> ${car.max_top_speed || 'Onbekend'}</p>
    <p><strong>Gewicht:</strong> ${car.max_weight || 'Onbekend'}</p>
    <p><strong>Zitplaatsen:</strong> ${car.seats || 'Onbekend'}</p>
  `;
  carModal.classList.remove('hidden');
}

closeModalButton.addEventListener('click', () => {
  carModal.classList.add('hidden');
});

function compare() {
  const carInfo = {
    make: modalTitle.textContent.split(' ')[0],
    model_name: modalTitle.textContent.split(' ').slice(1).join(' '),
    imageSrc: modalImage.src,
    info: modalInfo.innerHTML,
  };

  let carsToCompare = JSON.parse(localStorage.getItem('carsToCompare')) || [];
  if (carsToCompare.length < 2) {
    carsToCompare.push(carInfo);
    localStorage.setItem('carsToCompare', JSON.stringify(carsToCompare));
    updateCompareSection();
  } else {
    alert('Je kunt maximaal twee auto\'s vergelijken.');
  }
}

function updateCompareSection() {
  const carsToCompare = JSON.parse(localStorage.getItem('carsToCompare')) || [];
  const compareCar1 = document.getElementById('compare-car-1');
  const compareCar2 = document.getElementById('compare-car-2');

  compareCar1.innerHTML = carsToCompare[0]
    ? `
      <h3 class="text-lg font-bold mb-2">${carsToCompare[0].make} ${carsToCompare[0].model_name}</h3>
      <img src="${carsToCompare[0].imageSrc}" alt="Auto 1" class="w-full h-40 object-contain rounded mb-4">
      <p class="text-gray-700">${carsToCompare[0].info}</p>
    `
    : '<p class="text-gray-500">Geen auto geselecteerd.</p>';

  compareCar2.innerHTML = carsToCompare[1]
    ? `
      <h3 class="text-lg font-bold mb-2">${carsToCompare[1].make} ${carsToCompare[1].model_name}</h3>
      <img src="${carsToCompare[1].imageSrc}" alt="Auto 2" class="w-full h-40 object-contain rounded mb-4">
      <p class="text-gray-700">${carsToCompare[1].info}</p>
    `
    : '<p class="text-gray-500">Geen auto geselecteerd.</p>';
}

// Update compare section on page load
document.addEventListener('DOMContentLoaded', updateCompareSection);