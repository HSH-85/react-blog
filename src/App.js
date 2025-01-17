// eslint-disable
import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import Modal from "./Modal";

function App() {
  // State 정의 시작
  let post = "첫 블로그 글";

   // Modal 출력용 state
   let [currentIndex, setCurrentIndex] = useState(0);

  // 타이틀 스테이트 생성
  let [title, setTitle] = useState([
    "인천 우동 맛집",
    "남자 코트 추천",
    "자바독학",
  ]);
  // 생성일 스테이트
  let [createDate, setCreateDate] = useState([
    "2025년 1월 17일",
    "2025년 1월 18일",
    "2025년 1월 19일",
  ]);
  // 상세내용
  let [content, setContent] = useState([
    "인천 우동 겁나 맛있음.",
    "남자 바바리 코트 명품",
    "자바 독학 가능함",
  ]);
  let [showModal, setShowModal] = useState(false);
  // State 정의 종료

  // 좋아요 값 증가용 state
  let [like, setLike] = useState([0, 0, 0]);
 

  function addLike(num) {
    // 1.좋아요 배열을 복사
    let copyLike = [...like];
    // 2. 사본에 해당 위치 +1
    copyLike[num]++;
    // 3. setLike 함수로 수정
    setLike([...copyLike]);
  }
  function changeTitle() {
    let copyTitle = [...title];
    // 현재 title 값을 비교

    if (copyTitle[1] == "남자 코트 추천") {
      //타이틀 바꾸기
      copyTitle[1] = "여자 코트 추천";
    } else {
      copyTitle[1] = "남자 코트 추천";
    }
    setTitle([...copyTitle]);
    // 좋아요 0으로 바꾸기
    let copyLike = [...like];
    copyLike[1] = 0;
    setLike([...copyLike]);
  }

  // 제목을 내림차순 출력하는 함수
  function descendingTitle() {
    let temp = [...title];
    temp.sort((x, y) => {
      if (x > y) return -1;
      if (x < y) return 1;
      else return 0;
    });
    setTitle([...temp]);
  }

  return (
    <div className="App">
      <div className="black-bg">React로 만드는 블로그</div>
      <div>
        <button
          onClick={() => {
            let temp = [...title];
            temp.sort();
            setTitle([...temp]);
          }}
        >
          오름차순
        </button>
        <button onClick={descendingTitle}>내림차순</button>
      </div>

      {/* {title.map(function (x, i) {
        return (
          <div>
            <div>
              {x}
              {like[i]}
            </div>

            <div>작성일 : {createDate[i]}</div>
            <br></br>
          </div>
        );
      })} */}

      {title.map((x, index) => {
        return (
          <div className="list">
            <h4
              onClick={() => {
                // 현재 선택한 인덱스를 state에 저장
                setCurrentIndex(index);
                if (currentIndex != index){
                  setShowModal(true);
                } else if(currentIndex == index && showModal == false){
                  setShowModal(true);
                }else{
                  setShowModal(false);
                }
              }}
            >
              {title[index]}
              <span onClick={(e) => {
                e.stopPropagation();
                addLike(index)}}>👍</span>
              {like[index]}
            </h4>
            <p>작성일 : {createDate[index]}</p>
          </div>
        );
      })}
      {/* 리스트 시작 */}
      {/* <div className="list">
        <h4 onClick={()=>{
          if(showModal==false){
            setShowModal(true)
          }else{
            setShowModal(false);
          }
          
        }}>
          {title[0]}
          <span onClick={()=>addLike(0)}>👍</span>
          {like[0]}
        </h4>
        <p>작성일 : {createDate[0]}</p>
        </div> */}
      {/* 남자코트 추천 */}
      {/* 버튼을 클릭하면 여자코트 추천으로 변경 ->  */}
      {/* 좋아요 --> 0으로 바꾸기 */}
      {/* <div className="list">
        <h4>
          {title[1]}  
          <span onClick={()=>addLike(1)}>👍</span>
          {like[1]}
          <span>
            <button onClick={changeTitle}>변경</button>
          </span>
        </h4>
        <p>작성일 : {createDate[1]}</p>

      </div>
      <div className="list">

        <h4>
          {title[2]}
          <span onClick={()=>addLike(2)}>👍</span>
          {like[2]}
        </h4>
        <p>작성일 : {createDate[2]}</p>
        </div> */}
      {/* 리스트 종료 */}
      {/* 상세 페이지 시작 */}
      {
        // 리턴 안에는 if 를 못써요....
        // 삼항연산자는 쓸 수 있음.
        // 자식 콤포넌트에 전달할 props를
        // 기술
        showModal == true ? 
          <Modal title={title} 
              createDate={createDate} 
              content={content}
              index={currentIndex} 
              color="yellow"/> 
          : null
      }
      {/* 상세 페이지 종료 */}
    </div>
  );
}


export default App;