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

    const showAllBtnContainer = document.getElementById('show-all-btn-container');

    if (phones.length <= 0) {
        phonesContainer.innerHTML = `
            <div class="h-24 md:h-52 lg:h-96 w-full flex justify-center items-center col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
                <p class="text-2xl font-bold text-gray-300">No data found</p>
            </div>
        
        `;

        toggleLoadingSpinner(false);

        showAllBtnContainer.classList.add('hidden');

        return;
    }

    // display first 12 phones if result is grater than 12
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

    const { brand, name, releaseDate, image, mainFeatures, others } = gadget || { brand: null, name: null, releaseDate: null, image: null, mainFeatures: null, others: null };

    const { memory, storage, displaySize, chipSet, sensors } = mainFeatures || { memory: null, storage: null, displaySize: null, chipSet: null, sensors: null };

    const { GPS, Bluetooth, NFC, Radio, USB, WLAN } = others || { GPS: null, Bluetooth: null, NFC: null, Radio: null, USB: null, WLAN: null };

    modalDetailsContainer.innerHTML = `
        <figure class="p-10 bg-sky-50 rounded-xl">
            <img src="${image}" alt="${brand}: ${name}" class="mx-auto" />
        </figure>
        <div class="my-2">
            <h2 class="text-3xl mt-4 font-bold text-center">${name}</h2>
            <p class="font-bold text-lg mb-4 text-center"><small class="italic font-normal">by </small>${brand ? brand : '<small>No data available</small>'}</p>
            <div class="flex flex-col gap-y-2">
                <p><span class="font-bold">Release Date: </span>${releaseDate ? releaseDate : '<small>No data available</small>'}</p>
                <p><span class="font-bold">Chipset: </span>${chipSet ? chipSet : '<small>No data available</small>'}</p>
                <p><span class="font-bold">Storage: </span>${storage ? storage : '<small>No data available</small>'}</p>
                <p><span class="font-bold">Display Size: </span>${displaySize ? displaySize : '<small>No data available</small>'}</p>
                <p><span class="font-bold">Memory: </span>${memory ? memory : '<small>No data available</small>'}</p>
                <div class="text-sm p-2 rounded-lg bg-gray-100">
                    <p><span class="font-bold">WLAN: </span>${WLAN ? WLAN : '<span class="italic text-gray-500">No data available</span>'}</p>
                    <p><span class="font-bold">Bluetooth: </span>${Bluetooth ? Bluetooth : '<span class="italic text-gray-500">No data available</span>'}</p>
                    <p><span class="font-bold">NFC: </span>${NFC ? NFC : '<span class="italic text-gray-500">No data available</span>'}</p>
                    <p><span class="font-bold">USB: </span>${USB ? USB : '<span class="italic text-gray-500">No data available</span>'}</p>
                    <p><span class="font-bold">GPS: </span>${GPS ? GPS : '<span class="italic text-gray-500">No data available</span>'}</p>
                    <p><span class="font-bold">Radio: </span>${Radio ? Radio : '<span class="italic text-gray-500">No data available</span>'}</p>
                    <p><span class="font-bold">Sensors: </span>${sensors ? sensors.join(', ') : '<span class="italic text-gray-500">No data available</span>'}</p>
                </div>
            </div>
        </div>
    `;

    showDetailsModal.showModal();
}

loadPhone('oppo', false);