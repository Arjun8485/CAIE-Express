
export const topics = {
    AS_level: {
        Physics: ["Physical quantities and units", "Kinematics", "Dynamics", "Forces, density and pressure", "Work, energy and power", "Deformation of solids", "Waves", "Superposition", "Electricity", "D.C. circuits", "Particle physics"],
        Chemistry: ["Physical chemistry", "Inorganic chemistry", "Organic chemistry"],
        IT: ["Data processing and information", "Hardware and software", "Monitoring and control", "Algorithms and flow charts", "eSecurity", "The digital divide", "Expert systems", "Spreadsheets", "Modelling", "Database and file concepts", "Sound and video editing"],
        Biology: ["Cell structure", "Biological molecules", "Enzymes", "Cell membranes and transport", "The mitotic cell cycle", "Nucleic acids and protein synthesis", "Transport in plants", "Transport in mammals", "Gas exchange", "Infectious diseases", "Immunity"],
        Economics: ["Basic economic ideas and resource allocation", "The price system and the microeconomy", "Government microeconomic intervention", "The macroeconomy", "Government macroeconomic intervention", "International economic issues", "Case study"],
        Maths_Pure_1: ["Quadratics", "Functions", "Coordinate geometry", "Circular measure", "Trigonometry", "Series", "Differentiation", "Integration"],
        Maths_Stats_1: [
            "Representation of data", "Permutations and combinations", "Probability", "Discrete random variables", "The normal distribution"
        ]
    }, 
    A_level: {

    }
}

export let AS_subjects = Object.getOwnPropertyNames(topics.AS_level)
export let examBoards = Object.getOwnPropertyNames(topics)

export const components = {
    Physics: [{code: 1, name: "mcq"}, {code: 2, name: "theory"}],
    Chemistry: [{code: 1, name: "mcq"}, {code: 2, name: "theory"}],
    Maths_Pure_1: [{code: 1, name: "Pure Mathematics 1"}],
    Maths_Stats_1: [{code: 5, name: "Probability & Statistics 1"}],
    IT: [{code: 1, name: "theory"}, {code: 2, name: "practical"}]
}


