loadDefaultSymbols();
const country = document.getElementById("country");
const symbol = document.getElementById("symbol");
const form = document.getElementById("extremesForm");
const description = document.getElementById("description");
const addAlert = document.getElementById("addAlert");
const confirm = document.getElementById("confirm");

country.addEventListener("change", function () {
  loadTools(this.value);
  loadSymbols(document.getElementById("tool").value);
  loadDescription(symbol.value);
});

tool.addEventListener("change", function () {
  loadSymbols(this.value);
  loadDescription(symbol.value);
});

symbol.addEventListener("change", function () {
  loadDescription(this.value);
});

addAlert.addEventListener("click", function () {
  const min = document.getElementById("min");
  const max = document.getElementById("max");
  document.getElementById("confirm-country").innerText =
    country.value === "argentina" ? "Argentina" : "Estados Unidos";
  document.getElementById("confirm-tool").innerText = tool.value;
  document.getElementById("confirm-symbol").innerText = findSymbol();
  document.getElementById("confirm-description").innerText =
  findDescriptionBy(findSymbol(), symbols[country.value][tool.value]);
  document.getElementById("confirm-min").innerText = min.value;
  document.getElementById("confirm-max").innerText = max.value;
});

confirm.addEventListener("click", function () {
  try {
    send();
  } catch (error) {
    swal("Error", error.message, "error");
  }
});

function removeTools() {
  const tools = document.getElementById("tools");
  tools.innerHTML = "";
}

function loadTools(country) {
  const tool = document.getElementById("tool");
  if (country === "argentina") {
    tool.innerHTML = `
    <option value="cedears">cedears</option>
    <option value="actions">acciones</option>
    <option value="publicTitles">títulos públicos</option>
    <option value="options">opciones</option>
    <option value="cautions">cauciones</option>
    `;
  } else if (country === "usa") {
    tool.innerHTML = `
    <option value="adrs">aDRs</option>
    <option value="actions">acciones</option>
    `;
  }
}

function loadSymbols(tool) {
  const list = document.getElementById("symbol");
  const input = document.getElementById("symbol-text");
  list.innerHTML = "";
  if (canLoadSymbol()) {
    input.style.display = "none";
    symbol.style.display = "";
    symbols[country.value][tool].forEach((symbol) => {
      list.innerHTML += `<option value="${symbol.symbol}">${symbol.symbol}</option>`;
    });
  } else {
    symbol.style.display = "none";
    input.style.display = "";
  }
}

function loadDefaultSymbols() {
  const list = document.getElementById("symbol");
  symbols.argentina.cedears.forEach((symbol) => {
    list.innerHTML += `<option value="${symbol.symbol}">${symbol.symbol}</option>`;
  });
}

function loadDescription(symbol) {
  description.innerText = "";
  if (canLoadSymbol()) {
    description.innerText = findDescriptionBy(
      symbol,
      symbols[country.value][tool.value]
    );
  }
}

function findDescriptionBy(symbol, symbolsSegment) {
  for (const s of symbolsSegment) {
    if (symbol === s.symbol) return s.description;
  }
  throw new Error(`${symbol} no se encontró como símbolo.`);
}

function canLoadSymbol() {
  return (
    !(country.value === "usa" && tool.value === "actions") &&
    !(country.value === "argentina" && tool.value === "options")
  );
}

function send() {
  validateSend();
  const body = {
    country: country.value === "argentina" ? "Argentina" : "Estados Unidos",
    tool: tool.value,
    symbol: findSymbol(),
    description: description.innerText,
    min: min.value,
    max: max.value,
  };
  console.log(body);
}

function validateSend() {
  const input = document.getElementById('symbol-text');
  if (!min.value && !max.value) throw new Error("Un valor mínimo o un valor máximo es requerido.");
  if ((country.value === "usa" && tool.value === "actions") || (country.value === "argentina" && tool.value === "options")) {
    try {
      description.innerText = findDescriptionBy(input.value, symbols[country.value][tool.value]);
    } catch (error) {
      swal("Error", `${input.value} no se encontró como símbolo.`, "error");
    }
  }
}

function findSymbol() {
  if ((country.value === "usa" && tool.value === "actions") || (country.value === "argentina" && tool.value === "options")) {
    return document.getElementById('symbol-text').value;
  }
  return symbol.value;
}

  