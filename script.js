// Language text objects
const texts = {
    en: {
        header: "Interest Calculation",
        labelPrincipal: "Principal Amount:",
        labelRate: "Interest Rate (%):",
        labelStartDate: "Start Date:",
        labelEndDate: "End Date:",
        labelInterestType: "Select Interest Type:",
        calculateButton: "Calculate",
        resetButton: "Reset",
        simpleInterestText: "Simple Interest: ₹",
        compoundInterestText: "Compound Interest: ₹",
        alertMessage: "Please fill in all fields with valid values."
    },
    te: {
        header: "వడ్డీ గణన",
        labelPrincipal: "ప్రధానమొత్తం:",
        labelRate: "వడ్డీ రేటు (%):",
        labelStartDate: "ప్రారంభ తేదీ:",
        labelEndDate: "ముగింపు తేదీ:",
        labelInterestType: "వడ్డీ రకం ఎంచుకోండి:",
        calculateButton: "గణించు",
        resetButton: "పునఃప్రారంభించు",
        simpleInterestText: "సాధారణ వడ్డీ: ₹",
        compoundInterestText: "సంక్లిష్ట వడ్డీ: ₹",
        alertMessage: "దయచేసి అన్ని ఫీల్డ్స్‌ని సరైన విలువతో భర్తీ చేయండి."
    }
};

let currentLang = 'en';  // Default language is English

// Set language texts based on the selected language
function setLanguage(lang) {
    currentLang = lang;

    document.getElementById("header").innerText = texts[lang].header;
    document.getElementById("label-principal").innerText = texts[lang].labelPrincipal;
    document.getElementById("label-rate").innerText = texts[lang].labelRate;
    document.getElementById("label-start-date").innerText = texts[lang].labelStartDate;
    document.getElementById("label-end-date").innerText = texts[lang].labelEndDate;
    document.getElementById("label-interest-type").innerText = texts[lang].labelInterestType;
    document.getElementById("calculate-btn").innerText = texts[lang].calculateButton;
    document.getElementById("reset-btn").innerText = texts[lang].resetButton;
}

// Language switcher event listeners
document.querySelectorAll("[data-lang]").forEach(element => {
    element.addEventListener("click", function() {
        const lang = element.getAttribute("data-lang");
        setLanguage(lang);
    });
});

// Calculate Button Functionality
document.getElementById("calculate-btn").addEventListener("click", function() {
    const principal = parseFloat(document.getElementById("principal").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);
    const interestType = document.getElementById("interest-type").value;

    if (isNaN(principal) || isNaN(rate) || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        alert(texts[currentLang].alertMessage);
        return;
    }

    if (endDate <= startDate) {
        alert("End date must be after the start date.");
        return;
    }

    const timeDiff = endDate - startDate;
    const years = timeDiff / (1000 * 60 * 60 * 24 * 365.25); // Convert milliseconds to years, accounting for leap years
    let resultText = "";

    if (interestType === "simple") {
        // Simple Interest Formula: (P * R * T) / 100
        const simpleInterest = (principal * rate * years) / 100;
        resultText = `${texts[currentLang].simpleInterestText} ₹${simpleInterest.toFixed(2)}`;
    }

    if (interestType === "compound") {
        // Compound Interest Calculation:
        const totalAmount = principal * Math.pow((1 + rate / 100), years);
        const compoundInterest = totalAmount - principal;
        resultText = `${texts[currentLang].compoundInterestText} ${compoundInterest.toFixed(2)}`;
    }

    // Display the result
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = resultText;
});

// Reset Button Functionality
document.getElementById("reset-btn").addEventListener("click", function() {
    document.getElementById("principal").value = "";
    document.getElementById("rate").value = "";
    document.getElementById("start-date").value = "";
    document.getElementById("end-date").value = "";
    document.getElementById("interest-type").value = "simple";
    document.getElementById("result").innerHTML = "";
});
