'use strict';

const findBtnElm = document.getElementById('find-btn');

// ==============render selectBreed===============
renderSelectBreed(breedsList, inBreedElm);

// ==========lắng nghe sự kiện click sidebar============
sidebarElm.addEventListener('click', function () {
  this.classList.toggle('active');
});

findBtnElm.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(this);
  let searchResult = petsList;
  const petSearch = {
    petID: inIDElm.value.trim(),
    petName: inNameElm.value.trim(),
    petType: inTypeElm.value,
    petBreed: inBreedElm.value,
    petVaccinated: inVaccinatedElm.checked,
    petDewormed: inDewormedElm.checked,
    petSterilized: inSterilizedElm.checked,
  };
  if (petSearch.petID !== '') {
    searchResult = searchResult.filter(
      pet => pet.petID.indexOf(petSearch.petID) !== -1
    );
  }
  if (petSearch.petName !== '') {
    searchResult = searchResult.filter(
      pet => pet.petName.indexOf(petSearch.petName) !== -1
    );
  }
  if (petSearch.petType !== 'Select Type') {
    searchResult = searchResult.filter(
      pet => pet.petType === petSearch.petType
    );
  }
  if (petSearch.petBreed !== 'Select Breed') {
    searchResult = searchResult.filter(
      pet => pet.petBreed === petSearch.petBreed
    );
  }
  if (petSearch.petVaccinated) {
    searchResult = searchResult.filter(pet => pet.petVaccinated);
  }
  if (petSearch.petDewormed) {
    searchResult = searchResult.filter(pet => pet.petDewormed);
  }
  if (petSearch.petSterilized) {
    searchResult = searchResult.filter(pet => pet.petSterilized);
  }

  renderTableData(searchResult, tbBodyElm, 'delete', false);
});
