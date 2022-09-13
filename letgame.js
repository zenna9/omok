// 돌 놓기
window.addEventListener("keyup",fKeyUp,false);
var keys = [];
function fKeyUp(e){
    keys[e.keyCode] = true;
    if(keys[65]&&keys[18]){
        document.querySelector(".init").style.display = "none";
        document.querySelector(".a00").style.display = "flex";
        gamer.push({key: 'k', charater: 'alpaca', nickname: '알파카'})
        gamer.push({key: 'q', charater: 'penguin', nickname: '펭귄'})
        init()
        gamers()
    }else if(keys[16]&&keys[18]){
        yourWin(0);
    }
}

// 판 초기화
function init(){
    document.querySelector(".omokPan").innerHTML="";
    pan =[];
    for (let i =0;i<xnum;i++){
        pan.push([]);
        let omokRow = document.createElement('div');
        omokRow.classList.add("omokRow");
        
        for (let j =0;j<ynum;j++){
            pan[i].push(0);
            let omok = document.createElement('div');
            omok.classList.add('omok');
            // omok.innerText = i+":"+j;
            omok.id = i+"-"+j+"";
            omok.addEventListener("click",setDoll);
            omokRow.appendChild(omok);
        }
        blindForPan.style.height=(30*(ynum+1)+106)+"px";
        blindForPan.style.width=(30*(xnum+1)+10)+"px";
        resultRightSide.style.width="calc(100vw-"+(30*(xnum+1)+10)+"px)";
        omokPan.style.width=(30*xnum)+"px";
        omokLine.style.width=(30*(1+xnum))+"px";
        omokLine.style.height=(30*(1+ynum))+"px";
        omokPan.appendChild(omokRow);
        // 플레이어 화면구성
        document.querySelector("#g1img").src = `./${gamer[0].charater}.png`;
        document.querySelector("#g2img").src = `./${gamer[1].charater}.png`;
        document.querySelector("#nickname1").innerHTML = gamer[0].nickname;
        document.querySelector("#nickname2").innerHTML = gamer[1].nickname;
        whosTurn = (Math.floor(Math.random()*50))%2;
    }
}

let irr =60;
//순서인 사용자 표시하기
function whosTurnBlink(...args){
    console.log(args.length+" : 길이")
    if(args.length==0){
        console.log("인터벌 시작")
        document.getElementById("room"+(whosTurn+1)).style.backgroundColor = "#F0D8A860"
        irr=60;
        console.log(irr)
        intervalBlink = setInterval(() => {
            if(irr>0){
                document.querySelector(".timerZone").innerHTML = irr+"초";
                irr--;
            }else if(irr==0){
                changeTurn();
                flag=false;
            }
        }, 1000);
    }else{
        console.log("인터벌 종료")
        clearInterval(intervalBlink);
    }
}
// 게임 차례를 바꾸는 function 
function changeTurn(){
    console.log("changeTurn()")
    whosTurnBlink(1);
    document.getElementById("room"+(whosTurn+1)).style.backgroundColor = ""
    if(whosTurn==0)whosTurn=1;
    else if(whosTurn==1)whosTurn=0;
    document.querySelector(".timerZone").innerHTML = gamer[whosTurn].nickname+" 차례";
    console.log("changeTurn()")
    whosTurnBlink();
}

// 클릭하면 돌 놓는 function
function setDoll(evt){
    console.log("setDoll()")
    whosTurnBlink(1);
    const doll = evt.target;
    const dollId = doll.id+"";
    const spiltedId = dollId.split("-");
    const dollx = spiltedId[0];
    const dolly = spiltedId[1];
    // n은 0혹은1
    doll.style.backgroundColor =dollcolor[whosTurn];
    doll.style.backgroundImage=`url(./${gamer[whosTurn].charater}.png)`;
    // 클릭한 돌의 배열에 해당하는 값이 변경되어야함
    pan[dollx][dolly] = gamer[whosTurn].key;
    // console.log("배열값 : "+pan[dollx][dolly])
    doll.removeEventListener("click",setDoll);
    if(!isWin(dollx, dolly)){
        console.log("setDoll()")
        changeTurn();
    };
}


