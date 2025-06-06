// Function to save car information to local storage
function saveCarToCompare(carInfo) {
    let carsToCompare = JSON.parse(localStorage.getItem('carsToCompare')) || [];
    if (carsToCompare.length < 2) {
        carsToCompare.push(carInfo);
        localStorage.setItem('carsToCompare', JSON.stringify(carsToCompare));
    } else {
        alert('You can only compare two cars at a time.');
    }
}

// Event listener for the "compare" button
document.querySelectorAll('.compare-button').forEach(button => {
    button.addEventListener('click', function () {
        const carInfo = {
            // Replace these selectors with the actual modal data
            name: document.querySelector('.modal .car-name').textContent,
            price: document.querySelector('.modal .car-price').textContent,
            specs: document.querySelector('.modal .car-specs').textContent,
        };
        saveCarToCompare(carInfo);
    });
});

// Function to display the comparison modal
function showComparisonModal() {
    const carsToCompare = JSON.parse(localStorage.getItem('carsToCompare')) || [];
    if (carsToCompare.length === 2) {
        const modalContent = `
            <div>
                <h2>Car Comparison</h2>
                <div>
                    <h3>${carsToCompare[0].name}</h3>
                    <p>Price: ${carsToCompare[0].price}</p>
                    <p>Specs: ${carsToCompare[0].specs}</p>
                </div>
                <div>
                    <h3>${carsToCompare[1].name}</h3>
                    <p>Price: ${carsToCompare[1].price}</p>
                    <p>Specs: ${carsToCompare[1].specs}</p>
                </div>
            </div>
        `;
        document.querySelector('.comparison-modal').innerHTML = modalContent;
        document.querySelector('.comparison-modal').style.display = 'block';
    } else {
        alert('Please select two cars to compare.');
    }
}

// Event listener for the "show comparison" button
document.querySelector('.show-comparison-button').addEventListener('click', showComparisonModal);
