function showNode(id=-1){
    showing_node_id = id;
    newNodeForm = document.querySelector('#new-node-form');

    nodeIdEle.value = id;
    backgroundEle.value = "";
    leftCharEle.value = "";
    rightCharEle.value = "";

    backgroundCurrEle.querySelector(".clear").checked = false;
    leftCharCurrEle.querySelector(".clear").checked = false;
    rightCharCurrEle.querySelector(".clear").checked = false;

    optionBtn.onclick = function(){
        setupOptionPanel();
    };

    if(id != -1){
        //Edit node
        nodeDeleteBtn.style.display = "block";
        fetchPath = "/get_node_data/" + id;
        fetch(fetchPath, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(result => {
            nameEle.value = result.name;
            speakerEle.value = result.speaker;
            textEle.value = result.text;
            nextEle.value = result.next;
            setupImageCurrent(backgroundCurrEle, result.background, result.backgroundUrl)
            setupImageCurrent(leftCharCurrEle, result.leftCharacter, result.leftCharacterUrl)
            leftCharShowEle.checked = result.leftCharacterHide;
            setupImageCurrent(rightCharCurrEle, result.rightCharacter, result.rightCharacterUrl)
            rightCharShowEle.checked = result.rightCharacterHide;
            formSubmitBtn.value = "Edit Node";
            populateOptionPanel(result)
        });
    }else{
        //Create node
        nameEle.value = "";
        speakerEle.value = "";
        textEle.value = "";
        nextEle.value = "";
        setupImageCurrent(backgroundCurrEle, "", "")
        setupImageCurrent(leftCharCurrEle, "", "")
        leftCharShowEle.checked = false;
        setupImageCurrent(rightCharCurrEle, "", "")
        rightCharShowEle.checked = false;
        nodeDeleteBtn.style.display = "none";
        formSubmitBtn.value = "Create Node";
        populateOptionPanel();
    }
}

function submitNodeForm(newNodeForm){
    let backgroundClearEle = document.querySelector("#form-background-current").querySelector(".clear");
    let backgroundClear = backgroundClearEle.checked;

    let leftCharClearEle = document.querySelector("#form-left-char-current").querySelector(".clear");
    let leftCharClear = leftCharClearEle.checked;

    let rightCharClearEle = document.querySelector("#form-right-char-current").querySelector(".clear");
    let rightCharClear = rightCharClearEle.checked;

    let formData = new FormData();
    formData.append("node_id", nodeIdEle.value);
    formData.append("game_id", game_id);
    formData.append("name", nameEle.value);
    formData.append("speaker", speakerEle.value);
    formData.append("text", textEle.value);
    formData.append("next", nextEle.value);

    formData.append("background", backgroundEle.files[0]);
    formData.append("backgroundClear", backgroundClear);
    formData.append("leftCharacter", leftCharEle.files[0]);
    formData.append("leftCharClear", leftCharClear);
    formData.append("leftCharHide", leftCharShowEle.checked);
    formData.append("rightCharacter", rightCharEle.files[0]);
    formData.append("rightCharClear", rightCharClear);
    formData.append("rightCharHide", rightCharShowEle.checked);

    formData.append("has_option", optionBtn.checked);
    if(optionBtn.checked){
        formData.append("option_A", optionA.value);
        formData.append("option_A_next", optionANext.value);
        formData.append("option_B", optionB.value);
        formData.append("option_B_next", optionBNext.value);

        let aReqLis = document.querySelectorAll(".aReqLi");
        let bReqLis = document.querySelectorAll(".bReqLi");
        let aChgLis = document.querySelectorAll(".aChgLi");
        let bChgLis = document.querySelectorAll(".bChgLi");

        formData.append("aReq", scrapReq(aReqLis));
        formData.append("bReq", scrapReq(bReqLis));
        formData.append("aChg", scrapChg(aChgLis));
        formData.append("bChg", scrapChg(bChgLis));
    }
    backgroundClearEle.checked = false;
    leftCharClearEle.checked = false;
    rightCharClearEle.checked = false;

    fetch("/handle_game_save", {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        setupNodeList();
        showNode(nodeIdEle.value);
     });
}

function scrapReq(ReqLis){
    let ReqData = [];
    ReqLis.forEach(function(li){
        let input1Obj = li.querySelector(".reqName");
        let input2Obj = li.querySelector(".reqData");
        let reqName = input1Obj.value;
        let reqState = input2Obj.value;
        if(reqName != "" && reqState != ""){
            ReqData.push(reqName,reqState);
        }
    })
    return ReqData;
}

function scrapChg(ChgLis){
    let ChgData = [];
    ChgLis.forEach(function(li){
        let input1Obj = li.querySelector(".chgName");
        let input2Obj = li.querySelector(".chgData");
        let chgName = input1Obj.value;
        let chgState = input2Obj.value;
        if(chgName != "" && chgState != ""){
            ChgData.push(chgName,chgState);
        }
    })
    return ChgData;
}

function setupImageCurrent(currentDiv, name, url){
    if(name != ""){
        currentDiv.style.display = "block";
        let currentPEle = currentDiv.querySelector(".current");
        currentPEle.innerHTML = name;
        currentPEle.href = url;
    }else{
        currentDiv.style.display = "none";
    }
}

function setupOptionPanel(){
    if(optionBtn.checked){
        optionDiv.style.display = "block";
    }else{
        optionDiv.style.display = "none";
    }
}

function populateOptionPanel(result = null){
    opaAddReqUl.innerHTML = "";
    opaAddChgUl.innerHTML = "";
    opaBddReqUl.innerHTML = "";
    opaBddChgUl.innerHTML = "";
    optionA.value = "";
    optionANext.value = "";
    optionB.value = "";
    optionBNext.value = "";

    if (result == null || !result.has_option){
        optionBtn.checked = false;
        optionDiv.style.display = "none";
        return;
    }
    optionBtn.checked = true;
    optionDiv.style.display = "block";
    optionA.value = result.option_a;
    optionANext.value = result.option_a_next;
    optionB.value = result.option_b;
    optionBNext.value = result.option_b_next;

    if(result.option_a_req.length > 1){
        for(let i = 0; i < result.option_a_req.length; i+=2){
            reqOnClick("A", result.option_a_req[i], result.option_a_req[i+1]);
        }
    }

    if(result.option_b_req.length > 1){
        for(let i = 0; i < result.option_b_req.length; i+=2){
            reqOnClick("B", result.option_b_req[i], result.option_b_req[i+1]);
        }
    }
    if(result.option_a_chg.length > 1){
        for(let i = 0; i < result.option_a_chg.length; i+=2){
            chgOnClick("A", result.option_a_chg[i], result.option_a_chg[i+1]);
        }
    }

    if(result.option_b_chg.length > 1){
        for(let i = 0; i < result.option_b_chg.length; i+=2){
            chgOnClick("B", result.option_b_chg[i], result.option_b_chg[i+1]);
        }
    }


}
