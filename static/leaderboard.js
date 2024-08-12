let savedData = [];
function updateData(){
    fetch('/api/leaderboard')
    .then(response => response.json())
    .then(data => {
      if(data == savedData) return;

      savedData = data;
      let table = document.getElementById('leaderboard');
      table.innerHTML = `<span>Name</span>
    <span>Entry number</span>
    <span>Time Taken</span>
    <span>Attempts</span>`;
      data.forEach((entry, index) => {
        table.innerHTML += `<span>${entry.name}</span>
      <span>${entry.entry}</span>
      <span>${entry.time}</span>
      <span>${entry.attempts}</span>`;
      });
    });
}

setInterval(updateData, 5000);