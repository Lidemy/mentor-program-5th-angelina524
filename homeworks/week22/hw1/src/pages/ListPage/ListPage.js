import React, { useState, useEffect, useContext } from "react"
import styled from 'styled-components'
import { getPosts, getTotalPosts } from '../../WebAPI'
import Post from '../../components/Post'
import { LoadingContext } from '../../contexts';

const ListPageContainer = styled.div`
  position: relative;
  top: 60px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  margin-top: 100px;
  position:relative;
  bottom: 0;
`

const PrePageBtn = styled.div`
  border: solid #393E46;
  border-width: 0px 5px 5px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(135deg);
  cursor: pointer;
`

const NextPageBtn = styled.div`
  border: solid #393E46;
  border-width: 0px 5px 5px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(-45deg);
  cursor: pointer;
`

const CurrentPage = styled.div`
  margin: 0 30px;
  background: #393E46;
  color: #EEEEEE;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
`

const ListPage = () => {
  const { setIsLoading } = useContext(LoadingContext)
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const postLimit = 5

  useEffect(() => {
    const getPostPagePosts = async () => {
      setIsLoading(true)
      const data = await getPosts(postLimit, currentPage)
      setPosts(data)

      const totalPosts = await getTotalPosts()
      setTotalPage(Math.ceil((totalPosts.length - 1) / 5))
      setIsLoading(false)
    }

    getPostPagePosts()
  }, [setIsLoading, currentPage, totalPage])

  const handlePrePageClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPageClick = () => {
    if (currentPage <= totalPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <>
      <ListPageContainer>
        {posts.map(post => <Post key={post.id} post={post} />)}
      </ListPageContainer>
      <Pagination>
        <PrePageBtn onClick={handlePrePageClick} />
        <CurrentPage>{currentPage}</CurrentPage>
        <NextPageBtn onClick={handleNextPageClick} />
      </Pagination>
    </>
  )
}

export default ListPage
