document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  let container = document.querySelector(".container");
  let date_added = new Date();
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const card = data.map((item) => {
        return `
        <div class="card border-gradient border-gradient-purple">
          <article>
          <h2 id='title-text'>${item.title}</h2>
          <p id='body-text'>${item.post}</p>
          <p>Date -${new Date(date_added).toLocaleString()}</p>
          <div>
          <button data-id=${item.id} class="delete-btn">Delete </button>
        </div>
          </article>
      </div>`;
      });
      container.innerHTML = card;
    });
});

document.getElementById("addPostForm").addEventListener("submit", addPost);
function addPost(event) {
  event.preventDefault();

  let title = document.getElementById("title").value;
  let body = document.getElementById("body").value;

  const myPost = {
    title: title,
    body: body,
  };

  fetch("http://localhost:5000/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myPost),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject({
          status: res.status,
          statusText: res.statusText,
        });
      }
    })
    .then((data) => {
      console.log(data);
      if (data.affectedRows) {
        location.reload();
      }
    })
    .catch((err) => console.log("Error message:", err.statusText));
}

document.querySelector(".container").addEventListener("click", (e) => {
  if (e.target.className === "delete-btn") {
    deletePost(e.target.dataset.id);
  }
 });
function deletePost(id) {
  console.log(id, "deletePOST");
  fetch("http://localhost:5000/delete/" + id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "i m data");
      if (data.affectedRows) {
        location.reload();
      }
    });
}
