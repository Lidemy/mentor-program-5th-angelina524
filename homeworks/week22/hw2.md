## 請列出 React 內建的所有 hook，並大概講解功能是什麼
### 1. useState
- 回傳一個 state 的值，以及更新 state 的 function
- `const [data, setData] = useState(initial value)`
    - data ⇒ state
    - setData ⇒ function to change this state
    - initial value ⇒ initial value for this state
- class components vs function components
    - initialization：`state = { data: 0 }` ⇒ `useState(0)`
    - reference：`this.state.data` ⇒ `data`
    - update： `this.setState = ({ data: 100 })` ⇒ `setData(100)`

### 2. useEffect
- 會在 render 後執行，讓 function components 使用很像 lifecycle 的方式，依照第二個參數分成三種：
    1. 當 component 第一次 render 要做的事情
        `useEffect(function, [])` => run at initial render
    2. 當 component 第一次 render 以及每次 re-render 要做的事情
        `useEffect(function)` => run at initial render + run after every re-render
    3. 當 component 第一次 render 以及當 data 改變時 re-render 要做的事情
        `useEffect(function, [data])` => run at initial render + run after every re-render if data has changed since last render
- cleanup function 用於清除 effect
    - useEffect function ⇒ can return a cleanup function
    - 第一次 render 後 ⇒ call useEffect ⇒ return a cleanup function
    - 當 re-render 後 ⇒ 呼叫 clean up function ⇒  call useEffect ⇒ return a cleanup function

```jsx
useEffect(() => {
  const timeoutId = setTimeout(() => {
    do something...
  }, 500)

  // cleanup function
  return () => {
    clearTimeout(timeoutId)
  }
}, [data])
```

### 3. useContext
- 取代 props 需要一層一層傳遞的機制，透過最頂層或上層 Context.Provider 傳遞 value，可在下面任一層接收使用
    1. 運用 createContext() 建立 context 物件，物件中包含 Provider 傳遞、Consumer 接收
    2. 先將 value 傳遞給 `<Context.Provider value={}>` ，Provider 會再傳遞給下面的子元件
    3. 子元件用 useContext 接收，並取決於距離最近的上層 Provider 的 value

```jsx
// create
const myContext = React.createContext()

const [data, setData] = useState(true)

// 傳入
<myContext.Provider value={data}>
  <Component />
</myContext.Provider>

// Component 可以接收使用
```

### 4. useRef
- 使用 useRef 更新時，不會觸發 re-render，簡單來說，與畫面無關的時候可以用
- 可以知道 re-render 之前的 state
- 可以抓到 DOM 元素改變

```jsx
const inputRef = useRef(null)

const handleFocusInput = () => {
  inputRef.current.focus()
  inputRef.current.style.backgroundColor = "red"
}

const handleFocusInput = () => {
  inputRef.current.style.backgroundColor = "blue"
  inputRef.current.blur()
}

<div onClick={handleFocusInput}>Change Red</div>
<input ref={inputRef} />
<div onClick={handleBlurInput}>Change Blue</div>
```

### 5. userReducer
- 當 useState 變的複雜，需要同時操作或管理多個 State 時，就可以使用
- `const [state, dispatch] = useReducer(reducer, initState, init)`
    1. state：reducer state，儲存資料
    2. action：action dispatch function，發生什麼事情
    3. reducer：reducer function，計算下一個 state
    4. initState：state 的初始值

```jsx
// reducer
function reducer(state, action) {
  switch(action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1}
      case ACTIONS.DECREMENT:
      return { count: state.count - 1}
    default:
      return state
  }
}

// useReducer
const [state, dispatch] = useReducer(reducer, {count: 0})

// dispatch
const increase = () => { dispatch({type: ACTIONS.INCREMENT }) };
const decrease = () => { dispatch({type: ACTIONS.DECREMENT }) };

// 事件
<button onClick={decrease} />
<span>{state.count}</span>
<button onClick={increase} />
```

### 6. useMemo
- useMemo 可避免每次 re-render 都要重複計算，並用於記住 function 的回傳值，當依賴改變時，才會重新計算
- `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])`
    - 第一個傳 function
    - 第二個傳依賴陣列，與 useEffect 的依賴陣列相同，有變動才 re-render
- 而 Memo 也是避免每次 re-render 都要重複計算，用來是包住 component

### 7. useCallback
- useMemo 是記住值，而 useCallback 是記住整個 function
- `const memoizedCallback = useCallback(() => { doSomething(a, b) }, [a, b])`

### 8. useImperativeHandle
- 可以在父元件取到子元件的 ref，子元件用 forwardRef 及 useImperativeHandle 來自定 ref，父元件可以用同樣的方式取到子元件
- `useImperativeHandle(ref, createHandle, [deps])`
    - createHandle：做什麼事情

```jsx
// 子元件定義
function MyInput(props, ref) {
  const [val, setVal] = React.useState('')
  const inputRef = React.useRef()

  React.useImperativeHandle(ref, () => ({
    blur: () => {
      document.title = val;
      inputRef.current.blur();
    }
  }));

  return (
    <input
      ref={inputRef}
      val={val}
      onChange={e => setVal(e.target.value)}
      {...props}
    />
  )
}

// 用 forwardRef 拿到 ref object
export default forwardRef(MyInput)
```

```jsx
// 父元件取用
const App = () => {
  const inputRef = React.useRef(null);
  const onBlur = () => {
    console.log(ref.current); // Only contains one property!
    ref.current.blur();
  };

  return <MyInput ref={ref} onBlur={onBlur} />;
};
```

