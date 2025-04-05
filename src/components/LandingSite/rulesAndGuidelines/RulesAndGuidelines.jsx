import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemIcon } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RuleIcon from '@mui/icons-material/Gavel';
import GuidelineIcon from '@mui/icons-material/ListAlt';
import WarningIcon from '@mui/icons-material/Warning';

const RulesAndGuidelines = () => {
  const [expanded, setExpanded] = useState('rules');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Sample rules - replace with your actual hostel rules later
  const hostelRules = [
    "Strict curfew at 11:00 PM for all residents",
    "No unauthorized guests in rooms after 9:00 PM",
    "Alcohol and smoking prohibited in hostel premises",
    "Lights out in common areas by midnight",
    "Damage to property will result in fines"
  ];

  const guidelines = [
    "Keep your room and common areas clean",
    "Report maintenance issues within 24 hours",
    "Conserve electricity and water",
    "Respect quiet hours (2:00 PM - 4:00 PM and 10:00 PM - 7:00 AM)",
    "Label your food in the common fridge"
  ];

  const penalties = [
    "First violation: Written warning",
    "Second violation: Rs. 500 fine",
    "Third violation: Rs. 1000 fine and parental notification",
    "Repeated violations: Termination of hostel accommodation"
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Hostel Rules & Guidelines
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ mb: 3, color:"white" }}>
        All residents must adhere to the following rules and guidelines to maintain a safe and pleasant living environment.
      </Typography>

      {/* Rules Accordion */}
      <Accordion expanded={expanded === 'rules'} onChange={handleChange('rules')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <RuleIcon color="primary" sx={{ mr: 2 }} />
          <Typography variant="h6">Mandatory Rules</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {hostelRules.map((rule, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <WarningIcon color="error" />
                </ListItemIcon>
                <Typography>{rule}</Typography>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Guidelines Accordion */}
      <Accordion expanded={expanded === 'guidelines'} onChange={handleChange('guidelines')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <GuidelineIcon color="primary" sx={{ mr: 2 }} />
          <Typography variant="h6">General Guidelines</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {guidelines.map((guideline, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <RuleIcon color="action" />
                </ListItemIcon>
                <Typography>{guideline}</Typography>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Penalties Accordion */}
      <Accordion expanded={expanded === 'penalties'} onChange={handleChange('penalties')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <WarningIcon color="warning" sx={{ mr: 2 }} />
          <Typography variant="h6">Penalties for Violations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {penalties.map((penalty, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Typography color="error">{index + 1}.</Typography>
                </ListItemIcon>
                <Typography>{penalty}</Typography>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      <Typography variant="body2" sx={{ mt: 3, fontStyle: 'italic', color:"gray" }}>
        Last updated: {new Date().toLocaleDateString()}
      </Typography>
    </Box>
  );
};

export default RulesAndGuidelines;