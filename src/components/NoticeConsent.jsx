import { Checkbox, FormControlLabel, Link, Typography } from '@mui/material';
import React from 'react';

const NoticeConsent = ({ consent, setConsent }) => {
  return (
    <>
      <Typography
        variant='body1'
        color='text.secondary'
        textAlign='center'
        sx={{
          color: '#B32656',
          fontWeight: 700,
        }}
      >
        Notice and Consent
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            sx={{
              '&.Mui-checked': {
                color: '#B32656',
              },
            }}
          />
        }
        label={
          <Typography variant='caption' sx={{ fontSize: '0.7rem' }}>
            By checking the box and clicking the "Next" button below, I agree to the{' '}
            <Link
              href='https://www.soco.id/page/privacypolicy'
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                color: '#B32656',
                textDecoration: 'underline',
              }}
            >
              Sociolla Privacy Policy
            </Link>
            , and the{' '}
            <Link
              href='https://www.soco.id/page/termsandconditions'
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                color: '#B32656',
                textDecoration: 'underline',
              }}
            >
              Terms & Conditions
            </Link>
            , and I expressly consent to the scanning and other processing of my image, face, facial geometry, and
            biometric data as described in the Sociolla Privacy Policy.
          </Typography>
        }
      />
    </>
  );
};

export default NoticeConsent;
