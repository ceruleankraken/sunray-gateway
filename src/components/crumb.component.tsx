import React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import { Chip, Link as MUILink, Typography} from '@mui/material';
// import Chip from '@mui/joy/Chip'
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
// import MUILink from '@mui/material/Link';

interface CrumbsProps {
  linkRef       : string,
  last          : boolean,
  textDefault   : string | undefined,
  textGenerator?: () => string | undefined,
}


const CrumbComponent: React.FC<CrumbsProps> = ({ linkRef, textDefault, textGenerator, last }) => {

  const [text, setText] = React.useState(textDefault);

  React.useEffect( () => {
    // If `textGenerator` is nonexistent, then don't do anything
    if (!(textGenerator)) { 
      return;
    } else {
      // Run the text generator and set the text again
      const finalText = textGenerator();
      setText(finalText);
    }
  }, [textGenerator]);
  return (
    <>
    {
      (last) ? 
        
        <Typography
          color  = "text.primary"
          height = {24}
          sx     = {{
            display   : 'flex',
            alignItems: 'center',
            lineHeight: 1.5,
            fontSize  : '1rem',
            fontWeight: 400,
            color     : '#637381'
          }}
        >
          {text == 'Home' ? <HomeIcon sx={{ fontSize: "1rem" }} /> : text}
          {/* {text} */}
        </Typography>
      :
        <MUILink
          component = {Link}
          height    = {24}
          underline = "hover"
          sx        = {{
            display   : 'flex',
            alignItems: 'center',
            lineHeight: 1.5,
            fontSize  : '1rem',
            fontWeight: 400,
            "&:hover": {
              color: '#19857b',
            }
          }}
          color     = "#212b36"
          href      = {linkRef}
        >
          {text == 'Home' ? <HomeIcon sx={{ fontSize: "1rem"}} /> : text}
        </MUILink>
    }
    </>
  )
}

export default CrumbComponent;