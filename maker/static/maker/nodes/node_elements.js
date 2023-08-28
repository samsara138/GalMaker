// All the element  in the form
let nodeIdEle = null;
let newNodeForm = null;

let nameEle = null;
let speakerEle = null;
let textEle = null;
let nextEle = null;

let optionBtn = null;
let optionDiv = null;
let optionA = null;
let optionANext = null;
let optionB = null;
let optionBNext = null;

let backgroundEle = null;
let backgroundCurrEle = null;
let leftCharEle = null;
let leftCharCurrEle = null;
let leftCharShowEle = null;
let rightCharEle = null;
let rightCharCurrEle = null;
let rightCharShowEle = null;

let formSubmitBtn = null;
let nodeDeleteBtn = null;

let opaAddReq = null;
let opaAddReqUl = null;
let opaAddChg = null;
let opaAddChgUl = null;
let opaBddReq = null;
let opaBddReqUl = null;
let opaBddChg = null;
let opaBddChgUl = null;

function getFormElements(){
    newNodeForm = document.querySelector("#new-node-form")
    nodeIdEle = newNodeForm.querySelector("#node-id");

    nameEle = newNodeForm.querySelector("#form-name");
    speakerEle = newNodeForm.querySelector("#form-speaker");
    textEle = newNodeForm.querySelector("#form-text");
    nextEle = newNodeForm.querySelector("#form-next");

    optionBtn = document.querySelector("#form-has-option");
    optionDiv = document.querySelector("#form-option");
    optionA = document.querySelector("#form-oa");
    optionANext = document.querySelector("#form-oa-next");
    optionB = document.querySelector("#form-ob");
    optionBNext = document.querySelector("#form-ob-next");

    backgroundEle = document.querySelector("#form-Background");
    backgroundCurrEle = document.querySelector("#form-background-current");
    leftCharEle = document.querySelector("#form-left-character");
    leftCharCurrEle = document.querySelector("#form-left-char-current");
    leftCharShowEle = document.querySelector("#form-left-char-show")
    rightCharEle = document.querySelector("#form-right-character");
    rightCharCurrEle = document.querySelector("#form-right-char-current");
    rightCharShowEle = document.querySelector("#form-right-char-show")
    formSubmitBtn = document.querySelector("#submit-node-form");
    nodeDeleteBtn = document.querySelector("#delete-note-btn");

    opaAddReq = document.querySelector("#opa-req");
    opaAddReqUl = document.querySelector("#opa-req-ul");
    opaAddChg = document.querySelector("#opa-chg");
    opaAddChgUl = document.querySelector("#opa-chg-ul");
    opaBddReq = document.querySelector("#opb-req");
    opaBddReqUl = document.querySelector("#opb-req-ul");
    opaBddChg = document.querySelector("#opb-chg");
    opaBddChgUl= document.querySelector("#opb-chg-ul");
}