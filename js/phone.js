const loadPhone = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones);
}

const displayPhones = (phones) => {
    // console.log(phones);

    const phonesContainer = document.getElementById('phones-container');
    // clear phone container cards before adding new cards
    phonesContainer.textContent = '';

    phones.forEach(phone => {
        // console.log(phone);
        const {brand, phone_name, image, slug} = phone;
        // 2. create a div
        const phoneDiv = document.createElement('div');
        phoneDiv.classList = `card bg-gray-100 shadow-lg`;
        phoneDiv.innerHTML = `
            <figure class="p-10 bg-white m-4 rounded-xl">
            <img src="${image}" alt="Shoes" class="" />
              </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone_name}</h2>
                <h2 class="">Brand: ${brand}</h2>
                <div class="card-actions">
                  <button class="btn btn-primary" onclick="showDetailsModal('${slug}')">Buy Now</button>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
}

document.getElementById('search-field').addEventListener('keyup', function (e) {
    const key = e.key;
    if(key === 'Enter'){
        handleSearch();
    }
    console.log(key);
})

// handle search button
const handleSearch = () => {
    const searchInputField = document.getElementById('search-field');
    const searchText = searchInputField.value;
    loadPhone(searchText)
}

loadPhone('f');