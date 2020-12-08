let ticketsInfoString = '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'; //
let ticketPrice = 361;
let chosenticketsCount = 0;
let sum = 0;
updateView();

function onSwitchToggle(id) {
  chosenticketsCount = 0;
  let switches = document.querySelectorAll('input[type=checkbox]');
  for (let i = 0; i < switches.length; i++) {
    if (switches[i].checked) {
      chosenticketsCount++;
    }
  }
  sum = ticketPrice * chosenticketsCount;
  updateView();
}

function updateView() {
  $('#count').html('Choosed places: ' + chosenticketsCount);
  $('#sum').html(`Price: ${sum} rubles`);
}

$(function () {
  for (let i = 0; i < ticketsInfoString.length; i++) {
    let disabled = (ticketsInfoString[i] === '1') ? 'disabled' : '';
    let disabledticket = (disabled) ? 'disabled-ticket' : '';
    let ticketNumber = ((i + 1) < 10) ? ('&nbsp;' + (i + 1).toString()) : (i + 1);
    $('#tickets-area').append(`<div class="custom-control ${disabledticket} custom-switch">` +
      '<input type="checkbox" ' + disabled +
      ` class="custom-control-input" id="ticket${i}" onchange="onSwitchToggle(${i})">` +
      `<label class="custom-control-label" for="ticket${i}">${ticketNumber}</label>` +
      '</div>');
  }
  $('#btnbuy').click(
    function () {
      let boughttickets = [];
      let newticketsString = '';
      let switches = document.querySelectorAll('input[type=checkbox]');
      for (let i = 0; i < switches.length; i++) {
        if (switches[i].checked) {
          boughttickets.push(Number.parseInt(switches[i].id.substr(5)) + 1);
          newticketsString += '1';
        } else if (switches[i].disabled) {
          newticketsString += '1';
        } else {
          newticketsString += '0';
        }
      }
      if (boughttickets.length === 0) {
        Swal.fire('Не выбрано ни одного места!');
        return;
      }
      let dataToSend = {
        newticketsString: newticketsString,
        boughttickets: boughttickets,
        sum: sum
      };
      console.log(dataToSend);
      $.ajax({
        type: "POST",
        url: "http://localhost/Laboratory/bookController.php",
        data: JSON.stringify(dataToSend),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      });
      Swal.fire({
        title: 'Успешно забронировано',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(function () {
        window.location.href = "movies.html";
      }, 1800);
    }
  );
});
