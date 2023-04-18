import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from "@mantine/core"
import AppShellLayout from "./core/components/AppShell"

import '../src/assets/icons/style.css'

function App() {
  return (
    <div className="App">
      <MantineProvider theme={{
        breakpoints: {
          xs: '30em',
          sm: '36em',
          md: '48em',
          lg: '62em',
          xl: '75em',
        }
      }}>
        <BrowserRouter>
          <AppShellLayout />
        </BrowserRouter>
      </MantineProvider>
    </div>
  )
}

export default App;


