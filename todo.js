const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"), //input 받은 데이터 받아옴
    toDoList = document.querySelector(".js-toDoList"); //리스트 받아옴

const TODOS_LS = "toDos";

let toDos = [];

//리스트 삭제
function deleteToDo(event) {
    const btn = event.target; //이벤트의 모든 정보
    const li = btn.parentNode; //부모노드 정보
    toDoList.removeChild(li); //toDoList에서 li에 해당하는 요소 삭제

    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id); //paserInt: int형으로 변환
    });

    toDos = cleanToDos; //업데이트 된 내용을 toDo에 덮어씀
    saveToDos();
}

//리스트 저장
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

//리스트 화면에 출력
function paintToDo(text) {
    const li = document.createElement("li"); //li 요소 생성
    const delBtn = document.createElement("button"); //button 요소 생성
    const span = document.createElement("span"); //span 요소 생성
    const newId = toDos.length + 1; //id길이 1 늘려서 지정

    delBtn.innerText = "❌"; //button 내용
    delBtn.addEventListener("click", deleteToDo); //button 클릭시 deleteToDo 실행
    span.innerText = text; //입력받은 값 span 내용으로 넣음

    li.appendChild(delBtn); //해당 노드의 자식 노드 리스트의 맨 마지막에 추가
    li.appendChild(span); //해당 노드의 자식 노드 리스트의 맨 마지막에 추가
    li.id = newId; //새 데이터의 id

    toDoList.appendChild(li); //li를 toDoList의 자식노드로 추가

    //toDo 데이터
    const toDoObj = {
      text: text,
      id: newId
    };

    //배열에 toDo 데이터 삽입
    toDos.push(toDoObj);
    saveToDos();
}

//이벤트 발생한 경우
function handleSubmit(event) {
    event.preventDefault(); //현재 이벤트의 기본동작 중단
    const currentValue = toDoInput.value; //input value 받아옴
    paintToDo(currentValue); //화면에 출력
    toDoInput.value = ""; //input value 초기화
}

//toDo 데이터 로드
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS); //LocalStorage에서 데이터 받아옴
    if (loadedToDos !== null) {
        //등록된 toDo 있는 경우
        const parsedToDos = JSON.parse(loadedToDos); //해당 데이터를 js 객체로 변환하여 받아옴
        parsedToDos.forEach(function(toDo) {
            //forEach를 사용하여 하나씩 실행
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();