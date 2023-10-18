// Establish dom elements as variables 

const grocerySubmit = document.getElementById('addGrocery');
const list = document.getElementById('list');
const clearBtn = document.getElementById('clear');
const itemInput = document.getElementById('newItem')

// Instantiate default state value:

const initialState = {
    groceries: []
}

// Reducer function 

const groceryReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'grocery/add' :
            return { groceries: [...state.groceries, { text: action.text} ] }
        case 'grocery/clear' :
            return { groceries: [] }
        default:
            return state
    }
}

// Establishing Store

const store = Redux.createStore(groceryReducer)

// Reducer Function 

const clearList = () => {
    itemInput.value = ''
    store.dispatch({
        type: 'grocery/clear'
    })
}

const newGrocery = () => {
    let groceryText = itemInput.value
    store.dispatch({
        type: 'grocery/add',
        text: groceryText
    })
    console.log(store.getState())
}

const renderList = () => {
    list.innerHTML = ''
    const state = store.getState()
    state.groceries.forEach(grocery => {
        let li = document.createElement('li')
        list.append(li)
        li.textContent = grocery.text
    })
}

store.subscribe(renderList)

// Event Handlers 

grocerySubmit.addEventListener('click', newGrocery)
clearBtn.addEventListener('click', clearList)