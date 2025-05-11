document.getElementById('button').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = '/';
});
let data = await fetch('/api/scores', {
        method: 'GET'
    });
data = await data.json();
console.log(data);
const tbody = document.querySelector("#leaderboard tbody");
for (let i = 0; i < data.length; ++i) {
    const row = document.createElement("tr");
    const numberCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const scoreCell = document.createElement("td");
    numberCell.textContent = i + 1;
    nameCell.textContent = data[i]['name'];
    scoreCell.textContent = data[i]['score'];
    row.appendChild(numberCell);
    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    tbody.appendChild(row);
}
tbody.innerHTML = table;
