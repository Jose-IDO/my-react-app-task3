import { Text } from '../Text/Text'
import styles from './NotFound.module.css'
import { Whitebox } from '../Whitebox/Whitebox'
import { Buttons } from '../button/Button'
import { useNavigate } from 'react-router-dom' 

export const NotFoundComponent = () => {
  const navigate = useNavigate(); 

  return (
    <div style={{ paddingTop: '120px', minHeight: '60vh', display: 'flex', alignItems: 'center' }}> 
      <Whitebox modcolor='modcolorone'>
        <div className={styles['not-found-cont']}>
          <Text variant={'h1'} style={{ fontSize: '32px', marginBottom: '10px' }}>404 - Page not found</Text>
          <Text variant={'p'} style={{ fontSize: '18px', marginBottom: '30px' }}>The page you're looking for doesn't exist.</Text>
          <Buttons onClick={() => navigate('/')}>
            Go Home
          </Buttons>
        </div>
      </Whitebox>
    </div>
  )
}