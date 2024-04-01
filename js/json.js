// STEP 2: Bind the HEADER and the SECTION elements above to variables
const header = document.querySelector("header");
const section = document.querySelector("section");

// STEP 3a: Create the asynchronous function populate()
async function populate() {
    const url = "https://priyansht.github.io/24W-JavaScript-03-Week11/js/i-scream.json";
    const request = new Request(url);
    const response = await fetch(request);
    const responseJson = await response.json();
    console.log(responseJson);
    populateHeader(responseJson);
    showTopFlavors(responseJson);
}

// STEP 3b: Call the populate() function
populate();

/* STEP 9b: Build out the populateHeader() function */
function populateHeader(jsonData) {
    let h1 = document.createElement("h1");
    h1.textContent = jsonData.companyName;
    header.appendChild(h1);
}

// STEP 10b: Assemble the showTopFlavors() function
function showTopFlavors(jsonData) {
    // Clear existing content of the section
    section.innerHTML = "";
    
    const topFlavors = jsonData.topFlavors;
    for (let i = 0; i < topFlavors.length; i++) {
        let article = document.createElement("article");
        let h2 = document.createElement("h2");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let image = document.createElement("img");
        let list = document.createElement("ul");
        h2.textContent = topFlavors[i].name;
        p1.textContent = "Calories: " + topFlavors[i].calories;
        p2.textContent = "Type: " + topFlavors[i].type;
        image.setAttribute("src", topFlavors[i].image);
        let ingredients = topFlavors[i].ingredients;
        for (let j = 0; j < ingredients.length; j++) {
            let listItem = document.createElement("li");
            listItem.textContent = ingredients[j];
            list.appendChild(listItem);
        }
        article.appendChild(h2);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(list);
        article.appendChild(image);
        section.appendChild(article);
    }
}


// STEP 11: Add a 3rd and 4th flavor of ice cream to the local JSON file

// Define two new flavors
const thirdFlavor = {
    "name": "Mint chocolate chip",
    "calories": 220,
    "type": "ice-cream",
    "ingredients": ["Fresh mint leaves, Chocolate chips or chopped chocolate, Milk or cream, Sugar"],
    "image": "https://priyansht.github.io/24W-JavaScript-03-Week11/images/ice-cream-xtra1.svg"
};

const fourthFlavor = {
    "name": "Buttered pecan",
    "calories": 280,
    "type": "ice-cream",
    "ingredients": ["Pecans (chopped or halves), Butter, chocolate chips, Brownsugar, Vanilla extract"],
    "image": "https://priyansht.github.io/24W-JavaScript-03-Week11/images/ice-cream-xtra2.svg"
};

// Add the new flavors to the existing JSON data
const url = "https://priyansht.github.io/24W-JavaScript-03-Week11/js/i-scream.json";
fetch(url)
    .then(response => response.json())
    .then(data => {
        data.topFlavors.push(thirdFlavor);
        data.topFlavors.push(fourthFlavor);
        return data;
    })
    .then(updatedData => {
        // Display the updated data in the console
        console.log(updatedData);
        // Optionally, you can re-populate the section with the updated data
        showTopFlavors(updatedData);
    })
    .catch(error => console.error('Error:', error));