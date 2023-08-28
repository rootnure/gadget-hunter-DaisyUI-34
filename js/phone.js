const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=a');
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones);
}

const displayPhones = (phones) => {
    // console.log(phones);

    const phonesContainer = document.getElementById('phones-container');

    phones.forEach(phone => {
        // console.log(phone);
        const {brand, phone_name, image, slug} = phone;
        // 2. create a div
        const phoneDiv = document.createElement('div');
        phoneDiv.classList = `card bg-gray-100 shadow-lg`;
        phoneDiv.innerHTML = `
            <figure class="px-10 py-10 bg-white m-6 rounded-xl">
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

loadPhone();