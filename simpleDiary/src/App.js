import "./App.css";
import DiaryEdtior from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "kihoon1",
    content: "안녕1",
    emotion: 1,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "kihoon2",
    content: "안녕2",
    emotion: 2,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "kihoon3",
    content: "안녕3",
    emotion: 3,
    created_date: new Date().getTime(),
  },
  {
    id: 4,
    author: "kihoon4",
    content: "안녕4",
    emotion: 4,
    created_date: new Date().getTime(),
  },
  {
    id: 5,
    author: "kihoon5",
    content: "안녕5",
    emotion: 5,
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEdtior />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
