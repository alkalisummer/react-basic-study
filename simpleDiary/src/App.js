import "./App.css";
import DiaryEdtior from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useState, useRef } from "react";

// const dummyList = [
//   {
//     id: 1,
//     author: "kihoon1",
//     content: "안녕1",
//     emotion: 1,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: "kihoon2",
//     content: "안녕2",
//     emotion: 2,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: "kihoon3",
//     content: "안녕3",
//     emotion: 3,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 4,
//     author: "kihoon4",
//     content: "안녕4",
//     emotion: 4,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 5,
//     author: "kihoon5",
//     content: "안녕5",
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
// ];

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onDelete = (targetId) => {
    const newDiaryList = data.filter((obj) => obj.id !== targetId);
    setData(newDiaryList);
  };

  return (
    <div className="App">
      <DiaryEdtior onCreate={onCreate} />
      <DiaryList onDelete={onDelete} diaryList={data} />
    </div>
  );
}

export default App;
