import "./App.css";
import DiaryEdtior from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments").then((res) => {
      return res.json();
    });

    const initData = res.slice(0, 20).map((obj) => {
      return {
        author: obj.email,
        content: obj.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData((data) => [newItem, ...data]);
  }, []);

  const onRemove = useCallback((targetId) => {
    setData((data) => data.filter((obj) => obj.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    setData((data) => data.map((obj) => (obj.id === targetId ? { ...obj, content: newContent } : obj)));
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((obj) => obj.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = Math.floor((goodCount / data.length) * 100);
    return { goodCount, badCount, goodRatio };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEdtior onCreate={onCreate} />
      <div>전체 게시글 수 : {data.length}</div>
      <div>기분 좋은 게시글 수 : {goodCount}</div>
      <div>기분 나쁜 게시글 수: {badCount}</div>
      <div>기분 좋은 게시글 비율 : {goodRatio}</div>
      <DiaryList onRemove={onRemove} onEdit={onEdit} diaryList={data} />
    </div>
  );
}

export default App;
