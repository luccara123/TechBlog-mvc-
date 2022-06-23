async function createPost(e) {
    e.preventDefault();

    const post_title = document.querySelector('input[name="create-post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-text"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        post_title,
        post_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
};
  
const addPostBtn = document.querySelector('.create-post-form');
addPostBtn.addEventListener('submit', createPost);