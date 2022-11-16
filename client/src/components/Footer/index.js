import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    // Render footer on each page
    return (
        <footer>
          <div className='center'>
            <a href='https://github.com/carolinemae' target='_blank' rel='noreferrer' className='social-link'>
              <FontAwesomeIcon icon={faGithub} className='social-icon' />
            </a>
            <a href='https://www.linkedin.com/in/caroline-thomson-4279aa23a/' target='_blank' rel='noreferrer' className='social-link'>
              <FontAwesomeIcon icon={faLinkedin} className='social-icon' />
            </a>
            <a href='https://www.facebook.com/EichlerEarthmovingLandscapingConcrete/' target='_blank' rel='noreferrer' className='social-link'>
              <FontAwesomeIcon icon={faFacebook} className='social-icon' />
            </a>
            <a href='https://www.instagram.com/eichlerearthmovers' target='_blank' rel='noreferrer' className='social-link'>
              <FontAwesomeIcon icon={faInstagram} className='social-icon' />
            </a>
          </div>
          <div className='center'>
            <p className='copyright'>
              © 2022 Copyright: Caroline Thomson
            </p>
          </div>
        </footer>
    );
};

export default Footer;
