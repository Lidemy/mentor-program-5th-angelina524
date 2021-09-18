import React, { useState, useEffect, useContext } from "react"
import { Link, useParams, useHistory } from "react-router-dom";
import styled from 'styled-components'
import { getPost, deletePost } from '../../WebAPI'
import { AuthContext, LoadingContext } from '../../contexts'

const SinglePostPageContainer = styled.div`
  position: relative;
  top: 60px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  box-sizing: border-box;
  margin: 20px auto;
`

const PostTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  word-break: break-all;
  padding: 20px 0;
`

const PostBody = styled.div`
  padding: 20px 0;
  word-break: break-all;
`

const PostInfo = styled.div`
  margin: 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const PostAuthor = styled.div`
  text-align: right;
  word-break: break-all;
`

const PostDate = styled(PostAuthor)``


const DeleteBtn = styled.div`
  padding: 8px 15px;
  border-radius: 20px;
  margin: 0 10px;
  color: #393E46;
  border: 1px solid #393E46;
  transition: .25s;
  cursor: pointer;

  &:hover {
    color: white;
    background: #393E46;
  }
`

const BackList = styled(Link)`
  padding: 8px 15px;
  border-radius: 20px;
  margin: 0 10px;
  color: #393E46;
  border: 1px solid #393E46;
  transition: .25s;
  text-decoration: none;

  &:hover {
    color: white;
    background: #393E46;
  }
`

const SinglePostPage = () => {
  const { id } = useParams()
  const { setIsLoading } = useContext(LoadingContext)
  const { user } = useContext(AuthContext)
  const [post, setPost] = useState([])
  const [author, setAuthor] = useState()
  const history = useHistory()

  useEffect(() => {
    const getSinglePost = async () => {
      setIsLoading(true)
      const data = await getPost(id)
      setPost(data)
      setAuthor(data.user)
      setIsLoading(false)
    }

    getSinglePost()
  }, [setIsLoading, id])

  const handleDeleteClick = () => {
    deletePost(id).then(() => {
      history.push('/list')
    })
  }

  return (
    <SinglePostPageContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostBody>{post.body}</PostBody>
      <PostInfo>
        {(user && author && user.username === author.username) ? (
          <DeleteBtn onClick={handleDeleteClick}>Delete</DeleteBtn>)
          : (<BackList to='/list'>BackList</BackList>)
        }
        <div>
          <PostAuthor>{author && author.nickname}</PostAuthor>
          <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
        </div>
      </PostInfo>
    </SinglePostPageContainer>
  )
}

export default SinglePostPage
