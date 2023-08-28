//Game state
let gameID = 0;
let nodeID = 1;
let nodeData = null;
let state = null

//Elements
let gameIdEle = null;
let nodeIdEle = null;

let backgroundImg = null;
let leftCharImg = null;
let rightCharImg = null;

let btn1 = null;
let btn2 = null;
let nextBtn = null;

let speakerP = null;
let textP = null;

function getElements(){
    gameIdEle = document.querySelector("#gameID");
    nodeIdEle = document.querySelector("#nodeID");

    //Images
    backgroundImg = document.querySelector("#backgroundImg");
    leftCharImg = document.querySelector("#leftCharImg");
    rightCharImg = document.querySelector("#rightCharImg");

    //Buttons
    btn1 = document.querySelector("#btn1");
    btn2 = document.querySelector("#btn2");
    nextBtn = document.querySelector("#nextBtn");

    //Texts
    speakerP = document.querySelector("#speakerP");
    textP = document.querySelector("#textP");
}