let boxes=document.querySelectorAll(".box"); //select all boxes whose class 'box'// here 'boxes' behave like array
let msg=document.querySelector(".msg");
let resetBtn=document.querySelector(".resetBtn");
let gameBody=document.querySelector(".gameBody");
let CountForO=document.querySelector("#CountForO");
let CountForX=document.querySelector("#CountForX");
let valueO=true;
const winnerIf=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]
let count=0;
let winCountO=0;
let winCountX=0;
boxes.forEach((box) => { // 'forEach' function for array(here boxes are array)
    box.addEventListener("click", ()=>{
        count=count+1;
        if(valueO){
            box.innerText="O"
            valueO=false;
            box.classList.add("oColor")
            box.classList.remove("clr")
        }
        else{
            box.innerText="X"
            valueO=true;
            // box.classList.add("oColor")
            box.classList.add("clr")
            box.classList.remove("oColor")
        }
        box.disabled=true; // disabled the button emmediate after click once
        checkWinner(); // check winner after every move
    })
});
const checkWinner =()=>{
    let winnerFound=false;
    winnerIf.forEach((rule)=>{
        let position1=boxes[rule[0]].innerText;
        let position2=boxes[rule[1]].innerText;
        let position3=boxes[rule[2]].innerText;
       if(position1 !="" && position2 !="" && position3 !="") {
        if(position1===position2 && position2===position3){
            printWinner(position1); // for print winner
            disabledBtn(); // for the disabled the rest of boxs after result reclaration
            winnerFound=true;
            boxes[rule[0]].classList.add("boxclr");
            boxes[rule[1]].classList.add("boxclr");
            boxes[rule[2]].classList.add("boxclr");
            if(position1==="O"){
                let oCount=winCountO+=1;
                CountForO.innerText=oCount;
            }
            else{
                let xCount=winCountX+=1;
                CountForX.innerText=xCount;
            }
        }
       }
    })
    if(winnerFound===false && count===9){
        msg.innerText= 'Match draw';
        msg.classList.add('showMsg');
        gameBody.classList.add('opacity');
    }
}
const printWinner=(position1)=>{
    msg.innerText= 'Congratulation, winner is '+position1;
    msg.classList.add('showMsg');
    gameBody.classList.add('opacity');
}
const disabledBtn=()=>{
    boxes.forEach((box)=>{
        box.disabled=true;
    })
}
resetBtn.addEventListener("click",()=>{
    boxes.forEach((box)=>{
        box.innerText=null
        box.disabled=false;
        box.classList.remove("boxclr");
        box.classList.remove("boxclr");
        box.classList.remove("boxclr");
    })
    msg.innerText= null
    msg.classList.remove('showMsg');
    count=0;
    gameBody.classList.remove('opacity');
    valueO=true;
})