// 승리했는지 확인하는 function
function isWin(idx,idy){
    //우상향 성공 체크
    if((gocheck(idx,idy,-1,-1)+gocheck(idx,idy,1,1))>=4){
        coloredDoll(idx,idy,-1,-1);
        coloredDoll(idx,idy,1,1);
        yourWin(whosTurn);
        return true;
        // 우하향 성공 체크
    }else if((gocheck(idx,idy,-1,1)+gocheck(idx,idy,1,-1))>=4){
        coloredDoll(idx,idy,-1,1);
        coloredDoll(idx,idy,1,-1);
        yourWin(whosTurn);
        return true;
        // 세로 성공 체크
    }else if((gocheck(idx,idy,0,1)+gocheck(idx,idy,0,-1))>=4){
        coloredDoll(idx,idy,0,1);
        coloredDoll(idx,idy,0,-1);
        yourWin(whosTurn);
        return true;
        // 가로 성공 체크
    }else if((gocheck(idx,idy,1,0)+gocheck(idx,idy,-1,0))>=4){
        coloredDoll(idx,idy,1,0);
        coloredDoll(idx,idy,-1,0);
        yourWin(whosTurn);
        return true;
    }
    return false;
}
function gocheck(x,y,xi,yi){
    let count = 0;
    x=x*1;
    y=y*1;
    xi=xi*1;
    yi=yi*1;
    while(count<5){
        x = x+xi;
        y = y+yi;
        if(x>=xnum || y>=ynum || x<0 || y<0) {
            break;
        }else if(pan[x][y]===gamer[whosTurn].key){
            // console.log(`pan[${x}][${y}]=>>>${pan[x][y]}=>>${count}<<<<<<<<<<`)
            count+=1;
        }else{
            // console.log(`x축 : ${xi} , y축 : ${yi} , count: ${count}`);
            return count;
        }
    }
    // console.log(`x축 : ${xi} , y축 : ${yi} , count: ${count}`);
    return count;
}
// 성공한 라인에 반짝임 효과
function coloredDoll(idx,idy,xi,yi){
    // console.log(document.getElementById(idx+"-"+idy));
    idx=idx*1;
    idy=idy*1;
    xi=xi*1;
    yi=yi*1;
    document.getElementById(idx+"-"+idy).style.border='2px solid orange'
    while(true){
        idx = idx+xi;
        idy = idy+yi;
        if(idx>=xnum || idy>=ynum || idx<0 || idy<0) {
            break;
        }else if((pan[idx][idy]) == (gamer[whosTurn].key)){
            document.getElementById(idx+"-"+idy).style.border='1px solid orange';
        }else{
        }
    }
    return;
}
// 승리한 경우 팝업을 띄움
function yourWin(winner){
    console.log("yourWin()")
    whosTurnBlink(1);
    let winnerScore = document.getElementById(whosTurn+"score").innerHTML*1;
    document.getElementById(whosTurn+"score").innerHTML = winnerScore+1;
    
    resultPop.style.display="flex";
    resultPop.querySelector(".winnerCharacterImg").src = "./"+gamer[winner].charater+".png"
    resultPop.querySelector(".whosWin").innerHTML=`<strong>${gamer[winner].nickname}<strong>`;
    console.log("winner is "+winner);
    document.getElementById("room1").style.backgroundColor="";
    document.getElementById("room2").style.backgroundColor=""
}
document.querySelector("#btnAgain").addEventListener("click",init);

function bothwin(whosTurn){
    console.log("bothWin()")
    whosTurnBlink(1);
    init();
}
function hangbok(){
    whosTurnBlink(1);
    if(whosTurn==0){
        whosTurn=1;
        yourWin(1);
    }else if(whosTurn==1){
        whosTurn=0;
        yourWin(0);
    }
}
function gameAgain(){
    console.log("누구방이 늘어나냐 : "+whosTurn)
    init();
    whosTurn = (Math.floor(Math.random()*50))%2;
    resultPop.style.display = "none";
    gamers();
}
