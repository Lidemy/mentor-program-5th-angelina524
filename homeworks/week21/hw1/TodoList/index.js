import AddTodoForm from './components/AddTodoForm'
import List from './components/List'
import styled from 'styled-components'
import { useState } from 'react'

const TodoListWrapper = styled.div`
  margin: 100px auto;
  width: 100%;
  max-width: 600px;
`

const Title = styled.div`
  font-size: 36px;
  text-align: center;
  font-weight: bold;
  color: #BD4B4B;
`

const TodoList = () => {

  const [data, setDate] = useState([])

  const [filterData, setFilterData] = useState()

  return (
    < TodoListWrapper >
      <Title>TodoList</Title>
      <AddTodoForm add={setDate} />
      <List listData={data} deleteAllData={setDate} changeData={setDate} deleteData={setDate} filterData={filterData} setFilterData={setFilterData} />
    </TodoListWrapper >
  )
}

export default TodoList