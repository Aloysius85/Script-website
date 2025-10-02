const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
let meals = {
  Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []
};

const mealForm = document.getElementById('mealForm');
const mealTable = document.getElementById('mealTable');

function renderTable() {
  let html = '';
  days.forEach(day => {
    html += `<div class="day-section">
      <div class="day-title">${day}</div>
      <table class="meal-table">
        <thead>
          <tr>
            <th>Meal Type</th>
            <th>Meal Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>`;
    if (meals[day].length === 0) {
      html += `<tr><td colspan="3" style="text-align: center;color: #aaa;">No meals planned</td></tr>`;
    } else {
      meals[day].forEach((meal, idx) => {
        if (meal.editing) {
          html += `<tr>
            <td>
              <select id="editType-${day}-${idx}">
                <option${meal.type==='Breakfast'?' selected':''}>Breakfast</option>
                <option${meal.type==='Lunch'?' selected':''}>Lunch</option>
                <option${meal.type==='Dinner'?' selected':''}>Dinner</option>
              </select>
            </td>
            <td>
              <input type="text" id="editName-${day}-${idx}" value="${meal.name}">
            </td>
            <td>
              <button class="action-btn save-btn" onclick="saveEdit('${day}',${idx})">Save</button>
              <button class="action-btn cancel-btn" onclick="cancelEdit('${day}',${idx})">Cancel</button>
            </td>
          </tr>`;
        } else {
          html += `<tr>
            <td>${meal.type}</td>
            <td>${meal.name}</td>
            <td>
              <button class="action-btn edit-btn" onclick="editMeal('${day}',${idx})">Edit</button>
              <button class="action-btn delete-btn" onclick="deleteMeal('${day}',${idx})">Delete</button>
            </td>
          </tr>`;
        }
      });
    }
    html += `</tbody></table></div>`;
  });
  mealTable.innerHTML = html;
}

// Add meal
mealForm.onsubmit = function(e) {
  e.preventDefault();
  const day = document.getElementById('daySelect').value;
  const type = document.getElementById('mealType').value;
  const name = document.getElementById('mealName').value.trim();
  if (!name) return;
  meals[day].push({type, name, editing: false});
  mealForm.reset();
  renderTable();
};

// Edit meal
window.editMeal = function(day, idx) {
  meals[day][idx].editing = true;
  renderTable();
};

// Save edit
window.saveEdit = function(day, idx) {
  const type = document.getElementById(`editType-${day}-${idx}`).value;
  const name = document.getElementById(`editName-${day}-${idx}`).value.trim();
  if (!name) return;
  meals[day][idx] = {type, name, editing: false};
  renderTable();
};

// Cancel edit
window.cancelEdit = function(day, idx) {
  meals[day][idx].editing = false;
  renderTable();
};

// Delete meal
window.deleteMeal = function(day, idx) {
  meals[day].splice(idx, 1);
  renderTable();
};

// Initial render
renderTable();