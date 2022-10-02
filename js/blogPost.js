const blogContainer = document.querySelector(".blog-post");
const commentsContainer = document.querySelector(".comments");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postId = params.get("id");

const postUrl = `https://vierweb.no/project-exam-1/wp-json/wp/v2/posts/${postId}?_embed`;

async function getPost(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const postTitle = data.title.rendered;
    const postDate = data.date.substring(0, 10);
    const postAuthor = data._embedded.author[0].name;
    const postImage = data._embedded["wp:featuredmedia"]
      ? data._embedded["wp:featuredmedia"][0].source_url
      : "https://www.vierweb.no/project-exam-1/wp-content/uploads/2022/10/placeholder.png";
    const postImageAlt = data._embedded["wp:featuredmedia"]
      ? data._embedded["wp:featuredmedia"][0].alt_text
      : "Photo missing";
    const postContent = data.content.rendered;
    const comments = data._embedded.replies
      ? data._embedded.replies[0]
      : "No comments";

    document.title += " " + postTitle;

    blogContainer.innerHTML = "";
    blogContainer.innerHTML += `
    <h1>${postTitle}</h1>
    <p>published ${postDate} by ${postAuthor}</p>
    <img src="${postImage}" alt="${postImageAlt}" />

    ${postContent}
    `;

    commentsContainer.innerHTML = "";
    if (typeof comments === "string") {
      commentsContainer.innerHTML += comments;
    } else {
      comments.forEach((comment) => {
        const commentAuthor = comment.author_name;
        const commentDate = comment.date;
        const commentAuthorAvatar = comment.author_avatar_urls[48];
        const commentContent = comment.content.rendered;

        commentsContainer.innerHTML = `
        <div class="comment">
        <img src="${commentAuthorAvatar}" alt="${commentAuthor} avatar" />
        <p>${commentAuthor}</p>
        <p>${commentDate}</p>
        ${commentContent}
        </div>
        `;
      });
    }

    const modal = document.querySelector("#modal");
    const modalImage = modal.querySelector("#image");
    const modalImageAlt = modal.querySelector("#caption");

    const allImages = blogContainer.querySelectorAll("img");

    allImages.forEach((img) =>
      img.addEventListener("click", () => {
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalImageAlt.innerText = img.alt;
        modal.style.display = "block";
      })
    );

    document.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.code === "Escape") modal.style.display = "none";
    });

    //console.log(allImages);
  } catch (error) {
    blogContainer.innerHTML =
      "There was an error.. See the console for more information.";
    console.log(error);
  }
}

getPost(postUrl);
