const loadPhones = async(searchText,isShowAll)=>{
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll);
    loading(false);
}
const displayPhones = (phones,isShowAll)=>{
    // console.log(phones);
    // 1. find where have to be inserted
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container
    phoneContainer.innerText = '';
    // show all button
    const showAllBtn = document.getElementById('show-all');
    if(phones.length > 10 && !isShowAll){
        showAllBtn.classList.remove('hidden');
    }else{
        showAllBtn.classList.add('hidden');
    }
    if(!isShowAll){
        phones = phones.slice(0, 10);
    }
    phones.forEach(phone => {
        // console.log(phone);
        // 2. create a div
        const phonesDiv = document.createElement('div');
        phonesDiv.className = "card bg-white shadow-xl";
        // 3. set inner html
        phonesDiv.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl bg-gray-50" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered!!</p>
            <div class="card-actions">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;

        // 4. append child
        phoneContainer.appendChild(phonesDiv);
    });
}

// handle searching phone
const phoneSearch = (isShowAll) => {
    loading(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhones(searchText,isShowAll);
}

// show details of each phones
const handleShowDetails = async(id) => {
    console.log('show details' + id);
    // load individual phone information
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phone/${id}`
    );
    const data =await res.json();
    const phone = data.data;
    showModal(phone);
}

const showModal = (phone) => {
    console.log(phone);
    show_detail_modal.showModal();
    const showDetail = document.getElementById("show-detail-container");
    showDetail.innerHTML = `
        <img src="${phone.image}" alt="" />
        <h3 class="text-3xl">${phone.name}</h3>
    `
}

// loader or spinner
const loading = (isLoading) => {
    const loader = document.getElementById('loader');
    if(isLoading) {
        loader.classList.remove('hidden');
    }else{
        loader.classList.add('hidden');
    }
}

// show all button
const showAll = () => {
    phoneSearch(true);
}
// loadPhones();