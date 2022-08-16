'use strict';

//================= seclect DOM elements ========
const btnHealthy = document.getElementById('healthy-btn');
// const btnBMI = document.getElementById('bmi-btn');

// render UI
renderTableData(petsList, tbBodyElm, 'delete');
renderSelectBreed(breedsList, inBreedElm, inTypeElm.value);

// =======lắng nghe sự kiện thay đổi value của typeSelect=========
inTypeElm.addEventListener('change', function (e) {
  e.preventDefault();
  renderSelectBreed(breedsList, inBreedElm, this.value);
});

// ==========lắng nghe sự kiện click sidebar============
sidebarElm.addEventListener('click', function () {
  this.classList.toggle('active');
});

// ============lắng nghe sự kiện submit form===================
btnSubmit.addEventListener('click', function () {
  petsList = petsStore.getFromStorage() ?? []; // vào kho lấy dữ liệu

  const petData = {
    petID: inIDElm.value.trim(),
    petName: inNameElm.value.trim(),
    petAge: parseInt(inAgeElm.value),
    petType: inTypeElm.value,
    petWeight: parseInt(inWeightElm.value),
    petLength: parseInt(inLengthElm.value),
    petColor: inColorElm.value,
    petBreed: inBreedElm.value,
    petVaccinated: inVaccinatedElm.checked,
    petDewormed: inDewormedElm.checked,
    petSterilized: inSterilizedElm.checked,
    dateAdded: new Date(),
  };

  // ---------------  Validate dữ liệu hợp lệ--------------
  if (
    checkID(petData.petID) &&
    checkName(petData.petName) &&
    checkAge(petData.petAge) &&
    checkType(petData.petType) &&
    checkWeight(petData.petWeight) &&
    checkLength(petData.petLength) &&
    checkBreed(petData.petBreed)
  ) {
    petsList.push(petData); // push data object vào mảng
    // console.log(petsList);
    renderTableData(petsList, tbBodyElm, 'delete'); // render lại UI
    petsStore.saveToStorage(petsList); //lưu dữ liệu vào kho
    //-------------------xóa value các ô input-------------------------
    inIDElm.value = '';
    inNameElm.value = '';
    inAgeElm.value = '';
    inTypeElm.value = 'Select Type';
    inWeightElm.value = '';
    inLengthElm.value = '';
    inBreedElm.value = 'Select Breed';
    inVaccinatedElm.checked = false;
    inDewormedElm.checked = false;
    inSterilizedElm.checked = false;
  }
});

// ============lắng nghe sự kiện check Healthy==================
let isHeathyList = false;
let healthiesList;
btnHealthy.addEventListener('click', function () {
  isHeathyList = !isHeathyList;
  if (isHeathyList) {
    btnHealthy.textContent = 'Show All Pet';
    healthiesList = petsList.filter(
      pet => pet.petVaccinated && pet.petDewormed && pet.petSterilized
    );
    renderTableData(healthiesList, tbBodyElm, 'delete');
  } else {
    btnHealthy.textContent = 'Show Healthy Pet';
    renderTableData(petsList, tbBodyElm, 'delete');
  }
});

// ================hàm delete pet=================
function deletePet(id) {
  if (confirm(`Delete pet have ID ${id}. Are you sure?`)) {
    if (petsList) {
      petsList = petsList.filter(pet => pet.petID !== id); // xóa pet
      renderTableData(petsList, tbBodyElm, 'delete'); // render lại UI
      petsStore.saveToStorage(petsList); //lưu dữ liệu vào kho
    }
  }
}

// =============tính chỉ số BMI================
// function calcBMI(type, weight, length) {
//   let BMI;
//   if (type === 'Dog') {
//     BMI = (weight * 703) / (length * length);
//   } else if (type === 'Cat') {
//     BMI = (weight * 886) / (length * length);
//   }
//   return Math.round(BMI * 100) / 100;
// }

// =============lắng nghe sự kiện click của btnBMI============
// btnBMI.addEventListener('click', function () {
//   const bmiElms = document.querySelectorAll('.bmi-value');
//   for (let i = 0; i < petsList.length; i++) {
//     if (!petsList[i].petBMI) {
//       petsList[i].petBMI = calcBMI(
//         petsList[i].petType,
//         petsList[i].petWeight,
//         petsList[i].petLength
//       );
//       bmiElms[i].textContent = petsList[i].petBMI;
//     }
//   }
// });
