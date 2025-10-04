
import AppRouter from './routes/AppRouter'
import { UserProvider } from './context/UserContext'
import { CurrencyProvider } from './context/CurrencyContext'

const App = () => {
  return (
    <UserProvider>
      <CurrencyProvider>
        <AppRouter />
      </CurrencyProvider>
    </UserProvider>
  )
}

export default App
