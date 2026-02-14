// Simplified encyclopedia data for farmers
// Using simple language, emojis, and practical examples

export const encyclopediaData = {
    milkProduction: {
        title: "Milk Production",
        subtitle: "दूध उत्पादन",
        icon: "🥛",
        color: "blue",
        sections: [
            {
                title: "How to Milk Properly",
                emoji: "✅",
                type: "success",
                steps: [
                    "Wash your hands with soap and water",
                    "Clean the cow's udder with warm water",
                    "Dry the udder completely with a clean cloth",
                    "Sit comfortably beside the cow",
                    "Use full hand method - grip teat gently and squeeze from top to bottom",
                    "After milking, dip teats in disinfectant solution"
                ]
            },
            {
                title: "What NOT to Do",
                emoji: "❌",
                type: "danger",
                steps: [
                    "Never milk with dirty hands - causes infection",
                    "Don't pull or twist teats roughly - causes pain and damage",
                    "Avoid knuckling method - damages teats permanently",
                    "Don't leave milk in dirty containers"
                ]
            },
            {
                title: "Quick Tips for More Milk",
                emoji: "💡",
                type: "info",
                tips: [
                    "Clean udder = More milk and less disease",
                    "Milk at same time every day (morning and evening)",
                    "Keep cow calm and comfortable",
                    "Feed well and give plenty of clean water"
                ]
            }
        ]
    },

    diseases: {
        title: "Common Diseases",
        subtitle: "आम बीमारियाँ",
        icon: "🏥",
        color: "red",
        sections: [
            {
                title: "Warning Signs - When to Worry",
                emoji: "🔴",
                type: "danger",
                signs: [
                    "High fever - cow's body feels very hot",
                    "Not eating or drinking",
                    "Swollen, hot, or painful udder",
                    "Limping or unable to walk",
                    "Unusual discharge from nose, eyes, or udder",
                    "Sudden drop in milk production"
                ]
            },
            {
                title: "What to Do Immediately",
                emoji: "💊",
                type: "warning",
                steps: [
                    "Call veterinary doctor right away - don't wait!",
                    "Separate sick cow from healthy cows",
                    "Give plenty of clean, cool water",
                    "Keep the cow in shade and clean area",
                    "Don't sell milk from sick cow"
                ]
            },
            {
                title: "Free Government Vaccines",
                emoji: "💉",
                type: "success",
                vaccines: [
                    {
                        name: "FMD Vaccine (Foot and Mouth Disease)",
                        schedule: "Every 6 months (January & July)",
                        cost: "100% FREE from government"
                    },
                    {
                        name: "Brucellosis Vaccine",
                        schedule: "For female calves 4-8 months old",
                        cost: "100% FREE from government"
                    }
                ],
                where: "Get from: Local veterinary office or mobile vet camps"
            },
            {
                title: "Common Diseases to Know",
                emoji: "📋",
                type: "info",
                diseases: [
                    {
                        name: "Mastitis (Udder Infection)",
                        signs: "Swollen udder, hot to touch, milk has clots or blood",
                        prevention: "Clean milking, teat dipping after milking"
                    },
                    {
                        name: "FMD (Foot & Mouth Disease)",
                        signs: "Blisters in mouth and on feet, drooling, limping",
                        prevention: "Get free vaccine every 6 months"
                    },
                    {
                        name: "Lumpy Skin Disease",
                        signs: "Bumps on skin, fever, less milk",
                        prevention: "Vaccination, control flies and mosquitoes"
                    }
                ]
            }
        ]
    },

    nutrition: {
        title: "Feeds & Nutrition",
        subtitle: "चारा और पोषण",
        icon: "🌾",
        color: "green",
        sections: [
            {
                title: "What to Feed Daily",
                emoji: "🍽️",
                type: "success",
                feeds: [
                    {
                        type: "Green Grass (Best!)",
                        amount: "20-25 kg per day",
                        benefit: "Most nutritious, increases milk"
                    },
                    {
                        type: "Dry Straw",
                        amount: "5-7 kg per day",
                        benefit: "Fills stomach, helps digestion"
                    },
                    {
                        type: "Grains/Concentrate",
                        amount: "2-4 kg per day",
                        benefit: "Energy for milk production"
                    },
                    {
                        type: "Clean Water",
                        amount: "60-80 liters per day",
                        benefit: "MOST IMPORTANT! Milk is 85% water"
                    }
                ]
            },
            {
                title: "Low-Cost Feed Options",
                emoji: "💰",
                type: "info",
                options: [
                    {
                        name: "Azolla (Water Plant)",
                        howTo: "Grow in small pit at home (2m x 2m)",
                        benefit: "Free protein-rich feed, replaces 15-20% of expensive grain",
                        cost: "Almost free after initial setup"
                    },
                    {
                        name: "Kitchen Waste",
                        howTo: "Vegetable peels, fruit waste (not rotten)",
                        benefit: "Free, reduces waste",
                        cost: "Free"
                    },
                    {
                        name: "Urea-Treated Straw",
                        howTo: "Mix 4kg urea in 100L water, soak straw for 10 days",
                        benefit: "Makes straw more digestible",
                        cost: "Very cheap"
                    }
                ]
            },
            {
                title: "Foods to AVOID",
                emoji: "⚠️",
                type: "danger",
                avoid: [
                    "Rotten or moldy food - causes sickness",
                    "Too much grain at once - causes bloating",
                    "Dirty water - causes diarrhea",
                    "Plastic or garbage - can kill cow"
                ]
            },
            {
                title: "Simple Feeding Tips",
                emoji: "💡",
                type: "info",
                tips: [
                    "Feed at same time every day",
                    "Always provide fresh, clean water",
                    "Green grass is better than dry straw",
                    "More milk = More feed needed",
                    "Pregnant cows need extra nutrition"
                ]
            }
        ]
    },

    schemes: {
        title: "Government Schemes",
        subtitle: "सरकारी योजनाएं",
        icon: "🏛️",
        color: "orange",
        sections: [
            {
                title: "100% FREE Services",
                emoji: "🆓",
                type: "success",
                services: [
                    "FMD Vaccination (every 6 months)",
                    "Brucellosis Vaccination (for young females)",
                    "Veterinary checkups and treatment",
                    "Artificial Insemination services",
                    "Disease diagnosis and testing"
                ],
                note: "All these are COMPLETELY FREE from government!"
            },
            {
                title: "Financial Help Available",
                emoji: "💰",
                type: "info",
                schemes: [
                    {
                        name: "Kisan Credit Card",
                        benefit: "Loan for buying feed, medicine, equipment",
                        eligibility: "All farmers with livestock"
                    },
                    {
                        name: "Livestock Insurance",
                        benefit: "Money if cow dies or gets sick",
                        coverage: "Up to ₹40,000-60,000 per cow"
                    },
                    {
                        name: "Equipment Subsidy",
                        benefit: "25-50% discount on milking machines, chaff cutters",
                        eligibility: "Small and marginal farmers"
                    },
                    {
                        name: "Dairy Entrepreneurship Scheme",
                        benefit: "Loan for starting dairy business",
                        amount: "Up to ₹10 lakhs"
                    }
                ]
            },
            {
                title: "How to Apply",
                emoji: "📝",
                type: "warning",
                steps: [
                    "Visit your nearest veterinary office or Krishi Vigyan Kendra",
                    "Bring these documents: Aadhar card, Bank passbook, Land documents (if any)",
                    "Fill simple application form (staff will help you)",
                    "Submit form and wait for approval (usually 15-30 days)",
                    "For urgent help, call toll-free: 1962 (Kisan Call Center)"
                ]
            },
            {
                title: "Important Contacts",
                emoji: "📞",
                type: "info",
                contacts: [
                    {
                        service: "Kisan Call Center",
                        number: "1962",
                        timing: "24/7 - Free calls"
                    },
                    {
                        service: "Animal Helpline",
                        number: "1962",
                        timing: "For sick animals, emergencies"
                    },
                    {
                        service: "Local Veterinary Office",
                        note: "Visit in person for vaccines and checkups"
                    }
                ]
            }
        ]
    }
};
