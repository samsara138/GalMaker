function deleteNode(){
    fetchPath = "/get_node_data/" + showing_node_id;
    fetch(fetchPath, {
        method: 'PUT',
        body: JSON.stringify({
            "game_id": game_id,
        })
    })
    .then(response => response.json())
    .then(result => {
        showNode(-1);
        setupNodeList();
    });
}

function setupNodeList(){
    let ulEle = document.querySelector('#node-list');
    ulEle.innerHTML = "";
    let fetchPath = "/get_game_data/" + game_id;
    fetch(fetchPath, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(result => {
        for(let key in result.node_meta){
            let id = key;
            let name = result.node_meta[id][0]
            let global_id = result.node_meta[id][1]

            liEle = document.createElement("li");
            liEle.className = "dotless";

            buttonEle = document.createElement("button");
            buttonEle.innerHTML = id + " -> " + name;
            buttonEle.className = "link-button";
            buttonEle.addEventListener('click', function(){showNode(global_id);});

            inputEle = document.createElement("input");
            inputEle.type = "hidden";
            inputEle.value = global_id;
            inputEle.className = "node-id-holder";

            buttonEle.appendChild(inputEle)
            liEle.appendChild(buttonEle);
            ulEle.appendChild(liEle)
        }

        liEle = document.createElement("li");
        liEle.className = "dotless";

        buttonEle = document.createElement("button");
        buttonEle.innerHTML = "Create new node";
        buttonEle.className = "link-button";
        buttonEle.addEventListener('click', function(){showNode(-1);});

        liEle.appendChild(buttonEle)
        ulEle.appendChild(liEle)
    });
}