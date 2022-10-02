export async function getPosts(number) {
  const url = `https://vierweb.no/project-exam-1/wp-json/wp/v2/posts?_embed&per_page=${number}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    data.forEach((post) => {
      const postId = post.id;
      const postTitle = post.title.rendered;
      const postDate = post.date.substring(0, 10);
      const postAuthor = post._embedded.author[0].name;
      const postImage = post._embedded["wp:featuredmedia"]
        ? post._embedded["wp:featuredmedia"][0].source_url
        : "https://www.vierweb.no/project-exam-1/wp-content/uploads/2022/10/placeholder.png";
      const postImageAlt = post._embedded["wp:featuredmedia"]
        ? post._embedded["wp:featuredmedia"][0].alt_text
        : "Photo missing";
      const commentNumber = post._embedded.replies
        ? post._embedded.replies[0].length
        : 0;
    });
  } catch (error) {
    postsContainer.innerHTML =
      "There was an error.. See the console for more information.";
    console.log(error);
  }
}
