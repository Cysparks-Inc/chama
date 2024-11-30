// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material"; // Material UI components
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import SavingsForm from "./pages/SavingsForm";

// Function to handle opening/closing of the sidebar
function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Router>
      <CssBaseline /> {/* Global CSS Reset for Material-UI */}
      {/* Main App Layout */}
      <Box sx={{ display: "flex" }}>
        {/* Drawer (Sidebar) */}
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={drawerOpen}
        >
          <List>
            <ListItem button>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Settings" />
            </ListItem>
            {/* Add more items here */}
          </List>
        </Drawer>

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            padding: 3,
            width: `calc(100% - ${drawerOpen ? 240 : 0}px)`, // Adjust main content width based on sidebar visibility
            transition: "width 0.3s ease",
          }}
        >
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Group Dashboard
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <button onClick={toggleDrawer}>|||</button>
            </Toolbar>
          </AppBar>

          {/* Routing */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/saving form" element={<SavingsForm />} />
            {/* You can add more routes here */}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
