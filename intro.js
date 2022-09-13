// 캐릭터 클릭 시 눌린게 이미지든 div든간에 div를 리턴
function returnDiv(clicked){
    // 이미지면
    if(clicked.querySelector("img")==null){
        return clicked.parentNode.parentNode.querySelector(".friend");
    }else{
        return clicked.parentNode.querySelector(".friend");
    }
}
for(let i of friend){
    i.addEventListener("click",selectedFriend);
}

// 캐릭터 체크 초기화
function charaterInit(...args){
    if(args.length==0){
        // 전부초기화
        for(let i of friend){
            i.checked="";
            i.parentNode.style.boxShadow=""
        }
    }else{
        // 들어온 인자 값이 있는 경우
        let thisrr = document.getElementById(args[0]);
        thisrr.parentNode.style.boxShadow="3px 0px 30px 0px rgba(240, 216, 168, 0.9)";
        thisrr.checked=true;
    }
}
// 캐릭터를 고르면
function selectedFriend(event){
    let ztarget = returnDiv(event.target);
    ztarget.value="true";
    charaterInit();
    charaterInit(ztarget.id);
}
// 입장!!!
btnEnter.addEventListener("click",(event)=>{
    let charater ="";
    friend.forEach(item => {
        // console.log(item)
        if(item.checked){
            charater = item.id;
        }
    });
    let nickname = document.querySelector("#nickname").value;
    if(charater==""){
        let choiceYourFriend = document.querySelector(".choiceYourFriend");
        choiceYourFriend.style.backgroundColor ="rgb(72, 72, 48)"
        choiceYourFriend.style.color="white";
        choiceYourFriend.style.boxShadow="3px 0px 30px 0px rgba(144, 144, 96, 0.9)";
        choiceYourFriend.style.transition ="all 0.3s linear"
        return;
    }else if(nickname==""){
        let nicknameplease = document.querySelector(".choiceName p");
        nicknameplease.style.backgroundColor ="rgb(72, 72, 48)"
        nicknameplease.style.color="white";
        nicknameplease.style.boxShadow="3px 0px 30px 0px rgba(144, 144, 96, 0.9)";
        nicknameplease.style.transition ="all 0.3s linear"
        return;
    }

    if(gamer.length==0){
        gamer.push({"key":'k',charater,nickname})
        let firstEntered = document.querySelector(".firstEntered"); 
        firstEntered.style.visibility = "visible";
        console.log(gamer);
        firstEntered.querySelector("img").src = `./${gamer[0]["charater"]}.png`;
        firstEntered.querySelector("p").innerText = `${gamer[0]["nickname"]}님이 게임 대기중입니다`;

        btnEnter.querySelector("input").value = "입장하기"
        charaterInit();
        document.querySelector("#nickname").value = "";
        
    }else {
        gamer.push({"key":'q',charater,nickname})
        document.querySelector(".init").style.display = "none";
        document.querySelector(".a00").style.display = "flex";
        init();
        gamers();
    }
})

function gamers(){
    let kroom = document.createElement("div");
    kroom.classList.add("kingsRoom");
    whosTurnBlink();
}
