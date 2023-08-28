document.addEventListener('DOMContentLoaded', function() {
    getElements();
    gameID = gameIdEle.value;
    nodeID = nodeIdEle.value;
    state = new GameState();

    //Get the data of the first node
    updateNodeData();
});

//Update node date according to current nodeID
function updateNodeData(){
    fetchPath = "/get_game_node_data/" + gameID + "/" + nodeID;
    fetch(fetchPath, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(result => {
        nodeData = result;
        renderCurrNode();
    });
}

//Render the node data that's stored in nodData
function renderCurrNode(){
    setupImages();
    setupOptions();
    speakerP.innerHTML = nodeData.speaker;
    showText(textP, nodeData.text);
}

//Setting up the images
function setupImages(){
    //Background
    if(nodeData.backgroundUrl != null){
        backgroundImg.style.opacity = 0;
        backgroundImg.src = nodeData.backgroundUrl;
        fadeIn(backgroundImg);
    }

    //Left character
    if(nodeData.leftCharacterUrl != null){
        leftCharImg.style.opacity = 0;
        leftCharImg.style.display = "Block";
        leftCharImg.src = nodeData.leftCharacterUrl;
        fadeIn(leftCharImg);
    }
    if(nodeData.leftCharacterHide){
        fadeOut(leftCharImg);
    }

    //right character
    if(nodeData.rightCharacterUrl != null){
        rightCharImg.style.opacity = 0;
        rightCharImg.style.display = "Block";
        rightCharImg.src = nodeData.rightCharacterUrl;
        fadeIn(rightCharImg);
    }
    if(nodeData.rightCharacterHide){
        fadeOut(rightCharImg);
    }
}

//Setting up the next step
function setupOptions(){
    if(nodeData.has_option){
        //OP1
        btn1.style.display = "block";
        btn1.innerHTML = nodeData.option_a;
        btn1.onclick = function(){
            state.addChanges(nodeData.option_a_chg);
            nextBtnAction(nodeData.option_a_next);
        }
        if(!state.checkReq(nodeData.option_a_req)){
            btn1.style.color = "gray";
            btn1.disabled = true;
        }else{
            btn1.style.color = "black";
            btn1.disabled = false;
        }

        //OP2
        btn2.style.display = "block";
        btn2.innerHTML = nodeData.option_b;
        btn2.onclick = function(){
            state.addChanges(nodeData.option_b_chg);
            nextBtnAction(nodeData.option_b_next);
        }
        if(!state.checkReq(nodeData.option_b_req)){
            btn2.style.color = "gray";
            btn2.disabled = true;
        }else{
            btn2.style.color = "black";
            btn2.disabled = false;
        }

        nextBtn.style.display = "None";
    }else{
        //Hide the options is no option
        btn1.style.display = "None";
        btn2.style.display = "None";
        nextBtn.style.display = "block";
        nextBtn.onclick = function(){nextBtnAction(nodeData.next);}
    }
}

function nextBtnAction(nextID){
    nodeID = nextID;
    updateNodeData();
}