const loadPhone = async (searchText) => {
    // show loading spinner
    toggleLoadingSpinner(true);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones => {
    // console.log(phones);

    const phonesContainer = document.getElementById('phones-container');
    // clear phone container cards before adding new cards
    phonesContainer.textContent = '';

    // display first 12 phones if result is grater than 12
    const showAllBtnContainer = document.getElementById('show-all-btn-container');
    if(phones.length > 12) {
        phones = phones.slice(0, 12);
        showAllBtnContainer.classList.remove('hidden');
    }
    else {
        showAllBtnContainer.classList.add('hidden');
    }

    phones.forEach(phone => {
        // console.log(phone);
        const {brand, phone_name, image, slug} = phone;
        // 2. create a div
        const phoneDiv = document.createElement('div');
        phoneDiv.classList = `card bg-gray-100 shadow-lg`;
        phoneDiv.innerHTML = `
            <figure class="p-10 bg-white m-4 rounded-xl">
            <img src="${image}" alt="${phone_name}" class="" />
              </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone_name}</h2>
                <h2 class="">Brand: ${brand}</h2>
                <div class="card-actions">
                  <button class="btn btn-info normal-case" onclick="showDetailsModal('${slug}')">Details</button>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    
    // hide loading spinner
    toggleLoadingSpinner(false);
}

document.getElementById('search-field').addEventListener('keyup', function (e) {
    const key = e.key;
    if(key === 'Enter'){
        handleSearch();
    }
})

// handle search button
const handleSearch = () => {
    const searchInputField = document.getElementById('search-field');
    const searchText = searchInputField.value;
    loadPhone(searchText)
}

const toggleLoadingSpinner = (isVisible) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isVisible){
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

loadPhone('z');