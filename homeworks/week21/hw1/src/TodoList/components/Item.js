import styled from 'styled-components'

const Todo = styled.div`
margin: 10px 0;
padding: 15px 20px;
display: flex;
justify-content: space-between;
align-items: flex-start;
background: white;
`

const Label = styled.label``

const InputCheckbox = styled.input`
margin-right: 10px;

&:checked + span {
  text-decoration: line-through;
  color: grey;
}
`

const Content = styled.span`
word-break: break-all;
`

const DeleteButton = styled.button`
padding: 5px;
margin-left: 10px;
border: none;
background: #EFB7B7;
color: white;
`

const TodoItem = ({ id, value, checked, changeData, deleteData }) => {

  const handleDeleteClick = () => {
    deleteData(prevData => {
      return prevData.filter(item => {
        return item.id !== id
      })
    })
  }

  const handleCheckboxClick = () => {
    changeData(prevData => {
      return prevData.map(item => {
        if (item.id !== id) return item
        return {
          ...item,
          checked: !checked
        }
      })
    })
  }

  return (
    <Todo key={id}>
      <Label>
        <InputCheckbox defaultChecked={checked} onClick={handleCheckboxClick} type='checkbox' />
        <Content>{value}</Content>
      </Label>
      <DeleteButton onClick={handleDeleteClick}>X</DeleteButton>
    </Todo>
  )
}

export default TodoItem