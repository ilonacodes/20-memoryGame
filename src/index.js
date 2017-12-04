var capitals = ['Berlin', 'Berlin', 'Paris', 'Paris',
    'Madrid', 'Madrid', 'Rome', 'Rome',
    'Tokio', 'Tokio', 'London', 'London',
    'Seoul', 'Seoul', 'Oslo', 'Oslo'];

var covers = [

    '&spades;',
    '&hearts;',
    '&clubs;',
    '&diams;',
    '&spades;',
    '&hearts;',
    '&clubs;',
    '&diams;',
    '&spades;',
    '&hearts;',
    '&clubs;',
    '&diams;',
    '&spades;',
    '&hearts;',
    '&clubs;',
    '&diams;'

];

var shuffle = function (array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
};

shuffle(capitals);

var index;
var opened = [];
var stack = [];
var completed = [];

var cards = document.getElementsByTagName('td');

function closeCard(index) {
    cards[index].innerHTML = covers[index];
    opened[index] = false;
    stack = stack.filter(function (item) {
        return item !== index;
    });
}

for (var i = 0; i < cards.length; i++) {
    cards[i].setAttribute('data-index', i);
    cards[i].onclick = function (e) {
        index = parseInt(e.target.getAttribute('data-index'));
        var card = cards[index];

        if (completed[index]) {
            e.preventDefault();
            return false;
        }

        if (opened[index]) {
            closeCard(index);
        } else {
            card.innerHTML = capitals[index];
            opened[index] = true;
            stack.push(index);

            if (stack.length === 3) {
                closeCard(stack[0]);
                closeCard(stack[0]);
            }

            if (stack.length === 2 &&
                capitals[stack[0]] === capitals[stack[1]]) {
                completed[stack[0]] = true;
                completed[stack[1]] = true;
                stack.shift();
                stack.shift();
            }

            if (completed.length === capitals.length) {
                alert('You won!');
            }
        }

        e.preventDefault();
        return false;
    };
}

document.querySelector('.restart').addEventListener('click', function (e) {
    location.reload();
});
