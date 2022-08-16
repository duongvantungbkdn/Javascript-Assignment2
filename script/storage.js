'use strict';

// ==============tạo kho lưu trữ dữ liệu ====================
function createStore(key) {
  return {
    saveToStorage(value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getFromStorage() {
      return JSON.parse(localStorage.getItem(key));
    },
  };
}
const petsStore = createStore('petsList');
const breedsStore = createStore('breedsList');

let petsList = petsStore.getFromStorage() ?? []; // vào kho lấydữ liệu pets
let breedsList = breedsStore.getFromStorage() ?? []; // vào kho lấydữ liệu breeds

// =======khai báo các đối tượng dùng chung==============
const sidebarElm = document.getElementById('sidebar');
const tbBodyElm = document.getElementById('tbody');
const containerFormElm = document.getElementById('container-form');

const inIDElm = document.getElementById('input-id');
const inNameElm = document.getElementById('input-name');
const inAgeElm = document.getElementById('input-age');
const inTypeElm = document.getElementById('input-type');
const inWeightElm = document.getElementById('input-weight');
const inLengthElm = document.getElementById('input-length');
const inColorElm = document.getElementById('input-color-1');
const inBreedElm = document.getElementById('input-breed');
const inVaccinatedElm = document.getElementById('input-vaccinated');
const inDewormedElm = document.getElementById('input-dewormed');
const inSterilizedElm = document.getElementById('input-sterilized');

const btnSubmit = document.getElementById('submit-btn');

const dateNow = new Date();

// ==============định nghĩa các hàm dùng chung===========
// ----------render Select Breed--------------------
//arrBreeds: mảng chứa các Breed
//containerElm: element được render nội dung bên trong
//type: loại thú cưng được chọn
//isNotDepend: Các Breed hiển thị có phụ thuộc petType được chọn không
function renderSelectBreed(
  arrBreeds,
  containerElm,
  type = 'Select Type',
  isNotDepend = false
) {
  containerElm.innerHTML = '';

  if (arrBreeds) {
    let breeds;
    if (!isNotDepend && type === 'Dog') {
      breeds = arrBreeds
        .filter(petBreed => petBreed.type === 'Dog')
        .map(petBreed => petBreed.breed);
    } else if (!isNotDepend && type === 'Cat') {
      breeds = arrBreeds
        .filter(petBreed => petBreed.type === 'Cat')
        .map(petBreed => petBreed.breed);
    } else {
      breeds = arrBreeds.map(petBreed => petBreed.breed);
      let newArr = [];
      newArr = breeds.filter(function (item) {
        return newArr.includes(item) ? '' : newArr.push(item);
      });
      breeds = newArr;
    }
    // console.log(breeds);
    const selectBrHtmlString = breeds
      .map(breed => `<option>${breed}</option>`)
      .reduce(
        (sum, string) => (sum += string),
        '<option>Select Breed</option>'
      );
    containerElm.innerHTML = selectBrHtmlString;
  }
}

// ------------hàm render petsList ra bảng ------------
//arrPets: mảng chứa các pet object
//containerElm: element được render nội dung bên trong
//action: nút bấm hành động ('delete'/'edit')
//isAction: có cho phép hiển thị nút bấm action không
function renderTableData(
  arrPets,
  containerElm,
  action = 'delete',
  isAction = true
) {
  containerElm.innerHTML = ''; // xóa data cũ trong phần thân bảng

  // -------hiển thị kí hiệu giá trị true/false từ checkbox---------
  const checkboxHtmlString = data => {
    return data
      ? '<td><i class="bi bi-check-circle-fill"></i></td>'
      : '<td><i class="bi bi-x-circle-fill"></i></td>';
  };

  function renderAction(has, actionType, id) {
    if (has) {
      return `<td>
    <button type="button" 
    onclick="${actionType === 'edit' ? 'editPet' : 'deletePet'}('${id}')" 
    class="btn btn-${actionType === 'edit' ? 'warning' : 'danger'} btn-${
        actionType === 'edit' ? 'edit' : 'delete'
      }">
    ${actionType === 'edit' ? 'Edit' : 'Delete'}
    </button>
  </td>`;
    } else {
      return '';
    }
  }

  if (arrPets) {
    const tbEditBodyString = arrPets
      .map(
        pet =>
          `<tr>
    <th scope="row">${pet.petID}</th>
    <td>${pet.petName}</td>
    <td>${pet.petAge}</td>
    <td>${pet.petType}</td>
    <td>${pet.petWeight} kg</td>
    <td>${pet.petLength} cm</td>
    <td>${pet.petBreed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: 
      ${pet.petColor}"></i>
    </td>  
    ${checkboxHtmlString(pet.petVaccinated)}
    ${checkboxHtmlString(pet.petDewormed)}
    ${checkboxHtmlString(pet.petSterilized)}            
    <td>${new Date(pet.dateAdded).getDate()}/${
            new Date(pet.dateAdded).getMonth() + 1
          }/${new Date(pet.dateAdded).getFullYear()}</td>
    ${renderAction(isAction, action, pet.petID)}
    </tr>`
      )
      .reduce((sum, str) => (sum += str), '');
    containerElm.innerHTML = tbEditBodyString;
  }
}

//----------------các hàm validate---------------
function checkID(id) {
  let check = true;
  if (id === '') {
    alert('Please input ID!');
    check = false;
  } else {
    for (let i = 0; i < petsList.length; i++) {
      if (petsList[i].petID === id) {
        alert('ID must unique!');
        check = false;
        break;
      }
    }
  }
  return check;
}

function checkAge(age) {
  let check = true;
  if (!age) {
    alert("Please input pet's age!");
    check = false;
  } else {
    if (age < 1 || age > 15) {
      alert('Age must be between 1 and 15!');
      check = false;
    }
  }
  return check;
}

function checkWeight(weight) {
  let check = true;
  if (!weight) {
    alert("Please input pet's weight!");
    check = false;
  } else {
    if (weight < 1 || weight > 15) {
      alert('Weight must be between 1 and 15!');
      check = false;
    }
  }
  return check;
}

function checkLength(length) {
  let check = true;
  if (!length) {
    alert("Please input pet's length!");
    check = false;
  } else {
    if (length < 1 || length > 100) {
      alert('Length must be between 1 and 100!');
      check = false;
    }
  }
  return check;
}

const checkName = petName => {
  let check = true;
  if (!petName) {
    alert("Please input pet's name!");
    check = false;
  }
  return check;
};

const checkType = petType => {
  let check = true;
  if (petType === 'Select Type') {
    alert('Please select Type!');
    check = false;
  }
  return check;
};

const checkBreed = petBreed => {
  let check = true;
  if (petBreed === 'Select Breed') {
    alert('Please select Breed!');
    check = false;
  }
  return check;
};
