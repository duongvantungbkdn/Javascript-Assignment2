'use strict';

breedsList && renderBreedUI(breedsList); //render table body

// ==========lắng nghe sự kiện click sidebar============
sidebarElm.addEventListener('click', function () {
  this.classList.toggle('active');
});

btnSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  breedsList = breedsStore.getFromStorage() ?? []; // vào store lấy breedsList
  const breedData = {
    breed: inBreedElm.value.trim(),
    type: inTypeElm.value.trim(),
  };

  function checkBreed(petBreed) {
    let check = true;
    if (petBreed.breed === '') {
      alert('Please input Breed!');
      check = false;
    } else if (petBreed.type === 'Select Type') {
      alert('Please select Type!');
      check = false;
    } else {
      for (let i = 0; i < breedsList.length; i++) {
        if (
          breedsList[i].breed === petBreed.breed &&
          breedsList[i].type === petBreed.type
        ) {
          alert(
            `Breed ${petBreed.breed && petBreed.breed} of ${
              petBreed.type && petBreed.type
            } is existing!`
          );
          check = false;
          break;
        }
      }
    }
    return check;
  }

  if (checkBreed(breedData)) {
    breedsList.push(breedData);
    renderBreedUI(breedsList);
    breedsStore.saveToStorage(breedsList);
    inBreedElm.value = '';
    inTypeElm.value = 'Select Type';
  }
});

function renderBreedUI(arr) {
  tbBodyElm.innerHTML = ''; // xóa nội dung bảng cũ
  const tbContentHtmlString = arr
    .map(
      (item, i) =>
        `<tr>
    <td>${i + 1}</td>
    <td>${arr[i].breed}</td>
    <td>${arr[i].type}</td>
    <td>
      <button type="button" 
      onclick="deleteBreed('${arr[i].breed}','${arr[i].type}')" 
      class="btn btn-danger btn-delete">
        Delete
      </button>
    </td>
  </tr>
  `
    )
    .reduce((sum, string) => (sum += string), '');
  tbBodyElm.innerHTML = tbContentHtmlString;
}

// ================hàm delete pet=================
function deleteBreed(breed, type) {
  if (
    confirm(
      `Delete breed ${breed && breed} of ${type && type} type. Are you sure?`
    )
  ) {
    breedsList = breedsStore.getFromStorage(); // vào kho lấydữ liệu
    if (breedsList) {
      breedsList = breedsList.filter(
        petBreed => petBreed.breed !== breed || petBreed.type !== type
      ); // xóa breed
      renderBreedUI(breedsList); // render lại UI
      breedsStore.saveToStorage(breedsList); //lưu dữ liệu vào kho
    }
  }
}
