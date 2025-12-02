// Elements
const booksContainer = document.getElementById('booksContainer');
const profilePic = document.getElementById('profilePic');
const socialLinks = document.querySelectorAll('.social-icon');

// Load data from data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Update profile photo
    if (data.profilePhoto) {
      profilePic.src = data.profilePhoto;
    }

    // Update social links
    if (data.social) {
      socialLinks.forEach(link => {
        const iconClass = link.querySelector('i').className;
        if (iconClass.includes('twitter')) link.href = data.social.twitter || '#';
        if (iconClass.includes('facebook')) link.href = data.social.facebook || '#';
        if (iconClass.includes('instagram')) link.href = data.social.instagram || '#';
        if (iconClass.includes('amazon')) link.href = data.social.amazon || '#';
      });
    }

    // Display books
    if (data.books && data.books.length > 0) {
      booksContainer.innerHTML = '';
      data.books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
          <img src="${book.cover}" alt="${book.title}" class="book-cover">
          <h3 class="book-title">${book.title}</h3>
          <p class="book-description">${book.description}</p>
          <a href="${book.link}" target="_blank" class="buy-btn">Buy Now</a>
        `;
        booksContainer.appendChild(bookCard);
      });
    } else {
      booksContainer.innerHTML = '<p>No books available yet.</p>';
    }
  })
  .catch(err => {
    console.error("Error loading data.json:", err);
    booksContainer.innerHTML = '<p>Failed to load books.</p>';
  });
