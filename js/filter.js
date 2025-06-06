const makeDropdown = document.getElementById('merk');
const modelDropdown = document.getElementById('model');
const bouwjaarInput = document.getElementById('bouwjaar');
const productContainer = document.getElementById('product-container');

function populateYearDropdown() {
  const startYear = 1950;
  const endYear = 2025;
  for (let year = startYear; year <= endYear; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    bouwjaarInput.appendChild(option);
  }
}

function renderCarCards(cars, make) {
  productContainer.innerHTML = '';
  if (!cars.length) {
    productContainer.innerHTML = '<p class="text-gray-500">Geen resultaten gevonden.</p>';
    return;
  }

  cars.forEach(car => {
    const modelName = car.model_name || car.model;
    const year = car.model_year;
    const bodyType = car.model_body || car.body;

    let imageSrc = '/images/car-image.jpg';
    if (bodyType === 'Sport Utility Vehicles') {
      imageSrc = '/images/SUV-image.jpg';
    } else if (bodyType === 'Minivan') {
      imageSrc = '/images/minivan.png';
    } else if (bodyType === 'Coupe') {
      imageSrc = '/images/coupe.png';
    } else if (bodyType === 'Sedan') {
      imageSrc = '/images/sedan.png';
    } else if (bodyType === 'Convertible') {
      imageSrc = '/images/convertible.webp';
    }

    const card = document.createElement('div');
    card.className = 'border border-gray-300 rounded p-4 shadow cursor-pointer';
    card.innerHTML = `
      <img src="${imageSrc}" alt="Auto" class="w-full h-40 object-contain rounded-t">
      <h3 class="text-lg font-bold mt-2">${make} ${modelName}</h3>
      <p class="text-sm text-gray-600">Model: ${modelName}</p>
      ${year !== '? - ?' ? `<p class="text-sm text-gray-600">Jaar: ${year}</p>` : ''}
      ${bodyType !== 'Onbekend' ? `<p class="text-sm text-gray-600">Type: ${bodyType}</p>` : ''}
    `;

    card.addEventListener('click', () => {
      openCarModal({
        make,
        model_name: modelName,
        model_year: year,
        model_body: bodyType,
        imageSrc,
        doors: car.doors || 'Onbekend',
        drive: car.drive || 'Onbekend',
        engine_position: car.engine_position || 'Onbekend',
        engine_type: car.engine_type || 'Onbekend',
        fuel_type: car.fuel_type || 'Onbekend',
        max_cylinders: car.max_cylinders || 'Onbekend',
        max_power: car.max_power || 'Onbekend',
        max_top_speed: car.max_top_speed || 'Onbekend',
        max_weight: car.max_weight || 'Onbekend',
        seats: car.seats || 'Onbekend',
      });
    });

    productContainer.appendChild(card);
  });
}