'use strict';

const cancelBtn = document.getElementById('cancel-btn');
let petEdited;

renderTableData(petsList, tbBodyElm, 'edit');

// ==========lắng nghe sự kiện click sidebar============
sidebarElm.addEventListener('click', function () {
  this.classList.toggle('active');
});

// =======lắng nghe sự kiện thay đổi value của typeSelect=========
inTypeElm.addEventListener('change', function (e) {
  e.preventDefault();
  renderSelectBreed(breedsList, inBreedElm, this.value);
});

// ================lắng nghe sự kiện submit=================
btnSubmit.addEventListener('click', function (e) {
  e.preventDefault();

  petEdited.petID = inIDElm.value.trim();
  petEdited.petName = inNameElm.value.trim();
  petEdited.petAge = parseInt(inAgeElm.value);
  petEdited.petType = inTypeElm.value;
  petEdited.petWeight = parseInt(inWeightElm.value);
  petEdited.petLength = parseInt(inLengthElm.value);
  petEdited.petColor = inColorElm.value;
  petEdited.petBreed = inBreedElm.value;
  petEdited.petVaccinated = inVaccinatedElm.checked;
  petEdited.petDewormed = inDewormedElm.checked;
  petEdited.petSterilized = inSterilizedElm.checked;

  // // ---------------  Validate dữ liệu hợp lệ--------------
  if (
    checkName(petEdited.petName) &&
    checkAge(petEdited.petAge) &&
    checkType(petEdited.petType) &&
    checkWeight(petEdited.petWeight) &&
    checkLength(petEdited.petLength) &&
    checkBreed(petEdited.petBreed)
  ) {
    containerFormElm.classList.add('hide'); //hidden Edit form
    petsList = petsList.map(pet =>
      pet.petID === petEdited.petID ? petEdited : pet
    );
    renderTableData(petsList, tbBodyElm, 'edit'); // render lại UI
    petsStore.saveToStorage(petsList); //lưu dữ liệu vào kho
  }
});

// =============lắng nghe sự kiện cancel====================
cancelBtn.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(this);
  containerFormElm.classList.add('hide'); //hidden Edit form
});

// ================hiển thị form Edit=================
function editPet(id) {
  if (petsList) {
    const petEdit = petsList.find(pet => pet.petID === id); // find pet

    // =====render SelectBreed depend petType=========
    renderSelectBreed(breedsList, inBreedElm, petEdit.petType);

    if (petEdit) {
      containerFormElm.classList.remove('hide'); //show Edit form
      petEdited = petEdit;
      // add data to editForm
      inIDElm.value = petEdit.petID;
      inNameElm.value = petEdit.petName;
      inAgeElm.value = petEdit.petAge + '';
      inTypeElm.value = petEdit.petType;
      inWeightElm.value = petEdit.petWeight + '';
      inLengthElm.value = petEdit.petLength + '';
      inColorElm.value = petEdit.petColor;
      inBreedElm.value = petEdit.petBreed;
      inVaccinatedElm.checked = petEdit.petVaccinated;
      inDewormedElm.checked = petEdit.petDewormed;
      inSterilizedElm.checked = petEdit.petSterilized;
    }
  }
}
