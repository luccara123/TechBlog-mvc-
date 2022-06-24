async function editPost(e) {
    e.preventDefault();
    const post_title = document.querySelector('input[name="edit-post-title"]').value;
    const post_content = document.querySelector('textarea[name="edit-post-text"]').value;

     const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
      
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id,
          post_title,
          post_content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
};

const editBtn = document.querySelector('.edit-form')
editBtn.addEventListener('submit', editPost);