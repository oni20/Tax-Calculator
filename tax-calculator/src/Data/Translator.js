const dictionary = {
    "EN": {
        "title": "Tax Calculator",
        "hourlyRateLabel": "Enter hourly rate",
        "workingHoursInWeekLabel": "Enter total hours in a week",
        "totalWorkingWeeksInAYear": "Enter total working weeks (annual basis)",
        "provinceDD": "Select province or territory",
        "provinceList": [
            {
                "id": "al",
                "displayText": "Alberta"
            },
            {
                "id": "bc",
                "displayText": "British Columbia"
            },
            {
                "id": "ma",
                "displayText": "Manitoba"
            },
            {
                "id": "nb",
                "displayText": "New Brunswick"
            },
            {
                "id": "ns",
                "displayText": "Nova Scotia"
            },
            {
                "id": "on",
                "displayText": "Ontario"
            },
            {
                "id": "qc",
                "displayText": "Quebec"
            },
            {
                "id": "sk",
                "displayText": "Saskatchewan"
            },
            {
                "id": "nl",
                "displayText": "Newfoundland and Labrador"
            },
            {
                "id": "pei",
                "displayText": "Prince Edward Island"
            },
            {
                "id": "yk",
                "displayText": "Yukon"
            },
            {
                "id": "nt",
                "displayText": "Northwest Territories"
            },
            {
                "id": "nv",
                "displayText": "Nunavut"
            }
        ],
        "calculateBtn": "Calculate",
        "resultTable": {
            "annual": {
                "incomeBeforeTaxLabel": "Annual Income (before tax)",
                "incomeAfterTaxLabel": "Annual Income (After tax)"
            },
            "monthly": {
                "incomeBeforeTaxLabel": "Monthly Income (before tax)",
                "incomeAfterTaxLabel": "Monthly Income (After tax)"
            },
            "biWeekly": {
                "incomeBeforeTaxLabel": "Bi-weekly Income (before tax)",
                "incomeAfterTaxLabel": "Bi-weekly Income (After tax)"
            },
            "weekly": {
                "incomeBeforeTaxLabel": "Weekly Income (before tax)",
                "incomeAfterTaxLabel": "Weekly Income (After tax)"
            }
        }
    },
    "FR": {
        "title": "Calculateur de taxes",
        "hourlyRateLabel": "Entrez le taux horaire",
        "workingHoursInWeekLabel": "Entrez le nombre total d'heures dans une semaine",
        "totalWorkingWeeksInAYear": "Entrez le nombre total de semaines de travail (base annuelle)",
        "provinceDD": "Sélectionnez une province ou un territoire",
        "provinceList": [
            {
                "id": "al",
                "displayText": "L'Alberta"
            },
            {
                "id": "bc",
                "displayText": "La Colombie-Britannique"
            },
            {
                "id": "ma",
                "displayText": "Le Manitoba"
            },
            {
                "id": "nb",
                "displayText": "Le Nouveau-Brunswick"
            },
            {
                "id": "ns",
                "displayText": "La Nouvelle-Écosse"
            },
            {
                "id": "on",
                "displayText": "L'Ontario"
            },
            {
                "id": "qc",
                "displayText": "Le Québec"
            },
            {
                "id": "sk",
                "displayText": "La Saskatchewan"
            },
            {
                "id": "nl",
                "displayText": "La Terre-Neuve-et-Labrador"
            },
            {
                "id": "pei",
                "displayText": "Île-du-Prince-Édouard"
            },
            {
                "id": "yk",
                "displayText": "Yukon"
            },
            {
                "id": "nt",
                "displayText": "Territoires du nord-ouest"
            },
            {
                "id": "nv",
                "displayText": "Nunavut"
            }
        ],
        "calculateBtn": "Calculer",
        "resultTable": {
            "annual": {
                "incomeBeforeTaxLabel": "Revenu annuel (avant impôt)",
                "incomeAfterTaxLabel": "Revenu annuel (après impôt)"
            },
            "monthly": {
                "incomeBeforeTaxLabel": "Revenu mensuel (avant impôt)",
                "incomeAfterTaxLabel": "Revenu mensuel (après impôt)"
            },
            "biWeekly": {
                "incomeBeforeTaxLabel": "Revenu aux deux semaines (avant impôt)",
                "incomeAfterTaxLabel": "Revenu aux deux semaines (après impôt)"
            },
            "weekly": {
                "incomeBeforeTaxLabel": "Revenu hebdomadaire (avant impôt)",
                "incomeAfterTaxLabel": "Revenu hebdomadaire (après impôt)"
            }
        }
    }
}

const currentLang = window.sessionStorage.getItem("lang");
let content = ["fr", "fr_CA", "fr_ca", "fr-CA"].includes(currentLang.toLowerCase()) ? dictionary.FR : dictionary.EN;

export default content;
