const cardsNumberArray = []
let firstCard = null
let secondCard = null

const title = document.createElement("h1")
title.textContent = 'Игра в пары'
const container = document.createElement("div")
const game = document.createElement("div")
container.classList.add('container')
game.classList.add('game')
game.id = 'game'
document.body.append(container)
container.append(title, game)

// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].
// count - количество пар.
function createNumbersArray(count, arr) {
  for (let i = 1; i <= count; i++) {
    arr.push(i, i)
  }

}

// Этап 2. Создайте функцию перемешивания массива. Функция принимает в аргументе исходный массив и возвращает перемешанный массив.
//  arr - массив чисел
function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let randomIndex = Math.floor(Math.random() * arr.length)
    let temp = arr[i]
    arr[i] = arr[randomIndex]
    arr[randomIndex] = temp
  }
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами.
// На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел.
// Вы также можете создать для этого специальную функцию. count - количество пар.

function startGame(container, count) {

  createNumbersArray(count, cardsNumberArray)
  shuffle(cardsNumberArray)

  for (const number of cardsNumberArray) {
    let card = document.createElement('div')
    card.textContent = number
    card.classList.add('card')

    card.addEventListener('click', () => {
      if (card.classList.contains('open') || card.classList.contains('success')) {
        return
      }
      if (firstCard !== null && secondCard !== null) {
        firstCard.classList.remove('open')
        secondCard.classList.remove('open')
        firstCard = null
        secondCard = null
      }

      card.classList.add('open')
      if (firstCard === null) {
        firstCard = card
      } else if (secondCard === null) {
          secondCard = card
      }

      if (firstCard !== null && secondCard !== null) {
        if (firstCard.textContent === secondCard.textContent) {
          firstCard.classList.add('success')
          secondCard.classList.add('success')
          firstCard = null
          secondCard = null
        }
      }

      if(document.querySelectorAll('.success').length === cardsNumberArray.length) {
        game.innerHTML = ''
        alert('Победа!')
        let count = Number(prompt('Введите количество пар карточек (от 2 до 10), значение по умолчанию - 4', 4))
        startGame(game, count)
      }

    })

    container.append(card)
  }
}

if ((!(count = Number(prompt('Введите количество пар карточек (от 2 до 10), значение по умолчанию - 4', 4)))) || count < 2 || count > 10) {
  count = 4
}

startGame(game, count)

