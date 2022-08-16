'use strict';

const inFileElm = document.getElementById('input-file');
const importBtn = document.getElementById('import-btn');
const exportBtn = document.getElementById('export-btn');

const inFileBrElm = document.getElementById('input-file-br');
const importBrBtn = document.getElementById('import-btn-br');
const exportBrBtn = document.getElementById('export-btn-br');

// ==========lắng nghe sự kiện click sidebar============
sidebarElm.addEventListener('click', function () {
  this.classList.toggle('active');
});

// ============lắng nghe sự kiện click export pets data=========
exportBtn.addEventListener('click', function (e) {
  e.preventDefault();
  petsList = petsStore.getFromStorage() ?? []; // vào kho lấydữ liệu pets
  const petsListJson = JSON.stringify(petsList);
  var blob = new Blob([petsListJson], {
    type: 'text/plain;charset=utf-8',
  });
  saveAs(blob, 'petsList.txt');
});

// ============lắng nghe sự kiện click import pets data=========
importBtn.addEventListener('click', function (e) {
  e.preventDefault();

  if ('files' in inFileElm) {
    if (inFileElm.files.length === 0) {
      alert('Please, choose File.');
    } else {
      var reader = new FileReader();
      reader.readAsText(inFileElm.files[0], 'UTF-8');
      reader.onload = function (e) {
        const petsDataUpload = JSON.parse(e.target.result);
        console.log(petsDataUpload);
        if (validatePetsData(petsDataUpload)) {
          petsStore.saveToStorage(petsDataUpload);
        } else {
          alert('Breeds data is wrong format or wrong data');
        }
      };
      reader.onerror = function (e) {
        alert('error reading file');
      };
    }
  } else {
    if (inFileElm.value == '') {
      alert('Please, choose File.');
    } else {
      alert(
        `The files property is not supported by your browser! The path of file: ${inFileElm.value}`
      );
    }
  }
});

// ============lắng nghe sự kiện click export breeds data=========
exportBrBtn.addEventListener('click', function (e) {
  e.preventDefault();
  breedsList = breedsStore.getFromStorage() ?? []; // vào kho lấydữ liệu breeds
  const breedsListJson = JSON.stringify(breedsList);
  var blob = new Blob([breedsListJson], {
    type: 'text/plain;charset=utf-8',
  });
  saveAs(blob, 'breedsList.txt');
});

// ============lắng nghe sự kiện click import breeds data=========
importBrBtn.addEventListener('click', function (e) {
  e.preventDefault();

  if ('files' in inFileBrElm) {
    if (inFileBrElm.files.length === 0) {
      alert('Please, choose File.');
    } else {
      var reader = new FileReader();
      reader.readAsText(inFileBrElm.files[0], 'UTF-8');
      reader.onload = function (e) {
        const breedsDataUpload = JSON.parse(e.target.result);
        // console.log(breedsDataUpload);
        if (validateBreedsData(breedsDataUpload)) {
          breedsStore.saveToStorage(breedsDataUpload);
        } else {
          alert('Breeds data is wrong format or wrong data');
        }
      };
      reader.onerror = function (e) {
        alert('error reading file');
      };
    }
  } else {
    if (inFileBrElm.value == '') {
      alert('Please, choose File.');
    } else {
      alert(
        `The files property is not supported by your browser! The path of file: ${inFileBrElm.value}`
      );
    }
  }
});

// ==============hàm validate nội dung dữ liệu==================
function validatePetsData(arrPets) {
  let check = true;
  const arrID = [];
  for (let i = 0; i < arrPets.length; i++) {
    if (
      !arrPets[i].petID ||
      !arrPets[i].petName ||
      !arrPets[i].petColor ||
      !arrPets[i].petBreed ||
      !arrPets[i].dateAdded ||
      !arrPets[i].petAge ||
      typeof arrPets[i].petAge !== 'number' ||
      arrPets[i].petAge < 1 ||
      arrPets[i].petAge > 15 ||
      !arrPets[i].petWeight ||
      typeof arrPets[i].petWeight !== 'number' ||
      arrPets[i].petWeight < 1 ||
      arrPets[i].petWeight > 15 ||
      !arrPets[i].petLength ||
      typeof arrPets[i].petLength !== 'number' ||
      arrPets[i].petLength < 1 ||
      arrPets[i].petLength > 100 ||
      (arrPets[i].petType !== 'Dog' && arrPets[i].petType !== 'Cat') ||
      (arrPets[i].petVaccinated !== true &&
        arrPets[i].petVaccinated !== false) ||
      (arrPets[i].petDewormed !== true && arrPets[i].petDewormed !== false) ||
      (arrPets[i].petSterilized !== true && arrPets[i].petSterilized !== false)
    ) {
      check = false;
      break;
    } else {
      // kiểm tra trùng ID
      for (let j = 0; j < i; j++) {
        if (arrPets[i].petID === arrPets[j].petID) {
          check = false;
          break;
        }
      }
    }
    console.log(typeof arrPets[i].petLength !== 'number');
  }
  return check;
}

function validateBreedsData(arrBreeds) {
  let check = true;
  for (let i = 0; i < arrBreeds.length; i++) {
    if (
      !arrBreeds[i].breed ||
      (arrBreeds[i].type !== 'Dog' && arrBreeds[i].type !== 'Cat')
    ) {
      check = false;
      break;
    }
  }
  return check;
}
