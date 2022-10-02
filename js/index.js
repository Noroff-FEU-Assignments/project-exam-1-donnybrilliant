const postsContainer = document.querySelector(".featured-posts");

async function getPosts(number) {
  const url = `https://vierweb.no/project-exam-1/wp-json/wp/v2/posts?_embed&per_page=${number}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    postsContainer.innerHTML = ""; // should be own clear function
    data.forEach((post) => {
      const postId = post.id;
      const postTitle = post.title.rendered;
      const postDate = post.date;
      const postAuthor = post._embedded.author[0].name;
      const postImage = post._embedded["wp:featuredmedia"]
        ? post._embedded["wp:featuredmedia"][0].source_url
        : "https://www.vierweb.no/project-exam-1/wp-content/uploads/2022/09/wp_dummy_content_generator_125.jpg";
      const postImageAlt = post._embedded["wp:featuredmedia"]
        ? post._embedded["wp:featuredmedia"][0].alt_text
        : "Photo missing";
      const commentNumber = post._embedded.replies
        ? post._embedded.replies[0].length
        : 0;

      postsContainer.innerHTML += `
      <article class="post">
      <a href="blog-post.html?id=${postId}">
      <img src="${postImage}" alt="${postImageAlt}" />
      <h3>${postTitle}</h3>
      <p>${postDate}</p>
        <p>${postAuthor}</p>
      <span class="comment-icon fa-stack fa-2x">
      <i class="fa-regular fa-comment fa-stack-2x"></i>
      <i class="fab fa-${commentNumber} fa-stack-1x"></i>
    </span>
    </a>
      </article>
      `;

      // if no image/title/whatever return default shit
    });
    postsContainer.innerHTML += `
    <button class="view-more">View More</button>`;
    const viewMoreButton = document.querySelector(".view-more");
    let clicked = number;
    const totalPosts = response.headers.get("x-wp-total");
    viewMoreButton.addEventListener("click", (event) => {
      if (clicked >= totalPosts) {
        viewMoreButton.setAttribute("disabled", "");
        return;
      } else {
        clicked += 5;
        getPosts(clicked);
      }
    });
    console.log(data);
  } catch (error) {
    postsContainer.innerHTML =
      "There was an error.. See the console for more information.";
    console.log(error);
  }
}

getPosts(10);
