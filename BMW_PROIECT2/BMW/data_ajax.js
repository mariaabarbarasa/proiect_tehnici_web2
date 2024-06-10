document.addEventListener('DOMContentLoaded', function() {
  fetch('/data_ajax.json')
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP erare! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          const dataList = document.getElementById('data-list');
          data.informations.forEach(item => {
              const listItem = document.createElement('li');
              listItem.textContent = item.name;
              dataList.appendChild(listItem);
          });
      })
      .catch(error => console.error('Eroare:', error));
});
