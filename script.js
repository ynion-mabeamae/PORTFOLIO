let commentName = document.querySelector("#comment_name");
let commentContent = document.querySelector("#comment_text");
let commentButton = document.querySelector("#comment_button");
let commentList = document.querySelector("#comment");

const commentListData = [
  {
    name: "Arroyo",
    comment: "It is a great goal to achieve! Work well.",
    date: new Date("03/19/2025, 9:18:28 PM"),
  },
  {
    name: "Delima",
    comment: "I hope you achieve your goals!",
    date: new Date("03/19/2025, 9:19:31 PM"),
  },
  {
    name: "˚ʚ♡ɞ˚Pat",
    comment: "𐙚⋆°｡⋆ You're making great progress!",
    date: new Date("03/19/2025, 9:20:40 PM"),
  },
];

function validateComment() {
  if (commentName.value && commentContent.value) {
    commentButton.disabled = false;
  } else {
    commentButton.disabled = true;
  }
}

function updateComment() {
  commentList.innerHTML = "";

  for (const commentData of commentListData) {
    const formatDate = new Date(commentData.date);
    const commentDiv = document.createElement("div");
    commentDiv.className = "upper-tags";

    commentDiv.innerHTML = `
          <div class="user-info">
            <span class="user-tag"><strong>${commentData.name}</strong></span>
            <span class="date-tag">${formatDate.toLocaleString()}</span>
          </div>
          <div class="user-comment">${commentData.comment}</div>`;

    commentList.append(commentDiv);
  }
}

function sortComments() {
  const sortType = document.querySelector("#sort_type").value;
  const newestSortType = "newest";

  commentListData.sort((a, b) => {
    if (sortType === newestSortType) {
      return b.date - a.date;
    } else {
      return a.date - b.date;
    }
  });

  updateComment();
}

function addComment() {
  const newComment = {
    name: commentName.value,
    comment: commentContent.value,
    date: new Date(),
  };

  commentListData.push(newComment);
  sortComments();

  commentName.value = "";
  commentContent.value = "";
  commentButton.disabled = true;
}

sortComments();
