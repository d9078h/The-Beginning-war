function simulateWar() {
  const name1 = document.getElementById("name1").value;
  const name2 = document.getElementById("name2").value;
  const pop1 = parseFloat(document.getElementById("pop1").value);
  const pop2 = parseFloat(document.getElementById("pop2").value);
  const tech1 = parseFloat(document.getElementById("tech1").value);
  const tech2 = parseFloat(document.getElementById("tech2").value);
  const pol1 = parseFloat(document.getElementById("pol1").value);
  const pol2 = parseFloat(document.getElementById("pol2").value);

  const techScale = (lvl) => Math.pow(3, lvl - 1);

  const power1 = pop1 * techScale(tech1) * pol1;
  const power2 = pop2 * techScale(tech2) * pol2;

  const total = power1 + power2;
  const chance1 = ((power1 / total) * 100).toFixed(1);
  const chance2 = ((power2 / total) * 100).toFixed(1);

  const vsBanner = document.getElementById("vs-banner");
  const vsLeft = document.getElementById("vs-left");
  const vsRight = document.getElementById("vs-right");

  vsLeft.textContent = name1;
  vsRight.textContent = name2;

  vsBanner.classList.add("show-vs");

  const stage = document.getElementById("animation-stage");
  stage.innerHTML = "";

  setTimeout(() => {
    vsBanner.classList.remove("show-vs");

    setTimeout(() => {
      showResult(`승리 확률 - ${name1}: ${chance1}% / ${name2}: ${chance2}%`);

      setTimeout(() => {
        const winner = Math.random() < power1 / total ? name1 : name2;
        showResult(`${winner} 승리!`, true);
        triggerFireworks();
      }, 3000);
    }, 1500);
  }, 2500);
}

function showResult(text, isWinner = false) {
  const div = document.createElement("div");
  div.className = isWinner ? "winner result-box show" : "result-box show";
  div.textContent = text;
  document.getElementById("animation-stage").appendChild(div);
}

function triggerFireworks() {
  const stage = document.getElementById("animation-stage");
  for (let i = 0; i < 100; i++) {
    const fw = document.createElement("div");
    fw.className = "firework";
    fw.style.top = Math.random() * 100 + "%";
    fw.style.left = Math.random() * 100 + "%";
    fw.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    stage.appendChild(fw);
    setTimeout(() => fw.remove(), 1000);
  }
}
