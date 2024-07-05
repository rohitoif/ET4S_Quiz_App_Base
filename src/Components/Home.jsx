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

export default function CustomizedAccordions() {
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
        <Hero />
      <Accordion id="panel1" expanded={expanded === 'panel1'} onMouseEnter={handleMouseEnter('panel1')}  onMouseLeave={handleMouseLeave('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography><b>Who we are ?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
Welcome to mykeeper, where we believe that learning begins with organization. 
Designed especially for young students, mykeeper is more than just a task manager—it's a fun and intuitive tool crafted to teach essential time management skills from an early age.
At mykeeper, we understand the importance of helping children stay organized and on track with their tasks and activities. 

          </Typography>   
        </AccordionDetails>
      </Accordion>
      <Accordion id="panel2" expanded={expanded === 'panel2'} onMouseEnter={handleMouseEnter('panel2')}  onMouseLeave={handleMouseLeave('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography><b>What we do ?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion id="panel3" expanded={expanded === 'panel3'} onMouseEnter={handleMouseEnter('panel3')}  onMouseLeave={handleMouseLeave('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography><b>Our Objective</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}


