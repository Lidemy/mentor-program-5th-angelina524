import { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 645px;
  margin: 0 auto;
  height: 1085px;
  background: white;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  border-top: 8px solid #fad312;
  margin-top: 121px;
  padding: 42px;
  box-sizing: border-box;
`

const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 24px;
`

const Paragraph = styled.div`
  font-size: 14px;
  margin-top: 10px;
`

const Remind = styled.div`
  margin: 2px 0 15px;
`

const Notice = styled.div`
  color: #e74149;
  margin-top: 22px;
`

const InputTitle = styled.div`
  font-size: 20px;
  margin: 20px 0 15px;
`

const Input = styled.input`
  height: 23px;
  width: 287px;
  border: 1px solid #d0d0d0;
`

const InputError = styled.div`
  font-size: 14px;
  color: red;
  margin-bottom: 20px;

  ${props => props.error || `visibility: hidden`}
`

const InputOther = styled(InputTitle)`
  margin: 40px 0 0;
`

const Span = styled.span`
  font-size: 20px;
  color: #e74149;
  margin-left: 6px;
`

const Option = styled.div`
  margin-top: 14px;
`

const InputSubmit = styled.button`
  border: none;
  margin-top: 40px;
  display: inline - block;
  background: #fad312;
  font-size: 15px;
  border-radius: 3px;
  padding: 12px 32px;
  cursor: pointer;
`

const Footer = styled.footer`
  color: #999999;
  background: #000000;
  font-size: 13px;
  margin-top: 66px;
  text-align: center;
  padding: 26px 0 21px;
`

const Form = () => {
  const [data, setData] = useState({
    nickname: '',
    email: '',
    phone: '',
    type: '',
    way: '',
    advice: ''
  })

  const [hasError, setHasError] = useState({
    nickname: null,
    email: null,
    phone: null,
    type: null,
    way: null
  })

  const [isValid, setIsValid] = useState(false)

  function handleInputChange(e) {
    const value = e.target.value
    const name = e.target.name

    setData({
      ...data,
      [name]: value
    })

    setHasError({
      ...hasError,
      [name]: false
    })

    if (value === '') {
      setHasError({
        ...hasError,
        [name]: true
      })
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { nickname, email, phone, type, way, advice } = data

    for (let name in data) {
      if (data[name] === '') {
        setHasError(prev => {
          return {
            ...prev,
            [name]: true
          }
        })
        setIsValid(false)
      }
    }

    if (nickname !== '' &&
      email !== '' &&
      phone !== '' &&
      type !== '' &&
      way !== ''
    ) {
      setIsValid(true)
    }

    if (isValid) {
      alert(`
      您的報名資訊如下
      暱稱：${nickname}
      電子郵件：${email}
      手機號碼：${phone}
      報名類型：${type}
      怎麼知道這個活動的：${way}
      其他建議：${advice === '' ? '無' : advice}
    `)
      setData({
        nickname: '',
        email: '',
        phone: '',
        type: '',
        way: '',
        advice: ''
      })
      setIsValid(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Wrapper>
          <Title>新拖延運動報名表單</Title>
          <Paragraph>活動日期：2020/12/10 ~ 2020/12/11</Paragraph>
          <Paragraph>活動地點：台北市大安區新生南路二段1號</Paragraph>
          <Notice>* 必填</Notice>
          <div>
            <InputTitle>暱稱<Span>*</Span></InputTitle>
            <Input value={data.nickname} onChange={handleInputChange} type="text" name="nickname" placeholder="您的回答" />
            <InputError error={hasError.nickname}>請輸入您的暱稱</InputError>

            <InputTitle>電子郵件<Span>*</Span></InputTitle>
            <Input value={data.email} onChange={handleInputChange} type="email" name="email" placeholder="您的電子郵件" />
            <InputError error={hasError.email}>請輸入您的電子郵件</InputError>

            <InputTitle>手機號碼<Span>*</Span></InputTitle>
            <Input value={data.phone} onChange={handleInputChange} type="text" name="phone" placeholder="您的手機號碼" pattern="^09\d{8}$" />
            <InputError error={hasError.phone}>請輸入您的手機號碼</InputError>

            <InputTitle>報名類型<Span>*</Span></InputTitle>
            <Option><label><input checked={data.type === 'imagination'} onChange={handleInputChange} type="radio" name="type" value="imagination" />躺在床上用想像力實作</label></Option>
            <Option><label><input checked={data.type === 'ready-made'} onChange={handleInputChange} type="radio" name="type" value="ready-made" />趴在地上滑手機找現成的</label></Option>
            <InputError error={hasError.type}>請點選您的報名類型</InputError>

            <InputTitle>怎麼知道這個活動的？<Span>*</Span></InputTitle>
            <Input value={data.way} onChange={handleInputChange} type="text" name="way" placeholder="您的回答" />
            <InputError error={hasError.way}>請輸入您的回答</InputError>

            <InputOther>其他</InputOther>
            <Remind>對活動的一些建議</Remind>
            <Input value={data.advice} onChange={handleInputChange} type="text" name="advice" placeholder="您的回答" />
          </div>

          <InputSubmit type="submit">提交</InputSubmit>

          <Paragraph>請勿透過表單送出您的密碼。</Paragraph>
        </Wrapper>
      </form>
      <Footer>© 2020 © Copyright. All rights Reserved.</Footer>
    </>
  )
}

export default Form;


