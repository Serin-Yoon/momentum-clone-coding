const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

//LocalStorage에 데이터 저장
function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

//엔터 눌렀을 때 발생하는 이벤트
function handleSubmit(event) {
    event.preventDefault(); //이벤트의 기본 동작 중단
    const currentValue = input.value; //input의 value 가져옴
    paintGreeting(currentValue); //그 값을 화면에 출력
    saveName(currentValue); //그 값을 LocalStorage에 저장
}

//이름 입력폼
function askForName() {
    form.classList.add(SHOWING_CN); //입력폼 보이도록 함
    form.addEventListener("submit", handleSubmit); //엔터 눌렀을 때 이벤트 발생
}

//이름 화면에 출력
function paintGreeting(text) {
    form.classList.remove(SHOWING_CN); //입력폼 없앰
    greeting.classList.add(SHOWING_CN); //이름 출력
    greeting.innerText = `Hello, ${text}!`; //내용
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS); //LocalStorage에 유저 등록되었는지 확인
    if (currentUser === null) {
        askForName(); //등록 안 된 경우 이름 물음
    } else {
        paintGreeting(currentUser); //등록 된 경우 이름 출력
    }
}

function init() {
    loadName();
}

init();