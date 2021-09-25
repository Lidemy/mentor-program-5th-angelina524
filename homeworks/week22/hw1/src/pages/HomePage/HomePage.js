import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { getPosts } from '../../WebAPI'
import Post from '../../components/Post'
import { LoadingContext } from '../../contexts';

const HomePageContainer = styled.div`
  position: relative;
  top: 70px;
`

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BannerContent = styled.div`
  padding: 110px 0 70px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
`

const BannerBtn = styled(Link)`
  width: 100px;
  background: #393E46;
  margin-bottom: 70px;
  padding: 10px 20px;
  border-radius: 30px;
  color: #EEEEEE;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
`

const PostsContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 900px;
  height: 250px;
  display: flex;
`

const HomePage = () => {
  const { setIsLoading } = useContext(LoadingContext)
  const [posts, setPosts] = useState([])
  const postLimit = 3

  useEffect(() => {
    const getHomePagePosts = async () => {
      setIsLoading(true)
      const data = await getPosts(postLimit)
      setPosts(data)
      setIsLoading(false)
    }

    getHomePagePosts()
  }, [setIsLoading])

  return (
    <HomePageContainer>
      <Banner>
        <BannerContent>The Best Place To Write</BannerContent>
        <BannerBtn to="/register">Join us</BannerBtn>
      </Banner>
      <PostsContainer>
        {posts.map(post => <Post key={post.id} post={post} />)}
      </PostsContainer>
    </HomePageContainer>
  )
}

export default HomePage
