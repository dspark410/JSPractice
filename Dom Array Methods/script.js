const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = []

//Fetch api from randomuser.me and add money
getRandomUser()

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()

  const user = data.results[0]

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  }

  addData(newUser)
}

//double everyones money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 }
  })
  // console.log(data)
  updateDOM()
}

//sort users by richest
function sortByRichest() {
  data.sort((a, b) => {
    return b.money - a.money
  })
  //console.log(data)
  updateDOM()
}

//filter/show only millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000)
  //console.log(data)
  updateDOM()
}

//reduce/calculate everyones wealth together
function calculateWealth() {
  wealth = data.reduce((acc, user) => (acc += user.money), 0)

  //console.log(wealth)

  const wealthEl = document.createElement('div')
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`
  main.appendChild(wealthEl)
}

//add obj to data arr
function addData(obj) {
  data.push(obj)

  updateDOM()
}

//Update DOM
function updateDOM(providedData = data) {
  //clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

  providedData.forEach((person) => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`
    main.appendChild(element)
  })
}

//format number as money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

//event listeners
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillionairesBtn.addEventListener('click', showMillionaires)
calculateWealthBtn.addEventListener('click', calculateWealth)
