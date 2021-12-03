// Get needed elements by ID and save thems in constant variables 
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const gender_result = document.getElementById("gender_result");
const probability_result = document.getElementById("probability_result");
const male = document.getElementById("male");
const female = document.getElementById("female");
const save = document.getElementById("save");
const clear = document.getElementById("clear");
const getGender = document.getElementById("getGender");

// Regex pattern for names
const namePattern = /^[a-zA-Z ]*$/;

// Function for send form
form.addEventListener("submit", (e) => {

    e.preventDefault();

    valid(nameInput.value);

    if (localStorage.getItem(nameInput.value)) {
        getGender.innerHTML = localStorage.getItem(nameInput.value);
    }
    else {
        getGender.innerHTML = "Not Specified";
    }

});


// This function validates the entered name, and if it is not correct, 
// puts the phrase "Not Specified" and otherwise calls the fetchData function.
function valid(name) {

    if (!namePattern.test(name) || name.length == 0 || name.length > 255) {

        male.checked = true;
        nameInput.innerHTML = "";
        gender_result.innerHTML = "Not Specified";
        probability_result.innerHTML = "Not Specified";
    }
    else {
        fetchData(name);
    }

}


// This function fetch data about given name from api then call another function 
async function fetchData(name) {

    let result = await fetch(`https://api.genderize.io/?name=${name}`)
    render(await result.json());
}

//  This function uses the information received to determine gender predictions and their probability.
function render(obj) {
    gender_result.innerHTML = obj.gender;
    probability_result.innerHTML = obj.probability;
    
    if (obj.gender === "male") {
        male.checked = true;
    }
    else {
        female.checked = true;
    }
}



// This function add gnder of given name to local storge
save.addEventListener("click", () => {
    let checked = male.checked ? "male" : "female";
    localStorage.setItem(nameInput.value, checked);
    getGender.innerHTML = checked;
});


// This function remove gnder of given name from local storge
clear.addEventListener("click", () => {
    localStorage.removeItem(nameInput.value);
    getGender.innerHTML = "Not Specified";
});