const loadMeal = (searchText, isLimited) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals, isLimited))
};

// optional call
loadMeal("rice");

const displayMeals = (meals, isLimited) => {
    // console.log(meals);
    const mealsParent = document.getElementById("meals-parent");
    mealsParent.innerHTML = "";

    const showAll = document.getElementById("show-all");
    // if (isLimited) {
    //     if (meals.length > 6) {
    //         meals = meals.slice(0, 6);
    //         showAll.classList.remove("hidden");
    //     }
    // };

    if (isLimited && meals.length > 6) {
        meals = meals.slice(0, 6);
        showAll.classList.remove("hidden");
    }
    else {
        showAll.classList.add("hidden");
    }

    meals.forEach(meal => {
        // console.log(meal.idMeal);
        const div = document.createElement("div");

        div.innerHTML = `
        <div class="flex flex-col items-center bg-white border border-gray-700 rounded-lg shadow md:flex-row md:max-w-xl">
        <img class="object-cover w-full p-2 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src="${meal.strMealThumb}" alt="">
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight">${meal.strMeal}</h5>
            <p class="mb-3 font-normal">${meal.strInstructions.slice(0, 150)}.</p>
            <p><button onclick="mealDetails(${meal.idMeal})" class="font-semibold underline text-yellow-700" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">View Details</button></p> 
        </div>
        </div>`;

        mealsParent.appendChild(div);
    })
};

// get search text
const getSearchText = (isLimited) => {
    const searchText = document.getElementById("default-search").value;
    loadMeal(searchText, isLimited);
};

// search btn handler
const searchBtn = () => {
    getSearchText(true);
};

// show all handler
const showAll = () => {
    getSearchText(false);
};

// details on bootstrap modal
const mealDetails = id => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => displayMeal(data.meals[0]))
};

const displayMeal = meal => {
    // console.log(meal);
    document.getElementById("exampleModalLabel").innerText = meal.strMeal;
    document.getElementById("modal-body").innerHTML = `<img src="${meal.strMealThumb}" alt="" />`
};
