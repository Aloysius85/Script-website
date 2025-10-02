const petForm = document.getElementById('pet-form');
const petsList = document.getElementById('pets-list');
const sortAge = document.getElementById('sort-age');
const filterType = document.getElementById('filter-type');

let pets = [];

function getPetIcon(type) {
  return type === 'dog' ? '🐶' : '🐱';
}

function renderPets() {
  petsList.innerHTML = '';
  let filtered = pets.slice();

  if (filterType.value !== 'all') {
    filtered = filtered.filter(p => p.type === filterType.value);
  }

  if (sortAge.value === 'asc') {
    filtered.sort((a, b) => a.age - b.age);
  } else if (sortAge.value === 'desc') {
    filtered.sort((a, b) => b.age - a.age);
  }

  filtered.forEach((pet, idx) => {
    const card = document.createElement('div');
    card.className = 'pet-card' + (pet.adopted ? ' adopted' : '');

    card.innerHTML = `
      <div class="pet-icon">${getPetIcon(pet.type)}</div>
      <div class="pet-details">
        <div><strong>${pet.name}</strong></div>
        <div>Type: ${pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}</div>
        <div>Age: ${pet.age} yrs</div>
        ${pet.adopted ? '<div class="adopted-label">Adopted!</div>' : ''}
      </div>
      <button class="adopted-toggle">${pet.adopted ? 'Undo Adopt' : 'Mark Adopted'}</button>
    `;

    card.querySelector('.adopted-toggle').onclick = function() {
      pets[idx].adopted = !pets[idx].adopted;
      renderPets();
    };

    petsList.appendChild(card);
  });
}

petForm.onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('pet-name').value.trim();
  const type = document.getElementById('pet-type').value;
  const age = parseInt(document.getElementById('pet-age').value, 10);
  if (!name || !type || isNaN(age)) return;

  pets.push({ name, type, age, adopted: false });
  petForm.reset();
  renderPets();
};

sortAge.onchange = renderPets;
filterType.onchange = renderPets;

renderPets();