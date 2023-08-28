const loadPhone = async (searchText, isShowAll) => {
    // show loading spinner
    toggleLoadingSpinner(true);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    const phonesContainer = document.getElementById('phones-container');
    // clear phone container cards before adding new cards
    phonesContainer.textContent = '';

    // display first 12 phones if result is grater than 12
    const showAllBtnContainer = document.getElementById('show-all-btn-container');
    if (phones.length > 12 && !isShowAll) {
        showAllBtnContainer.classList.remove('hidden');
        phones = phones.slice(0, 12);
    }
    else {
        showAllBtnContainer.classList.add('hidden');
    }

    phones.forEach(phone => {
        // console.log(phone);
        const { brand, phone_name, image, slug } = phone;
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
                  <button class="btn btn-info normal-case" onclick="handleShowDetails('${slug}')">Details</button>
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
    if (key === 'Enter') {
        handleSearch();
    }
})

// handle search button
const handleSearch = (isShowAll = false) => {
    const searchInputField = document.getElementById('search-field');
    const searchText = searchInputField.value;
    loadPhone(searchText, isShowAll)
}

const toggleLoadingSpinner = (isVisible) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isVisible) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}

// 
const handleShowDetails = async (id) => {
    // console.log('clicked', id);
    // load gadget data
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    const gadget = data.data;

    showGadgetDetails(gadget);
}

const showGadgetDetails = gadget => {

    const modalDetailsContainer = document.getElementById('dynamic-details-data-modal-container');

    const {brand, name, releaseDate, image, mainFeatures, others} = gadget || {brand: null, name: null, releaseDate: null, image: null, mainFeatures: null, others: null};

    const {memory, storage, displaySize, chipSet, sensors} = mainFeatures || {memory: null, storage: null, displaySize: null, chipSet: null, sensors: null};

    const {GPS, Bluetooth, NFC, Radio, USB, WLAN} = others || {GPS: null, Bluetooth: null, NFC: null, Radio: null, USB: null, WLAN: null};

    modalDetailsContainer.innerHTML = `
        <figure class="p-10 bg-sky-50 rounded-xl">
            <img src="${image}" alt="${brand}: ${name}" class="mx-auto" />
        </figure>
        <div class="my-2">
            <h2 class="text-3xl my-4 font-bold">${name}</h2>
            <div class="flex flex-col gap-y-2">
                <p><span class="font-bold">Brand: </span>${brand ? brand : '<small>No data available</small>'}</p>
                <p><span class="font-bold">Release Date: </span>${releaseDate ? releaseDate : '<small>No data available</small>'}</p>
                <p><span class="font-bold">Chipset: </span>${chipSet ? chipSet : '<small>No data available</small>'}</p>
                <p><span class="font-bold">Storage: </span>${storage ? storage : '<small>No data available</small>'}</p>
                <p><span class="font-bold">Display Size: </span>${displaySize ? displaySize : '<small>No data available</small>'}</p>
                <p><span class="font-bold">Memory: </span>${memory ? memory : '<small>No data available</small>'}</p>
                <p><span class="font-bold">WLAN: </span>${WLAN ? WLAN : '<small>No data available</small>'}</p>
                <p><span class="font-bold">Bluetooth: </span>${Bluetooth ? Bluetooth : '<small>No data available</small>'}</p>
                <p><span class="font-bold">NFC: </span>${NFC ? NFC : '<small>No data available</small>'}</p>
                <p><span class="font-bold">USB: </span>${USB ? USB : '<small>No data available</small>'}</p>
                <p><span class="font-bold">GPS: </span>${GPS ? GPS : '<small>No data available</small>'}</p>
                <p><span class="font-bold">Radio: </span>${Radio ? Radio : '<small>No data available</small>'}</p>
                <p><span class="font-bold">Sensors: </span>${sensors ? sensors.join(', ') : '<small>No data available</small>'}</p>
            </div>
        </div>
    `;

    showDetailsModal.showModal();
}

loadPhone('samsung', false);