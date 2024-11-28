class AnimalTable {
  constructor(containerId, data, sortableColumns, nameStyle) {
    this.container = document.getElementById(containerId);
    this.data = data;
    this.sortableColumns = sortableColumns;
    this.nameStyle = nameStyle;
    this.render();
  }

  render() {
    this.container.innerHTML = `
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th><button class="btn btn-link" onclick="tableInstances['${
                this.container.id
              }'].sortTable('name')">Name</button></th>
              <th><button class="btn btn-link" onclick="tableInstances['${
                this.container.id
              }'].sortTable('location')">Location</button></th>
              <th><button class="btn btn-link" onclick="tableInstances['${
                this.container.id
              }'].sortTable('size')">Size</button></th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${this.data
              .map((animal, index) => this.renderRow(animal, index))
              .join("")}
          </tbody>
        </table>
      `;
  }

  renderRow(animal, index) {
    return `
        <tr>
          <td><img src="${animal.image}" class="animal-image"></td>
          <td class="${this.nameStyle}">${animal.name}</td>
          <td>${animal.location}</td>
          <td>${animal.size}</td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="tableInstances['${this.container.id}'].deleteAnimal(${index})">Delete</button>
          </td>
        </tr>
      `;
  }

  sortTable(column) {
    if (!this.sortableColumns.includes(column)) return;
    this.data.sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    this.render();
  }

  deleteAnimal(index) {
    this.data.splice(index, 1);
    this.render();
  }
}

const tableInstances = {};

function initializeTables() {
  tableInstances["table1"] = new AnimalTable(
    "table1",
    bigCats,
    ["name", "location", "size"],
    ""
  );
  tableInstances["table2"] = new AnimalTable(
    "table2",
    dogs,
    ["name", "location"],
    "font-weight-bold"
  );
  tableInstances["table3"] = new AnimalTable(
    "table3",
    bigFish,
    ["size"],
    "blue-text"
  );
}

initializeTables();
