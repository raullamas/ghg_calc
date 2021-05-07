const inputAmount = document.getElementById('amount');
const inputMass = document.getElementById('mass');
const inputGhg = document.getElementById('ghg');
const btn = document.querySelector('button');
const para = document.querySelector('p');

function toTons (amount, unit) {
    switch (unit) {
        case 'kg':
            return amount / 1000;
        case 'g':
            return amount / 1000000;
        case 't':
            return amount;
    }
}

function toTCo2Eq (amount, unit, ghg) {
    const inTGhg = toTons (amount, unit);
    switch (ghg) {
        case 'co2':
            return +((inTGhg).toFixed(2));
        case 'ch4':
            return +((inTGhg * 21).toFixed(2));
        case 'no2':
            return +((inTGhg * 206).toFixed(2));
        case 'hfc':
            return +((inTGhg * 11700).toFixed(2));
        case 'pfc':
            return +((inTGhg * 9200).toFixed(2));
        case 'sf6':
            return +((inTGhg * 23000).toFixed(2));
        case 'cfc':
            return +((inTGhg * 16000).toFixed(2));
    }
}

function preProcessMass (mass) {
    const lowCapsMass = String(mass).toLowerCase();
    switch (lowCapsMass) {
        case 'kg':
        case 'kilogram':
        case 'k':
        case 'kilo':
            return 'kg';
        case 'g':
        case 'gram':
        case 'gr':
        case 'gramme':
            return 'g';
        case 't':
        case 'ton':
        case 'tonne':
        case 'megagram':
        case 'mg':
            return 't';
    }
}

function preProcessGhg (ghg) {
    const lowCapsGhg = String(ghg).toLowerCase();
    switch (lowCapsGhg) {
        case 'carbon dioxide':
        case 'co2':
            return 'co2';
        case 'methane':
        case 'ch4':
            return 'ch4';
        case 'nitrous oxide':
        case 'no2':
            return 'no2';
        case 'hydrofluorocarbons':
        case 'hfc':
            return 'hfc';
        case 'perfluorocarbons':
        case 'pfc':
            return 'pfc';
        case 'sulfur hexafluoride':
        case 'sf6':
            return 'sf6';
        case 'chlorofluorocarbons':
        case 'cfc':
            return 'cfc';
    }
}

function isInvalidAmount (amount) {
    if (isNaN(amount)) {
        return `Please input a numeric GHG amount.`;
    } else if (amount < 0) {
        return `Input amount can't be a negative number. (Negative emissions can be conceptualized as positive savings).`
    }
}

function isInvalidMass (mass) {
    if (mass === undefined) {
        return `Please choose a valid mass unit: Either g, kg or t.`;
    }
}

function isInvalidGhg (ghg) {
    if (ghg === undefined) {
        return `Please choose a valid ghg: Either carbon dioxide, methane, nitrous oxide, hydrofluorocarbons, perfluorocarbons, sulfur hexafluoride or chlorofluorocarbons.`;
    }
}

function getConverted (amount, mass, ghg) {
    const output = toTCo2Eq (amount, mass, ghg);
    return `${amount === Infinity ? 'Infinite' : amount} ${mass} ${ghg.toUpperCase()} equal about ${output === Infinity ? 'infinite' : output} t CO2eq (conservative estimate).`;
}

function convertToGhg (amount, mass, ghg) {
    const preProcessedAmount = +String(amount);
    const preProcessedMass = preProcessMass(mass);
    const preProcessedGhg = preProcessGhg(ghg);
    return isInvalidAmount(preProcessedAmount) || isInvalidMass(preProcessedMass) || isInvalidGhg(preProcessedGhg) || getConverted(preProcessedAmount, preProcessedMass, preProcessedGhg);
}

btn.addEventListener ('click', () => {
    const innerAmount = inputAmount.value;
    const innerMass = inputMass.value;
    const innerGhg = inputGhg.value;
    const result = convertToGhg(innerAmount, innerMass, innerGhg);
    para.innerText = result;
})