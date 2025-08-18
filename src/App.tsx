// demo-app/src/App.tsx (Updated)

import { useState } from 'react';
import './App.css';

// Import all your components, including the new Tabs, TabItem, TabPanel
import { Button, TextField, Modal, ToastProvider, useToast, Tabs, TabItem, TabPanel } from 'ui-library';

// The main App component
function App() {
  const [clickCount, setClickCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [errorInput, setErrorInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1'); // State for Tabs component

  const { showToast } = useToast();

  const handleRegularButtonClick = () => {
    setClickCount((prevCount) => prevCount + 1);
    showToast('Button clicked successfully!', 'success');
  };

  const handleLoadingButtonClick = () => {
    setIsLoading(true);
    showToast('Starting async operation...', 'info');
    setTimeout(() => {
      setIsLoading(false);
      showToast('Async operation complete!', 'success');
    }, 2000);
  };

  const handleInputValidation = () => {
    if (inputValue.length < 5) {
      setErrorInput('Input must be at least 5 characters long.');
      showToast('Validation failed!', 'error');
    } else {
      setErrorInput('');
      showToast('Validation successful!', 'success');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    showToast('Modal is open!', 'info');
  };
  const closeModal = () => setIsModalOpen(false);

  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue);
    showToast(`Switched to ${newValue}`, 'info');
  };

  return (
    <div style={{
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '40px',
      backgroundColor: '#282c34',
      minHeight: '100vh',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px'
    }}>
      <h1>Welcome to Your UI Library Demo!</h1>
      <p>This is where you'll see your custom components in action.</p>

      {/* Button Component Examples */}
      <div style={{
        backgroundColor: '#3a3f4a', padding: '30px', borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', display: 'flex',
        flexDirection: 'column', gap: '15px', width: 'fit-content',
        maxWidth: '90%', margin: '0 auto'
      }}>
        <h2>Button Component Examples</h2>
        <p>Current click count: <strong>{clickCount}</strong></p>
        <Button onClick={handleRegularButtonClick}>Click Me (Default)</Button>
        <Button variant="outline" onClick={handleRegularButtonClick}>Outline Button</Button>
        <br /><br />
        <Button size="sm" onClick={handleRegularButtonClick}>Small Button</Button>
        <Button size="lg" onClick={handleRegularButtonClick}>Large Button</Button>
        <br /><br />
        <Button loading={isLoading} onClick={handleLoadingButtonClick} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Simulate Async Action'}
        </Button>
        <br /><br />
        <Button disabled>Truly Disabled</Button>
        <Button variant="outline" disabled>Disabled Outline</Button>
      </div>

      {/* TextField Component Examples */}
      <div style={{
        backgroundColor: '#3a3f4a', padding: '30px', borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', display: 'flex',
        flexDirection: 'column', gap: '15px', width: 'fit-content',
        maxWidth: '90%', margin: '20px auto'
      }}>
        <h2>TextField Component Examples</h2>
        <TextField
          label="Your Name"
          placeholder="Enter your name"
          helperText="Please enter your full name."
          required
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter your password"
          errorText="Password is too short."
        />
        <TextField
          label="Amount"
          type="number"
          placeholder="Enter amount"
          prefix="Rs."
          suffix="only"
        />
        <TextField
          label="Controlled Input"
          helperText={`You typed: ${inputValue.length} characters`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          errorText={errorInput}
        />
        <Button onClick={handleInputValidation}>Validate Input</Button>
      </div>

      {/* Modal Component Example */}
      <div style={{
        backgroundColor: '#3a3f4a', padding: '30px', borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', display: 'flex',
        flexDirection: 'column', gap: '15px', width: 'fit-content',
        maxWidth: '90%', margin: '20px auto'
      }}>
        <h2>Modal Component Example</h2>
        <Button onClick={openModal}>Open Modal</Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Hello Modal!">
        <p>This is the content of the modal. You can place any component here.</p>
        <p>Try pressing the ESC key to close it, or clicking outside of it.</p>
        <Button onClick={closeModal} style={{ marginTop: '16px' }}>Close Modal</Button>
      </Modal>

      {/* New Tabs Component Example */}
      <div style={{
        backgroundColor: '#3a3f4a', padding: '30px', borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', display: 'flex',
        flexDirection: 'column', gap: '15px', width: 'fit-content',
        maxWidth: '90%', margin: '20px auto'
      }}>
        <h2>Tabs Component Example</h2>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <TabItem value="tab1">First Tab</TabItem>
          <TabItem value="tab2">Second Tab</TabItem>
          <TabItem value="tab3">Third Tab</TabItem>

          <TabPanel value="tab1">
            <p>This is the content for the <strong>First Tab</strong>. You can put anything here!</p>
            <TextField label="Tab 1 Input" />
          </TabPanel>
          <TabPanel value="tab2">
            <p>Content for the <strong>Second Tab</strong>. This might be a form or some data.</p>
            <Button>Action in Tab 2</Button>
          </TabPanel>
          <TabPanel value="tab3">
            <p>Welcome to the <strong>Third Tab</strong>. More dynamic content could go here.</p>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

// The App component needs to be wrapped in the ToastProvider
const AppWithProvider = () => (
  <ToastProvider>
    <App />
  </ToastProvider>
);

export default AppWithProvider;