### 9. useLayoutEffect
- 與 useEffect 用法相同，只差在 useEffect 會在 render 之後執行，而 useLayoutEffect 會在 render 之前執行

### 10. useDebugValue
- 在 React DevTools 中顯示自訂義 hook 的標籤
- `useDebugValue(value)`

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點
### 開頭
- will：事件發生之前，會做的事情
- did：事件發生之後，會做的事情

### 第一類：Mount
- `render()`：當 props 或是 state 被改變時，都會被執行一次
- `constructor(props)`：是 class 中的建構子，在元件還沒加到 DOM 之前先被執行，用來進行初始化，並指定初始值給 this.state

```jsx
constructor(props) {
  super(props);
  this.state = {
    value: props.initialvalue
  };
}
```

- `static getDerivedStateFromProps(props, state)`：在每次 render 前被呼叫，傳入目前的 props 和 state，返回一個 object，已表示是否要更新
- `componentWillMount()`：當元件加到實際的 HTML DOM 之前被呼叫執行，只執行一次，不能做與 DOM 有關的事情
- `componentDidMount()`：當元件加到實際的 HTML DOM 之後被呼叫執行，用於操作 DOM 或更新 state 等等

### 第二類：Update
- `componentWillReceiveProps(nextProps)`：當元件接收到 props 更新時被執行，會傳入即將更新的 props 值，用來比對 this.props 與 nextProps 的變化
- `shouldComponentUpdate(nextProps, nextState)`：當 props 或 state 更新時，並在 render() 之前，更精確判斷元件是否真的需要更新，會傳入nextProps 及 nextState，用來比對 this.props 和 this.State
- `componentWillUpdate(nextProps, nextState)`：當元件準備更新，並且執行 render() 之前被執行，從 React 17 開始被拿掉
- `getSnapshotBeforeUpdate(prevProps, prevState)`：在畫面 rendered 之前被呼叫執行，被執行後 return 的值會被傳進 componentDidUpdate 的第三個參數，可以用來記錄畫面準備修改前的狀態
- `componentDidUpdate(prevProps, prevState, snapshot)`：元件更新後、執行完 render() 重繪後被呼叫執行，每次元件更新時，只會被執行一次，可以比對 props 及 state 差異、存取 DOM 等等

### 第三類：Unmount
- `componentWillUnmount()`：當元件將要從 DOM 中被移除之前會被呼叫執行，可用於清理資源

### 其他：`componentDidCatch(error, info)`：用來捕捉子元件拋出的錯誤

## 請問 class component 與 function component 的差別是什麼？
### Class component
- 需繼承 React.Component
- 擁有生命週期，針對細節的情況去做渲染及判斷
- 具有state (Stateful component)
- 要實作 render 的方法
- 具有 this，並透過 this.props 去取到最新的值

### Functional component
- 沒有生命週期，可以用 React Hook useEffect 去完成類似生命週期的做法
- 沒有state（Stateless），可以用 React Hook useState
- 可以使用 arrow function
- 沒有 this，而 props 會原本是傳進的，不會更新
- 編譯速度比 class 更快

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
- React form 中分為 uncontrolled component 以及 controlled component，雖然兩個能達到一樣的事情，但需要對資料有更多的控制或提示畫面的處理時，controlled component 會更容易很多

### uncontrolled component
- 資料不受到 React 控制，取到該表單的 DOM 元素，再從元素中取值
- 可以搭配 React Hook useRef
    - ref.current 取得 input 元素
    - ref.current.value 取得值

### controlled component
- 資料受到 React 控制，當使用者輸入資料時，React 會 re-render，將資料顯示在畫面上

```jsx
const [data, setData] = useState()

<input value={data} onChange={e => setData(e.target.value)} />
```

### 參考資料
- [官方文件](https://zh-hant.reactjs.org/docs/hooks-reference.html#usecontext)
- [[React Hook 筆記] useContext](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-usecontext-4bc289976847)
- [[React Hook 筆記] Memorized Hook- useMemo, useCallback](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-memorized-hook-usememo-usecallback-e08a5e1bc9a2)
- [[React Hook 筆記] useReducer 真的能完全取代 Redux 嗎?](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-usereducer-%E7%9C%9F%E7%9A%84%E8%83%BD%E5%AE%8C%E5%85%A8%E5%8F%96%E4%BB%A3-redux-%E5%97%8E-fabcc1e9b400)
- [React Hooks | 既生 useState 何生 useReducer ?](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-hooks-usestate-vs-usereducer-b14966ad37dd)
- [When to use useImperativeHandle - Stack Overflow](https://stackoverflow.com/questions/57005663/when-to-use-useimperativehandle-uselayouteffect-and-usedebugvalue)
- [React Hooks 筆記](https://medium.com/@scars.yao/react-hooks-%E7%AD%86%E8%A8%98-9f9d99c0b72e#95cc)
- [React 元件生命週期 (Component Lifecycle)](https://www.fooish.com/reactjs/component-lifecycle.html)
- [React Functional Component 與Class Component的差異](https://medium.com/coding-hot-pot/react-functional-component-v-s-class-component-e46c6dc5a319)
- [[Day 27 - 即時天氣] React 中的表單處理（Controlled vs Uncontrolled）以及 useRef 的使用](https://ithelp.ithome.com.tw/articles/10227866)