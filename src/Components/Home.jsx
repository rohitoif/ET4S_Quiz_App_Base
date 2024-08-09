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
          <Typography><b> The Lore </b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
Greetings Ranger 🫡🫡!! Welcome to ET4S Space Station 🚀!!.. 
<br />
The most advanced space station in the Galactiforus galaxies supercluster. 
Your accomplishments precedes you. We are excited to have u here 🫡🫡 !!
<br /><br />
<b>MISSION DESCRIPTION : </b>
<br />
Long ago in a faraway future, a team of super-smart scientists built a machine to harness the most awesome force in the universe. 
This machine, named the "Crea", was designed to explore the cosmos, find new life, and prove to the universe that life can exist in other galaxies.

Unfortunately, Crea fell into the hands of 'the guwashian force' our enemy alien alliance. 
Our species are on the brink of existence and we need your expertise and space knowledge to save us !! 

We are counting on you ranger.. Don't let us down 🤖🤖 !!!

          </Typography>   
        </AccordionDetails>
      </Accordion>
      <Accordion id="panel2" expanded={expanded === 'panel2'} onMouseEnter={handleMouseEnter('panel2')}  onMouseLeave={handleMouseLeave('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography><b>Programme Instructions </b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You will be headed by <b> 'Commander Doggo' 🐶</b> .. <br />
            Doggo is the head of 'Galactiforus' and is the smartest dog known to mankind a subject of extraordinary evolution I must say
            <br />... He will give you missions you gotta complete..
            Be sure to finish them up cuz Doggo has a very bad temper..😓😓
            <br /><br />

            You will be assisted by <b>'Caddie' 🤖 </b>, <br/>revolutionary robot hacking system.. Caddie will assist you through your missions...
            But don't rely on him too much ... he is known to crash down if overused ....😵😵
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion id="panel3" expanded={expanded === 'panel3'} onMouseEnter={handleMouseEnter('panel3')}  onMouseLeave={handleMouseLeave('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography><b>Message for the parents</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We request parents to kindly guide their children with accessing and using our quiz app. <br />
            Here is a little tutorial on the know-hows : <br />
            <ul>
                <li>Set up easy Sign-in via remember password option or google sign-in</li>
                <li>Access weekly quizzes via quizzes page</li>
                <li>Answer quizzes using powerups along the way</li>
                <li>View kids Acheivements and progress via 'My Spaceship' tab</li>
            </ul><br />
            Kindly contact EduTech4Space team for further guidance and support 🙌🙌..!!

          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}


