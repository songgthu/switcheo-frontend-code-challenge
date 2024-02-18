const inputDropdown = document.getElementById('currencies-input');
const outputDropdown = document.getElementById('currencies-output');

window.addEventListener('DOMContentLoaded', () => {
    fetchCurrencies('currencies-input');
    fetchCurrencies('currencies-output');
    const swapForm = document.getElementById('swap-form');
    swapForm.addEventListener('submit', handleSwap);

    inputDropdown.addEventListener('change', () => {
        updateDropdown(inputDropdown.options[inputDropdown.selectedIndex].textContent, 'currencies-output');
    });

    outputDropdown.addEventListener('change', () => {
        updateDropdown(outputDropdown.options[outputDropdown.selectedIndex].textContent, 'currencies-input');
    });
  });  

function updateDropdown(selectedCurrency, id) {
    const dropdown = document.getElementById(id);

    Array.from(dropdown.options).forEach(option => {
        if (option.textContent === selectedCurrency) {
        option.disabled = true;
        } else {
        option.disabled = false;
        }
    });
}

function fetchCurrencies(id) {
    fetch('https://interview.switcheo.com/prices.json')
        .then(response => response.json())
        .then(data => {
        const currenciesList = document.getElementById(id);

        const defaultOption = document.createElement('option');
        defaultOption.value = null;
        defaultOption.textContent = 'Select Currency';
        currenciesList.appendChild(defaultOption);

        data.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.price;
            optionElement.textContent = option.currency;

            currenciesList.appendChild(optionElement);
        });
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

function handleSwap(event) {
    event.preventDefault();

    const inputAmount = document.getElementById('input-amount').value;
    const outputAmount = document.getElementById('output-amount').value;
    const inputCurrency = inputDropdown.options[inputDropdown.selectedIndex];
    const outputCurrency = outputDropdown.options[outputDropdown.selectedIndex];

    
    if (inputAmount == "" && outputAmount == "") {
        alert("Please enter in either the amount to send or to receive before swap");
    }
    if (inputCurrency.textContent == "Select Currency" || outputCurrency.textContent == "Select Currency") {
        alert("Please enter in both currencies before swap");
    }
    const inputPrice = inputCurrency.value;
    const outputPrice = outputCurrency.value;
    if (inputAmount === "" && outputAmount !== "") {
        const swappedAmount = (outputAmount / outputPrice) * inputPrice;
        document.getElementById('input-amount').value = swappedAmount.toFixed(2);
    } else if (outputAmount === "" && inputAmount !== "") {
        const swappedAmount = (inputAmount / inputPrice) * outputPrice;
        document.getElementById('output-amount').value = swappedAmount.toFixed(2);
    } else {
        alert("Please enter only one of the amounts to send or receive, not both.");
    }
}