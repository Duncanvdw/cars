// Callback bij laden merken
function carqueryMakeCallback(data) {
  const makes = data.Makes;
  makeDropdown.innerHTML = '<option value="">Selecteer een merk</option>';
  makes.forEach(make => {
    const option = document.createElement('option');
    option.value = make.make_display;
    option.textContent = make.make_display;
    makeDropdown.appendChild(option);
  });
}

// Callback bij laden modellen
function carqueryModelCallback(data) {
  const models = data.Models;
  allModelsForSelectedMake = models; // Opslaan voor vergelijkbare auto's

  modelDropdown.innerHTML = '<option value="">Selecteer een model</option>';

  const modelSet = new Set();
  models.forEach(model => {
    if (!modelSet.has(model.model_name)) {
      modelSet.add(model.model_name);
      const option = document.createElement('option');
      option.value = model.model_name;
      option.textContent = model.model_name;
      modelDropdown.appendChild(option);
    }
  });

  const displayCars = models.map(m => ({
    model_name: m.model_name,
    model_year: m.model_year || `${m.model_year_min || '?'} - ${m.model_year_max || '?'}`,
    model_body: m.model_body || 'Onbekend'
  }));
  renderCarCards(displayCars.slice(0, 10), makeDropdown.value);
  recommendedContainer.innerHTML = '';
}

// Callback bij laden trims
function carqueryTrimCallback(data) {
  const cars = data.Trims;
  const bouwjaar = bouwjaarInput.value;

  const filteredCars = bouwjaar
    ? cars.filter(car => car.model_year == bouwjaar)
    : cars;

  renderCarCards(
    filteredCars.map(car => ({
      model_name: car.model_name,
      model_year: car.model_year,
      model_body: car.model_body,
      doors: car.model_doors,
      drive: car.model_drive,
      engine_position: car.model_engine_position,
      engine_type: car.engine_type,
      fuel_type: car.fuel_type,
      max_cylinders: car.max_cylinders,
      max_power: car.max_power,
      max_top_speed: car.max_top_speed,
      max_weight: car.max_weight,
      seats: car.seats,
    })),
    makeDropdown.value
  );

  if (makeDropdown.value && modelDropdown.value) {
    renderRecommendedModels(modelDropdown.value, makeDropdown.value);
  } else {
    recommendedContainer.innerHTML = '';
  }
}

// Event: merk wijzigen
makeDropdown.addEventListener('change', () => {
  const selectedMake = makeDropdown.value;
  modelDropdown.innerHTML = '<option>Modellen laden...</option>';
  productContainer.innerHTML = '';
  recommendedContainer.innerHTML = '';
  if (selectedMake) {
    loadJSON(`https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${selectedMake}&sold_in_us=1`, 'carqueryModelCallback');
  } else {
    modelDropdown.innerHTML = '<option value="">Selecteer een model</option>';
  }
});

// Event: model wijzigen
modelDropdown.addEventListener('change', () => {
  const selectedMake = makeDropdown.value;
  const selectedModel = modelDropdown.value;
  productContainer.innerHTML = '';
  recommendedContainer.innerHTML = '';
  if (selectedMake && selectedModel) {
    loadJSON(`https://www.carqueryapi.com/api/0.3/?cmd=getTrims&make=${selectedMake}&model=${selectedModel}&sold_in_us=1`, 'carqueryTrimCallback');
  }
});

// Init: populate dropdowns en laad merken
document.addEventListener('DOMContentLoaded', () => {
  populateYearDropdown();
  loadJSON('https://www.carqueryapi.com/api/0.3/?cmd=getMakes&sold_in_us=1', 'carqueryMakeCallback');
});