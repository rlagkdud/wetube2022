const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteSpans = document.querySelectorAll(".delete__comment");

const addComment = (text, id) => {
  const videoCommets = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = `${text}`;
  const span2 = document.createElement("span");
  span2.className = "delete__comment";
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoCommets.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
    textarea.value = "";
  }
};

const handleDelete = async (event) => {
  const li = event.target.parentElement;
  const commentId = li.dataset.id;
  fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  li.remove();
};

if (form) {
  form.addEventListener("click", handleSubmit);
}

if (deleteSpans) {
  deleteSpans.forEach((deleteSpan) => {
    deleteSpan.addEventListener("click", handleDelete);
  });
}
