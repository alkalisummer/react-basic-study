import "./App.css";
import DiaryEdtior from "./DiaryEditor";
import DiaryList from "./DiaryList";
import React, { useRef, useEffect, useMemo, useCallback, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((obj) => obj.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((obj) => (obj.id === action.targetId ? { ...obj, content: action.newContent } : obj));
    }
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);
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
    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({ type: "CREATE", data: { author, content, emotion, id: dataId.current } });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
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
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEdtior />
          <div className="Analysis">
            <span>전체 게시글 수 : {data.length}</span>
            <span>기분 좋은 게시글 수 : {goodCount}</span>
            <span>기분 나쁜 게시글 수: {badCount}</span>
            <span>기분 좋은 게시글 비율 : {goodRatio}</span>
          </div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;
