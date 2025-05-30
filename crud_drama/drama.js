const container = document.querySelector("#container");
const inputId = document.querySelector("#drama_id");
const inputTitle = document.querySelector("#drama_title");
const inputGenre = document.querySelector("#drama_genre");
const inputEpisode = document.querySelector("#drama_episode");
const inputDirector = document.querySelector("#drama_director");
const inputYear = document.querySelector("#release_year");

const endpoint = 
      "https://dimgrey-parrot-643194.hostingersite.com/exercises/drama.php";

async function getDrama() {
  const response = await fetch(endpoint);
  const data = await response.json();

  container.innerHTML = "";

  for (const item of data) {
    const row = document.createElement("tr");
    const editButton = getEditButton(item);
    const deleteButton = getDeleteButton(item);

    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.title}</td>
      <td>${item.genre}</td>
      <td>${item.episode}</td>
      <td>${item.director}</td>
      <td>${item.release_year}</td>`;

    row.append(editButton);
    row.append(deleteButton);
    container.append(row);
  }

  setInput();
}

async function insertDrama() {
  if (
    !inputTitle.value ||
    !inputGenre.value ||
    !inputEpisode.value ||
    !inputDirector.value ||
    !inputYear.value
  ) {
    alert("Please fill in all the fields before inserting.");
    return;
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `title=${inputTitle.value}&\
    genre=${inputGenre.value}&\
    episode=${inputEpisode.value}&\
    director=${inputDirector.value}&\
    release_year=${inputYear.value}`,
  };

  const response = await fetch(endpoint, options);

  if (!response.ok) {
    console.error(
      "Failed to insert drama: ",
      response.status,
      response.statusText
    );

    return;
  }

  getDrama();
}

async function updateDrama() {

  if (
    !inputTitle.value ||
    !inputGenre.value ||
    !inputEpisode.value ||
    !inputDirector.value ||
    !inputYear.value
  ) {
    alert("Please select to update.");
    return;
  }

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `id=${inputId.value}&\
    title=${inputTitle.value}&\
    genre=${inputGenre.value}&\
    episode=${inputEpisode.value}&\
    director=${inputDirector.value}&\
    release_year=${inputYear.value}`,
  };

  const response = await fetch(endpoint, options);

  if (!response.ok) {
    console.error(
      "Failed to update drama: ",
      response.status,
      response.statusText
    );

    return;
  }

  getDrama();
}

async function deleteDrama(id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `id=${id}`,
  };

  const response = await fetch(endpoint, options);

  if (!response.ok) {
    console.error(
      "Failed to delete drama: ",
      response.status,
      response.statusText
    );

    return;
  }

  getDrama();
}

function getDeleteButton(item) {
  const cell = document.createElement("td");
  const button = document.createElement("button");

  button.addEventListener("click", deleteDrama.bind(null, item.id));

  button.textContent = "Delete";
  cell.append(button);
  return cell;
}

function getEditButton(item) {
  const cell = document.createElement("td");
  const button = document.createElement("button");

  button.addEventListener(
    "click",
    setInput.bind(
      null,
      item.id,
      item.title,
      item.genre,
      item.episode,
      item.director,
      item.release_year
    )
  );

  button.textContent = "Edit";
  cell.append(button);
  return cell;
}

function setInput(id, title, genre, episode, director, year) {
  inputId.value = id ?? "";
  inputTitle.value = title ?? "";
  inputGenre.value = genre ?? "";
  inputEpisode.value = episode ?? "";
  inputDirector.value = director ?? "";
  inputYear.value = year ?? "";
}

getDrama();
