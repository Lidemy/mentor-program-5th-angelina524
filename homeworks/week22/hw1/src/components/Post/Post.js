import React from "react"
import { Link } from "react-router-dom";
import styled from 'styled-components'

const PostContainer = styled.div`
  width: 100%;
  margin: 15px;
  padding: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const PostTitle = styled.div`
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
`

const PostInfo = styled.div`
  margin: 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ReadBtn = styled(Link)`
  padding: 8px 15px;
  border-radius: 20px;
  margin-right: 10px;
  color: #393E46;
  border: 1px solid #393E46;
  transition: .25s;
  text-decoration: none;

  &:hover {
    color: white;
    background: #393E46;
  }
`

const PostAuthor = styled.div`
  text-align: right;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
`

const PostDate = styled(PostAuthor)``


const Post = ({ post }) => {
  const { id, title, createdAt, user } = post

  return (
    <PostContainer>
      <PostTitle>{title}</PostTitle>
      <PostInfo>
        <ReadBtn to={`/post/${id}`}>Read</ReadBtn>
        <div>
          <PostAuthor>{user.nickname}</PostAuthor>
          <PostDate>{new Date(createdAt).toLocaleDateString()}</PostDate>
        </div>
      </PostInfo>
    </PostContainer>
  )
}

export default Post
