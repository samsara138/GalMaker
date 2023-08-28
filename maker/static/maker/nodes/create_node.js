let game_id = -1
let showing_node_id = -1

document.addEventListener('DOMContentLoaded', function() {
    getFormElements();

    game_id = document.querySelector('#id-input').value;

    let editNameBtn = document.querySelector('#edit-game-name');
    editNameBtn.addEventListener('click', function(){editName();});

    let deleteGameBtn = document.querySelector('#delete-game-btn');
    deleteGameBtn.addEventListener('click', function(){deleteGame();});
    nodeDeleteBtn.addEventListener('click', function(){ deleteNode();});

    formSubmitBtn.addEventListener('click', function(){submitNodeForm(newNodeForm);});

    opaAddReq.addEventListener('click', function(){reqOnClick("A");});
    opaAddChg.addEventListener('click', function(){chgOnClick("A");});
    opaBddReq.addEventListener('click', function(){reqOnClick("B");});
    opaBddChg.addEventListener('click', function(){chgOnClick("B");});

    showNode(-1);
    setupNodeList();
});











