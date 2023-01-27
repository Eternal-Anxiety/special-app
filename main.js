(function () {

    let listArr = []

    function createAppTitle(title) {
        let appTitle = document.createElement('h2')
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createDiaryForm() {
        let form = document.createElement('form')
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div')
        let button = document.createElement('button')

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-danger')
        button.textContent = 'Add Note'
        button.disabled = true

        input.addEventListener('input', function () {

            if (button.disabled = true) {
                button.classList.remove('btn', 'btn-danger')
                button.classList.add('btn', 'btn-success')
            }

            if (input.value !== "") {
                button.disabled = false
            } else {
                button.disabled = true

            }
        })

        buttonWrapper.append(button);
        form.append(input)
        form.append(buttonWrapper)

        return {
            input, form, button
        }
    }


    function createNoteItem(obj) {

        let item = document.createElement('div');
        let cardBody = document.createElement('div')
        let cardTitle = document.createElement('h5')
        let cardTime = document.createElement('span')
        let cardText = document.createElement('p')
        let buttonWrapper = document.createElement('div')
        let deleteNoteButton = document.createElement('button')


        item.classList.add('card', 'border-info', 'mb-3', 'mr-3');
        item.style.width = "18rem";
        cardBody.classList.add('card-body', 'd-flex', 'flex-column');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = 'Note Name';
        cardTime.textContent = `Date: ${now} `;
        cardTime.classList.add('mb-3')
        cardTime.style.fontSize = "14px"
        cardText.classList.add('card-text', 'text-secondary');
        cardText.textContent = obj.text;
        buttonWrapper.classList.add('btn-group', 'btn-group-sm')
        deleteNoteButton.classList.add('btn', 'btn-danger')
        deleteNoteButton.textContent = 'Delete'


        deleteNoteButton.addEventListener('click', function () {


            if (confirm('Are you sure?')) {
                for (let i = 0; i < listArr.length; i++) {
                    if (listArr[i].id == obj.id) {
                        listArr.splice(i, 1)
                        break;
                    }
                }


                saveList(listArr, 'my')

                item.remove()
            }
        })


        cardBody.append(cardTitle)
        cardBody.append(cardText)
        cardBody.append(cardTime)
        buttonWrapper.append(deleteNoteButton);
        cardBody.append(buttonWrapper);
        item.append(cardBody);


        return {
            item, deleteNoteButton
        }


    }

    let date = new Date();
    let now = date.toLocaleDateString()


    function getNewId(arr) {
        let max = 0;

        for (let i = 0; i < listArr.length; i++) {
            if (arr[i].id > max) {
                max = arr[i].id
            }
        }
        return max + 1
    }


    document.addEventListener('DOMContentLoaded', function () {
        let container = document.getElementById('app')
        let itemWrapper = document.createElement('div')
        let appTitle = createAppTitle('What is new?')
        let diaryForm = createDiaryForm();

        itemWrapper.classList.add('d-flex', 'flex-wrap')

        container.append(appTitle);
        container.append(diaryForm.form);


        let localData = localStorage.getItem('my')

        if(localData!=="" && localData!==null){
            listArr = JSON.parse(localData)
        }

        for(const newItem of listArr){
            let noteItem = createNoteItem(newItem);

            console.log(listArr)

            container.append(itemWrapper)
            itemWrapper.append(noteItem.item)
        }

        console.log(localData)

        diaryForm.form.addEventListener('submit', function (e) {
            e.preventDefault()

            if (!diaryForm.input.value) {
                return;
            }


            let newItem = {
                id: getNewId(listArr),
                text: diaryForm.input.value,
                date: `${now}`
            }

            listArr.push(newItem)

            let noteItem = createNoteItem(newItem);

            console.log(listArr)

            container.append(itemWrapper)
            itemWrapper.append(noteItem.item)

            saveList(listArr, 'my')

            diaryForm.input.value = '';
        })
    })

    function saveList(arr, listName) {
        localStorage.setItem(listName, JSON.stringify(arr))

    }

})();
