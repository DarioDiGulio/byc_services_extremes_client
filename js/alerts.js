const alertsTable = document.getElementById('alerts');
const deleteButton = document.getElementById('delete');
let idToDelete = '';

const printExtremes = (extremes) => {
  alertsTable.innerHTML = '';
  extremes.forEach(function (alert) {
    alertsTable.innerHTML += `
      <tr>
        <td hidden>${alert.id}</td>
        <td>${alert.country}</td>
        <td>${alert.tool}</td>
        <td>${alert.symbol}</td>
        <td>${alert.description}</td>
        <td>${alert.min === 'null' ? 'N/A' : alert.min}</td>
        <td>${alert.max === 'null' ? 'N/A' : alert.max}</td>
        <td><a uk-icon="trash" href="#modal-example" uk-toggle class="action-delete"></a></td>
      </tr>  
    `;
  })
  const actionsDelete = document.getElementsByClassName('action-delete');
  Array.from(actionsDelete).forEach((actionDelete) => actionDelete.addEventListener('click', function () {
    idToDelete = findId(this);
  }));
}

function findId(tdElement) {
  return tdElement
    .parentNode
    .previousSibling
    .previousSibling
    .previousSibling
    .previousSibling
    .previousSibling
    .previousSibling
    .previousSibling
    .previousSibling
    .previousSibling
    .previousSibling
    .previousSibling
    .previousSibling
    .previousSibling
    .previousSibling
    .innerText;
}

deleteButton.addEventListener('click', function() {
  deleteExtreme(idToDelete);
  swal("Éxito", "Alerta eliminada exitosamente! \nRecargá la página para ver los datos actualizados.", "success");
})

getExtremes(printExtremes);
