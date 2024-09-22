import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Hero from './Hero';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions({handleChangePage}) {
  const [expanded, setExpanded] = React.useState('');

  const handleMouseEnter = (panel) => (event, newExpanded) => {
    setExpanded(panel);
    document.getElementById(panel).classList.add("bg-gray-100");

  };

  const handleMouseLeave = (panel) => (event, newExpanded) => {
    setExpanded(false);
    document.getElementById(panel).classList.remove("bg-gray-100");
  };

  return (
    <div>
      <Hero handleChangePage={handleChangePage}/>
      <Accordion id="panel1" expanded={expanded === 'panel1'} onMouseEnter={handleMouseEnter('panel1')}  onMouseLeave={handleMouseLeave('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography><b> Journey Through the Cosmos </b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
Hi there! Welcome to the Starfire spaceship! 
<br />
This is where you will embark on a journey 
to learn about spaceships, exoplanets and so much more!
<br />
Each class will help you finish your missions
and get further into the Cosmos <br />
Earm xp as you finish missions and get higher ranks as you progress

          </Typography>   
        </AccordionDetails>
      </Accordion>
      <Accordion id="panel2" expanded={expanded === 'panel2'} onMouseEnter={handleMouseEnter('panel2')}  onMouseLeave={handleMouseLeave('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography><b>How to Start the Mission?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can begin your mission
            by choosing <b>QUIZ</b> on the left navigation bar <br />
            You can also see your past missions and get back to the Homepage from there as well!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion id="panel3" expanded={expanded === 'panel3'} onMouseEnter={handleMouseEnter('panel3')}  onMouseLeave={handleMouseLeave('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography><b>Starfire Login Details</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You have to use your registered email ID <br />
            You can also use google sign-in option <br />
            You can only attempt a quiz once <br />
            You can request a new password by contacting <br />
            info@edutech4space.com
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}


