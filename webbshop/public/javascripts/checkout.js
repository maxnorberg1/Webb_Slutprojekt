var stripe = Stripe('sk_test_51IjaarKYqd7ERY9f4JdFCN0x22mzaZb78w5NfZVOoqUN60fpQw2iTrcT3vmBmpvQrFOVYNy41rGBeIiv7NTyrqju00XTBgry9o');

var elements = stripe.elements();

var style = {
  base: {
    color: "#32325d",
    fontSize: '16px',
    'fontFamily': 'apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
  }

};

var card = elements.create("card", {
  style: style,
  hidePostalCode: true
});
card.mount("#card-element");

card.on('change', function (event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});