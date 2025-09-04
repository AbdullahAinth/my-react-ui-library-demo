import { useState, useEffect } from "react";
import "./App.css"; // Keep App.css for root level styles if needed
import { ThemeProvider } from "styled-components";

import {
  Button,
  TextField,
  Modal,
  ToastProvider,
  useToast,
  Tabs,
  TabItem,
  TabPanel,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  IconButton,
  Select,
  Tag,
  Avatar,
  Progress,
  Stack,
  Container,
  Card,
  Tooltip, 
  theme,
} from "ui-library";

function AppContent() {
  const [clickCount, setClickCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedOption, setSelectedOption] = useState('option1'); 
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [selectedFruit, setSelectedFruit] = useState('apple');
  const [progressValue, setProgressValue] = useState(25); 

  const { showToast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgressValue((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  const handleRegularButtonClick = () => {
    setClickCount((prev) => prev + 1);
    showToast("Button clicked successfully!", "success");
  };

  const handleLoadingButtonClick = () => {
    setIsLoading(true);
    showToast("Starting async operation...", "info");
    setTimeout(() => {
      setIsLoading(false);
      showToast("Async operation complete!", "success");
    }, 2000);
  };

  const handleInputValidation = () => {
    if (inputValue.length < 5) {
      setErrorInput("Input must be at least 5 characters long.");
      showToast("Validation failed!", "error");
    } else {
      setErrorInput("");
      showToast("Validation successful!", "success");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    showToast("Modal is open!", "info");
  };
  const closeModal = () => setIsModalOpen(false);

  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue);
    showToast(`Switched to ${newValue}`, "info");
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleNotificationsToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNotificationsEnabled(e.target.checked);
  };

  const handleFruitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedFruit(e.target.value);
  };

  return (
    <div
      style={{
        fontFamily: theme.typography.fontFamily,
        textAlign: "center",
        padding: theme.spacing.large,
        backgroundColor: theme.colors.background,
        minHeight: "100vh",
        color: theme.colors.textPrimary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.medium,
      }}
    >
      <h1>Welcome to Your UI Library Demo!</h1>
      <p>This is where you'll see your custom components in action.</p>

      {/* Button Examples */}
      <div
        style={{
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.large,
          borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow,
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.medium,
          width: "fit-content",
          maxWidth: "90%",
          margin: "0 auto",
        }}
      >
        <h2>Button Component Examples</h2>
        <p>
          Current click count: <strong>{clickCount}</strong>
        </p>
        <Button onClick={handleRegularButtonClick}>Click Me (Default)</Button>
        <Button variant="outline" color="secondary" onClick={handleRegularButtonClick}>
          Outline Button
        </Button>
        <Button size="small" onClick={handleRegularButtonClick}>
          Small Button
        </Button>
        <Button size="large" onClick={handleRegularButtonClick}>
          Large Button
        </Button>
        <Button loading={isLoading} onClick={handleLoadingButtonClick}>
          {isLoading ? "Loading..." : "Simulate Async Action"}
        </Button>
        <Button disabled>Truly Disabled</Button>
        <Button variant="outline" disabled>
          Disabled Outline
        </Button>
        <Button color="danger" sx={{ borderRadius: "15px", padding: "10px 30px" }}>
          Custom Styled Button
        </Button>
      </div>

      {/* TextField Examples */}
      <div
        style={{
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.large,
          borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow,
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.medium,
          width: "fit-content",
          maxWidth: "90%",
          margin: `${theme.spacing.medium} auto`,
        }}
      >
        <h2>TextField Component Examples</h2>
        <TextField label="Your Name" placeholder="Enter your name" helperText="Please enter your full name." required fullWidth />
        <TextField label="Password" type="password" placeholder="Enter your password" errorText="Password is too short." fullWidth />
        <TextField label="Amount" type="number" placeholder="Enter amount" prefix="Rs." suffix="only" fullWidth />
        <TextField
          label="Controlled Input"
          helperText={`You typed: ${inputValue.length} characters`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          errorText={errorInput}
          fullWidth
        />
        <Button onClick={handleInputValidation}>Validate Input</Button>
      </div>

      {/* Checkbox Examples */}
      <div
        style={{
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.large,
          borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow,
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.medium,
          width: "fit-content",
          maxWidth: "90%",
          margin: `${theme.spacing.medium} auto`,
        }}
      >
        <h2>Checkbox Component Examples</h2>
        <Checkbox label="Remember me" />
        <Checkbox checked label="Agree to terms" onChange={() => {}} /> 
        <Checkbox disabled label="Disabled Checkbox" />
        <Checkbox checked disabled label="Disabled Checked Checkbox" onChange={() => {}} /> 
      </div>

      {/* Radio Component Examples */}
      <div
        style={{
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.large,
          borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow,
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.medium,
          width: "fit-content",
          maxWidth: "90%",
          margin: `${theme.spacing.medium} auto`,
        }}
      >
        <h2>Radio Component Examples</h2>
        <p>Selected option: <strong>{selectedOption}</strong></p>
        <RadioGroup name="my-radio-group" value={selectedOption} onChange={handleRadioChange} direction="column">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
          <Radio value="option3" label="Option 3" disabled /> 
        </RadioGroup>
        <div style={{ marginTop: theme.spacing.medium }}>
          <p>Horizontal Radio Group:</p>
          <RadioGroup name="horizontal-group" value={selectedOption} onChange={handleRadioChange} direction="row" sx={{ gap: '24px' }}>
            <Radio value="optionA" label="Option A" />
            <Radio value="optionB" label="Option B" />
          </RadioGroup>
        </div>
      </div>

      {/* Switch Examples */}
      <div
        style={{
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.large,
          borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow,
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.medium,
          width: "fit-content",
          maxWidth: "90%",
          margin: `${theme.spacing.medium} auto`,
        }}
      >
        <h2>Switch Component Examples</h2>
        <Switch 
          label="Enable Notifications" 
          checked={isNotificationsEnabled} 
          onChange={handleNotificationsToggle} 
        />
        <div style={{ marginTop: theme.spacing.small }}>
          <Switch label="Dark Mode" onChange={() => {}} /> 
        </div>
        <div style={{ marginTop: theme.spacing.small }}>
          <Switch label="Disabled Switch" disabled />
        </div>
        <div style={{ marginTop: theme.spacing.small }}>
          <Switch label="Disabled & Checked Switch" checked disabled onChange={() => {}} /> 
        </div>
      </div>

      {/* IconButton Examples */}
      <div
        style={{
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.large,
          borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow,
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.medium,
          width: "fit-content",
          maxWidth: "90%",
          margin: `${theme.spacing.medium} auto`,
        }}
      >
        <h2>IconButton Component Examples</h2>
        <div style={{ display: 'flex', gap: theme.spacing.medium, alignItems: 'center', justifyContent: 'center' }}>
          <IconButton size="small" color="primary">➕</IconButton>
          <IconButton size="medium" color="secondary">⚙️</IconButton>
          <IconButton size="large" color="danger">❌</IconButton>
          <IconButton color="inherit">ℹ️</IconButton>
          <IconButton color="transparent">➡️</IconButton>
          <IconButton disabled>🚫</IconButton>
        </div>
        <p style={{ marginTop: theme.spacing.medium }}>Try different sizes and colors!</p>
      </div>

      {/* Select Examples */}
      <div style={{
          backgroundColor: theme.colors.surface, padding: theme.spacing.large, borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow, display: 'flex', flexDirection: 'column', gap: theme.spacing.medium,
          width: 'fit-content', maxWidth: '90%', margin: `${theme.spacing.medium} auto`
        }}>
          <h2>Select Component Examples</h2>
          <Select
            label="Choose your favorite fruit"
            value={selectedFruit}
            onChange={handleFruitChange}
            helperText="Select one from the list."
            fullWidth
          >
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="orange">Orange</option>
            <option value="grape" disabled>Grape (Disabled)</option>
          </Select>
          <div style={{ marginTop: theme.spacing.medium }}>
            <Select
              label="Select with Error"
              value="" // No selection to show error
              onChange={handleFruitChange} // Use the same handler, but it will set an empty string
              errorText="This field is required."
              fullWidth
            >
              <option value="">-- Select --</option>
              <option value="item1">Item 1</option>
              <option value="item2">Item 2</option>
            </Select>
          </div>
        </div>

      {/* Tag Examples */}
      <div style={{
          backgroundColor: theme.colors.surface, padding: theme.spacing.large, borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow, display: 'flex', flexDirection: 'column', gap: theme.spacing.medium,
          width: 'fit-content', maxWidth: '90%', margin: `${theme.spacing.medium} auto`
        }}>
          <h2>Tag Component Examples</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing.small, justifyContent: 'center' }}>
            <Tag color="primary">Primary Tag</Tag>
            <Tag color="secondary" variant="outline">Secondary Outline</Tag>
            <Tag color="danger">Danger</Tag>
            <Tag color="info" size="small">Info Small</Tag>
            <Tag color="success" size="medium">Success Medium</Tag>
            <Tag color="warning" size="large">Warning Large</Tag>
            <Tag color="primary" onClose={() => showToast('Tag closed!', 'info')}>Closable Tag</Tag>
            <Tag color="success" onClose={() => showToast('Done!', 'success')} sx={{ borderRadius: '20px' }}>Custom Rounded</Tag>
          </div>
        </div>

      {/* Avatar Examples */}
      <div style={{
          backgroundColor: theme.colors.surface, padding: theme.spacing.large, borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow, display: 'flex', flexDirection: 'column', gap: theme.spacing.medium,
          width: 'fit-content', maxWidth: '90%', margin: `${theme.spacing.medium} auto`
        }}>
          <h2>Avatar Component Examples</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing.medium, alignItems: 'center', justifyContent: 'center' }}>
            {/* Image Avatar */}
            <Avatar src="https://placehold.co/64x64/282c34/f5f5f5?text=User" alt="User Avatar" size="large" />
            {/* Initials Avatar (no src) */}
            <Avatar name="John Doe" size="medium" />
            <Avatar name="Jane Smith" size="small" />
            {/* Square Avatar */}
            <Avatar src="https://placehold.co/48x48/4a90e2/f5f5f5?text=Dev" alt="Developer Avatar" variant="square" size="medium" />
            {/* Initials Square Avatar */}
            <Avatar name="AI" variant="square" size="large" sx={{ backgroundColor: 'purple' }} />
            {/* Broken Image URL fallback */}
            <Avatar src="broken-image.jpg" alt="Broken Image" name="Fallback Initials" size="medium" />
          </div>
          <p style={{ marginTop: theme.spacing.medium }}>Avatars can display images or initials.</p>
        </div>

      {/* Progress Examples */}
      <div style={{
          backgroundColor: theme.colors.surface, padding: theme.spacing.large, borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow, display: 'flex', flexDirection: 'column', gap: theme.spacing.medium,
          width: 'fit-content', maxWidth: '90%', margin: `${theme.spacing.medium} auto`
        }}>
          <h2>Progress Component Examples</h2>
          <Progress value={progressValue} fullWidth />
          <p>Determinate Progress: {progressValue}%</p>
          <Progress variant="indeterminate" color="secondary" fullWidth />
          <p>Indeterminate Progress</p>
          <Progress value={75} color="success" sx={{ width: '300px' }} />
          <Progress value={30} color="danger" sx={{ width: '150px' }} />
        </div>

      {/* Stack Examples */}
      <div style={{
          backgroundColor: theme.colors.surface, padding: theme.spacing.large, borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow, display: 'flex', flexDirection: 'column', gap: theme.spacing.medium,
          width: 'fit-content', maxWidth: '90%', margin: `${theme.spacing.medium} auto`
        }}>
          <h2>Stack Component Examples</h2>
          <h3>Vertical Stack (default)</h3>
          <Stack spacing="medium" sx={{ border: `1px dashed ${theme.colors.textSecondary}`, padding: theme.spacing.small, width: '200px' }}>
            <Button size="small">Item 1</Button>
            <Button size="small">Item 2</Button>
            <TextField label="Item 3" />
          </Stack>
          
          <h3>Horizontal Stack (row)</h3>
          <Stack direction="row" spacing="large" alignItems="center" justifyContent="center" 
            sx={{ border: `1px dashed ${theme.colors.textSecondary}`, padding: theme.spacing.small, width: '300px' }}>
            <Tag color="primary">Tag A</Tag>
            <Tag color="secondary">Tag B</Tag>
            <Tag color="info">Tag C</Tag>
          </Stack>

          <h3>Horizontal Stack (with wrap)</h3>
          <Stack direction="row" spacing="small" wrap="wrap" justifyContent="flex-start" sx={{ 
              border: `1px dashed ${theme.colors.background}`, 
              padding: theme.spacing.small, 
              width: '250px',
              backgroundColor: theme.colors.background, 
              margin: '0 auto'
            }}>
            <Tag>Long Tag One</Tag>
            <Tag>Tag Two</Tag>
            <Tag>Another Long Tag</Tag>
            <Tag>Short</Tag>
            <Tag>More Items</Tag>
            <Tag>Last One</Tag>
          </Stack>

          <h3>Custom Spacing Stack (40px)</h3>
          <Stack spacing={40} sx={{ border: `1px dashed ${theme.colors.textSecondary}`, padding: theme.spacing.small, width: '200px' }}>
            <Avatar name="S1" size="small" />
            <Avatar name="S2" size="medium" />
            <Avatar name="S3" size="large" />
          </Stack>
        </div>

      {/* Container Examples */}
      <div style={{
          backgroundColor: theme.colors.surface, padding: theme.spacing.large, borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow, display: 'flex', flexDirection: 'column', gap: theme.spacing.medium,
          width: 'fit-content', maxWidth: '90%', margin: `${theme.spacing.medium} auto`
        }}>
          <h2>Container Component Examples</h2>
          <p>Resize your browser window to see the max-width effect.</p>

          <Container maxWidth="sm" sx={{ backgroundColor: theme.colors.background, padding: theme.spacing.medium, border: `1px dashed ${theme.colors.primary}` }}>
            <p style={{ margin: 0, textAlign: 'left' }}>This content is within a `Container` with `maxWidth="sm"`. It should be centered and narrower on large screens.</p>
          </Container>

          <Container maxWidth="md" sx={{ backgroundColor: theme.colors.background, padding: theme.spacing.medium, border: `1px dashed ${theme.colors.secondary}` }}>
            <p style={{ margin: 0, textAlign: 'left' }}>This content is within a `Container` with `maxWidth="md"`. It's wider than 'sm'.</p>
          </Container>

          <Container maxWidth="lg" sx={{ backgroundColor: theme.colors.background, padding: theme.spacing.medium, border: `1px dashed ${theme.colors.info}` }}>
            <p style={{ margin: 0, textAlign: 'left' }}>This content is within a `Container` with `maxWidth="lg"` (the default). It's quite wide.</p>
          </Container>

          <Container maxWidth="none" sx={{ backgroundColor: theme.colors.background, padding: theme.spacing.medium, border: `1px dashed ${theme.colors.danger}` }}>
            <p style={{ margin: 0, textAlign: 'left' }}>This content is within a `Container` with `maxWidth="none"`. It should take full width (minus padding).</p>
          </Container>
        </div>
      
      {/* Card Examples */}
      <div style={{
          backgroundColor: theme.colors.surface, padding: theme.spacing.large, borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow, display: 'flex', flexDirection: 'column', gap: theme.spacing.medium,
          width: 'fit-content', maxWidth: '90%', margin: `${theme.spacing.medium} auto`
        }}>
          <h2>Card Component Examples</h2>
          <Card sx={{ maxWidth: '350px', margin: '0 auto' }}>
            <h3 style={{ marginTop: 0, marginBottom: theme.spacing.small }}>Welcome to the Card!</h3>
            <p style={{ color: theme.colors.textSecondary, marginBottom: theme.spacing.medium }}>
              This is a flexible container for various UI elements.
            </p>
            <Stack direction="row" spacing="small" justifyContent="flex-end" sx={{ marginTop: theme.spacing.medium }}>
              <Button variant="outline" size="small">Learn More</Button>
              <Button size="small">Get Started</Button>
            </Stack>
          </Card>

          <Card sx={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: theme.spacing.medium }}>
            <Avatar name="Alice Wonderland" size="large" src="https://placehold.co/60x60/8B0000/FFFFFF?text=AW" />
            <Stack spacing="small" alignItems="flex-start">
              <h3 style={{ margin: 0, fontSize: theme.typography.fontSize.large }}>Alice Wonderland</h3>
              <Tag color="info">Administrator</Tag>
              <Progress value={80} color="success" sx={{ width: '100px', marginTop: theme.spacing.small }} />
            </Stack>
          </Card>

          <Card fullWidth sx={{ marginTop: theme.spacing.medium }}>
            <h3 style={{ marginTop: 0 }}>Full Width Card</h3>
            <p style={{ color: theme.colors.textSecondary }}>
              This card stretches to the full available width of its parent (minus padding).
            </p>
          </Card>
        </div>

      {/* Tooltip Examples */}
      <div style={{
          backgroundColor: theme.colors.surface, padding: theme.spacing.large, borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow, display: 'flex', flexDirection: 'column', gap: theme.spacing.medium,
          width: 'fit-content', maxWidth: '90%', margin: `${theme.spacing.medium} auto`,
          minHeight: '250px', // Ensure enough space for tooltips
          alignItems: 'center', // Center content for better tooltip visibility
          justifyContent: 'center',
          position: 'relative', // Ensure tooltips are positioned correctly relative to this container
        }}>
          <h2>Tooltip Component Examples</h2>
          <Stack direction="row" spacing="large" alignItems="center" justifyContent="center">
            <Tooltip title="This is a top tooltip!">
              <Button>Hover Me (Top)</Button>
            </Tooltip>
            <Tooltip title="Click to open a new tab!" placement="bottom">
              <Button variant="outline">Bottom Tooltip</Button>
            </Tooltip>
            <Tooltip title="Edit this item" placement="left">
              <IconButton size="medium" color="primary">✏️</IconButton>
            </Tooltip>
            <Tooltip title="Delete this item permanently" placement="right">
              <IconButton size="medium" color="danger">🗑️</IconButton>
            </Tooltip>
            <Tooltip title="This is some descriptive text about the info icon." placement="top">
              <span>ⓘ Info Icon</span>
            </Tooltip>
          </Stack>
          <p style={{ marginTop: theme.spacing.medium, color: theme.colors.textSecondary }}>
            Hover over the elements to see the tooltips.
          </p>
        </div>


      {/* Modal Example */}
      <div
        style={{
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.large,
          borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow,
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.medium,
          width: "fit-content",
          maxWidth: "90%",
          margin: `${theme.spacing.medium} auto`,
        }}
      >
        <h2>Modal Component Example</h2>
        <Button onClick={openModal}>Open Modal</Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Hello Modal!">
        <p style={{ color: theme.colors.textSecondary }}>
          This is the content of the modal. You can place any component here.
        </p>
        <Button onClick={closeModal} sx={{ marginTop: theme.spacing.medium }}>
          Close Modal
        </Button>
      </Modal>

      {/* Tabs Example */}
      <div
        style={{
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.large,
          borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow,
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.medium,
          width: "fit-content",
          maxWidth: "90%",
          margin: `${theme.spacing.medium} auto`,
        }}
      >
        <h2>Tabs Component Example</h2>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <TabItem value="tab1">First Tab</TabItem>
          <TabItem value="tab2">Second Tab</TabItem>
          <TabItem value="tab3">Third Tab</TabItem>

          <TabPanel value="tab1">
            <p>This is the content for the First Tab.</p>
          </TabPanel>
          <TabPanel value="tab2">
            <p>Content for the Second Tab.</p>
          </TabPanel>
          <TabPanel value="tab3">
            <p>Welcome to the Third Tab.</p>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

// ✅ Root app with providers
const App = () => (
  <ToastProvider>
    <ThemeProvider theme={theme}>
      <AppContent />
    </ThemeProvider>
  </ToastProvider>
);

export default App;
