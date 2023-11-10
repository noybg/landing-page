const prices = {
  usd: {
    original: { regular: 39.99, discount: 19.99 },
    supportPack: { regular: 12.99, discount: 7.59 },
    currency: { symbol: "$", code: "USD" }
  },

  eur: {
    original: { regular: 29.99, discount: 9.99 },
    supportPack: { regular: 9.99, discount: 6.43 },
    currency: { symbol: "€", code: "EUR" }
  },

  yen: {
    original: { regular: 159, discount: 59.1 },
    supportPack: { regular: 59, discount: 26.23 },
    currency: { symbol: "¥", code: "YEN" }
  },

  nis: {
    original: { regular: 130.9, discount: 58.9 },
    supportPack: { regular: 27.9, discount: 14.9 },
    currency: { symbol: "₪", code: "nis" }
  }
};

const select = document.getElementById('currency-list');
const selectOptions = document.getElementById('currency-list').options;
const regPrice = document.querySelector('.reg-price span');
const nowOnly = document.querySelector('.now-only');
const checkbox = document.querySelector('input[type="checkbox"]');
const CTA = document.querySelector('.CTA');
const error = document.querySelector('.error');
let isSupport = false;
let options = currencyArray(prices);

function currencyArray(prices) {
  let arr = [];

  for (const [key, value] of Object.entries(prices)) {
    let curr = value.currency.code.toLocaleUpperCase();
    arr.push(curr);
  }
  return arr;
};

options.forEach(option =>
  selectOptions.add(new Option(option, option))
);

function checkCurrency(isSupport) {
  let val = select.value.toLowerCase();
  let {symbol} = prices[val].currency; 

  if (isSupport) {
    let {regular, discount} = prices[val].supportPack; 
    regPrice.innerHTML = symbol + regular;
    nowOnly.innerHTML = symbol + discount;
  } else {
    let {regular, discount} = prices[val].original; 
    regPrice.innerHTML = symbol + regular;
    nowOnly.innerHTML = symbol + discount;
  }
};

select.addEventListener('change', () => checkCurrency(isSupport));

function checkboxPrice(isChecked) {  
  isChecked.checked ? isSupport = true : isSupport = false;
  checkCurrency(isSupport);
};

function clickBtn() {
  CTA.innerHTML = `<div class="wrapper">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                  </div>`;
  const animated = document.querySelector('.circle');
    
  animated.addEventListener('animationend', () => {
    CTA.innerHTML = '<img src="images/icon-btn.png" alt="icon"> Add Intego Privacy Protection';
    error.style.visibility = 'visible';
  });
};