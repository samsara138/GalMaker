//Script handling the changes of an option state

let stateInputWidth = "120px";

//Adding a requirment on for an option
function reqOnClick(option, input1Val="", input2Val=""){
    let liObj = document.createElement("li");
    liObj.className = "dotless ";
    liObj.style.paddingTop = "5px";
    liObj.style.paddingBottom = "5px";

    let input1Obj = document.createElement("input");
    let input2Obj = document.createElement("input");
    input1Obj.className = "reqName ";
    input1Obj.placeholder = "name";
    input1Obj.style.marginRight = "10px";
    input1Obj.style.width = stateInputWidth;
    input1Obj.value = input1Val;
    input2Obj.className = "reqData ";
    input2Obj.placeholder = "state";
    input2Obj.style.width = stateInputWidth;
    input2Obj.value = input2Val;

    let btnObj = document.createElement("button");
    btnObj.innerHTML = "Remove";
    btnObj.className = "link-button";
    btnObj.style.marginLeft = "5px";
    btnObj.onclick = function(){
        liObj.remove();
        return false;
    };

    liObj.appendChild(input1Obj);
    liObj.appendChild(input2Obj);
    liObj.appendChild(btnObj);

    if(option == "A"){
        liObj.className += "aReqLi";
        opaAddReqUl.appendChild(liObj);
    }else{
        liObj.className += "bReqLi";
        opaBddReqUl.appendChild(liObj);
    }
    return false;
}

//Adding a state change on for an option
function chgOnClick(option, input1Val="", input2Val=""){
    let liObj = document.createElement("li");
    liObj.className = "dotless ";
    liObj.style.paddingTop = "5px";
    liObj.style.paddingBottom = "5px";

    let input1Obj = document.createElement("input");
    let input2Obj = document.createElement("input");
    input1Obj.className = "chgName ";
    input1Obj.placeholder = "name";
    input1Obj.value = input1Val;
    input1Obj.style.width = stateInputWidth;
    input1Obj.style.marginRight = "20px";
    input2Obj.className = "chgData ";
    input2Obj.placeholder = "state";
    input2Obj.value = input2Val;
    input2Obj.style.width = stateInputWidth;

    let btnObj = document.createElement("button");
    btnObj.innerHTML = "Remove";
    btnObj.className = "link-button";
    btnObj.style.marginLeft = "5px";
    btnObj.onclick = function(){
        liObj.remove();
        return false;
    };

    liObj.appendChild(input1Obj);
    liObj.appendChild(input2Obj);
    liObj.appendChild(btnObj);

    if(option == "A"){
        liObj.className += "aChgLi";
        opaAddChgUl.appendChild(liObj);
    }else{
        liObj.className += "bChgLi";
        opaBddChgUl.appendChild(liObj);
    }
    return false;
}