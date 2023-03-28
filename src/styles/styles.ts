import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: scroll;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.gray_300};
  backdrop-filter: blur(2px);
`

export const Form = styled.form`
  min-width: 500px;
  margin: auto 20px;
  padding: 20px 56px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;

  background-color: ${({ theme }) => theme.COLORS.whitesh};
  border-radius: 30px;

  @media screen and (max-width: 500px) {
    padding: 20px 10px;
  }
`
