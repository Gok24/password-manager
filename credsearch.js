searchi = document.querySelector(".search")
  const searchInput = document.getElementById('searchInput');

  searchi.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const items = document.querySelectorAll('.savedLogins .item');

    items.forEach(item => {
      const appId = item.getAttribute('data-appid').toLowerCase();
      if (appId.includes(query)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });