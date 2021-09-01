import styled from 'styled-components'
import TodoItem from './Item'

const ListWrapper = styled.div`
  padding: 0px 20px 20px;
`

const FilterButton = styled.button`
  width: 100%;
  max-width: 70px;
  padding: 8px 0;
  margin-right: 10px;
  background: #EFB7B7;
  border: none;
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
  cursor: pointer;
`

const DeleteALLButton = styled(FilterButton)`
  max-width: 85px;
`

const List = ({ listData, deleteAllData, changeData, deleteData, filterData, setFilterData }) => {

  const handleDeleteALLClick = () => {
    deleteAllData(() => {
      return []
    })
  }

  return (
    <ListWrapper>
      <FilterButton onClick={() => { setFilterData(null) }}>All</FilterButton>
      <FilterButton onClick={() => { setFilterData(true) }}>Active</FilterButton>
      <FilterButton onClick={() => { setFilterData(false) }}>Done</FilterButton>
      <DeleteALLButton onClick={handleDeleteALLClick} >Delete All</DeleteALLButton>
      {
        listData.filter(item => {
          return item.checked !== filterData
        }).map(item => {
          const { id, value, checked } = item
          return <TodoItem key={id} id={id} value={value} checked={checked} changeData={changeData} deleteData={deleteData} />
        })
      }
    </ListWrapper>
  )
}

export default List