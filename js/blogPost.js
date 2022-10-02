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
    const postDate = data.date;
    const postAuthor = data._embedded.author[0].name;
    const postImage = data._embedded["wp:featuredmedia"]
      ? data._embedded["wp:featuredmedia"][0].source_url
      : "https://www.vierweb.no/project-exam-1/wp-content/uploads/2022/09/wp_dummy_content_generator_125.jpg";
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
    <p>${postDate}</p>
    <p>${postAuthor}</p>
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

        commentsContainer.innerHTML += `
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

    /*     // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = blogContainer.querySelectorAll("img");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");

    var showModal = function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    };

    for (var i = 0; i < img.length; i++) {
      img[i].addEventListener("click", showModal);
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    }; */

    const allImages = blogContainer.querySelectorAll("img");

    /*     function openModal() {
        modal.
    } */

    allImages.forEach((img) =>
      img.addEventListener("click", () => {
        modalImage.src = img.src;
        modal.style.display = "block";
      })
    );

    //console.log(allImages);
  } catch (error) {
    blogContainer.innerHTML =
      "There was an error.. See the console for more information.";
    console.log(error);
  }
}

getPost(postUrl);
