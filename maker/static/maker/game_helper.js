function editName(){
    let nameDisplay = document.querySelector("#game-name-display");
    let nameForm = document.querySelector("#edit-name-form");
    let nameInput = nameForm.querySelector("#edit-name-form-input");
    let editNameBtn =  document.querySelector('#edit-game-name');

    nameInput.value = nameDisplay.innerHTML;
    nameDisplay.style.display = "None";
    nameForm.style.display="inline-block";
    editNameBtn.style.display="None";

    nameForm.onsubmit = function(){
        nameDisplay.innerHTML = nameInput.value;
        nameDisplay.style.display = "inline-block";
        nameForm.style.display="None";
        editNameBtn.style.display="inline-block";

        fetch("/handle_game_save", {
            method: 'PUT',
            body: JSON.stringify({
                "id": game_id,
                "newName": nameDisplay.innerHTML
          })
        })
        .then(response => response.json())
        .then(result => {
        });
        return false;
    }
}

function deleteGame(){
    let fetchPath = "/get_game_data/" + game_id;
    fetch(fetchPath, {
        method: 'PUT'
    })
    .then(response => response.json())
    .then(result => {
        let aEle = document.querySelector("#create-game-url");
        aEle.click()
    });
}
