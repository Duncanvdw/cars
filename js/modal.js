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