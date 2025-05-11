const finalScore = localStorage.getItem('finalScore');
localStorage.removeItem('finalScore');
document.getElementById('score').textContent = 'ВАШ СЧЁТ: ' + finalScore;
document.getElementById('button').addEventListener('click', function(e) {
    e.preventDefault();
    const userName = document.getElementById('input').value;
    if (!userName) {
        alert('Пожалуйста, введите имя');
        return;
    }
    console.log(userName + " " + finalScore);
    
    fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'name': userName, 'score': finalScore })
    });
    window.location.href = '/';
});