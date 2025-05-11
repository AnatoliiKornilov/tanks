document.getElementById('button').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = '/';
});
fetch('/static/rulls_window/rulls.txt')
  .then(response => response.text())
  .then(text => {
    document.getElementById('rulls').textContent = text;
  })
  .catch(error => {
    console.error('Ошибка:', error);
    document.getElementById('content').textContent = 'Не удалось загрузить файл';
  });