const recommendedContainer = document.getElementById('recomended-container');
let allModelsForSelectedMake = [];

function renderRecommendedModels(selectedModel, make) {
  recommendedContainer.innerHTML = '';

  const otherModels = allModelsForSelectedMake.filter(
    model => model.model_name && model.model_name !== selectedModel
  );

  if (!otherModels.length) {
    recommendedContainer.innerHTML = '<p class="text-gray-500">Geen vergelijkbare auto\'s gevonden.</p>';
    return;
  }

  const shuffledModels = otherModels
    .filter(model => model.model_name !== selectedModel)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  shuffledModels.forEach(model => {
    const card = document.createElement('div');
    card.className = 'border border-gray-300 rounded p-4 shadow inline-block w-64 flex-shrink-0';
    card.innerHTML = `
      <img src="/images/car-image.jpg" alt="Auto" class="w-full h-40 object-cover rounded-t">
      <h3 class="text-lg font-bold mt-2">${make} ${model.model_name}</h3>
      <p class="text-sm text-gray-600">Model: ${model.model_name}</p>
    `;
    recommendedContainer.appendChild(card);
  });
}