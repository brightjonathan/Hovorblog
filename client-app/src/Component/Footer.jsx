import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

const Footer1 = () => {
  return (
    <Footer container className='border border-t-8 border-green-800'>
    <div className='w-full max-w-7xl mx-auto'>
      <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
        <div className='mt-5'>
          <Link
            to='/'
            className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
          >
            <span className='px-2 py-1 bg-[#166534] rounded-lg text-white'>
              hovor
            </span>
            Blog
          </Link>
        </div>
        <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
          <div>
            <Footer.Title title='About' />
            <Footer.LinkGroup col>

              <Link to={'/about'}>
                About us
              </Link>

              <Link to={'/'}>
                hovor Blog
              </Link>

            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title='Follow us' />
            <Footer.LinkGroup col>
              <Footer.Link
                href='https://github.com/brightjonathan'
                target='_blank'
                rel='noopener noreferrer'
              >
                Github
              </Footer.Link>
              <Footer.Link  href='https://www.linkedin.com/in/bright-jonathan-554970212/' target='_blank' rel='noopener noreferrer'>LinkedIn</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title='Legal' />
            <Footer.LinkGroup col>
              <Link to={'/privacy_&_policy'}>Privacy Policy</Link>
              <Link to={'/terms_&_conditions'}>Terms &amp; Conditions</Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>
      <Footer.Divider />
      <div className='w-full sm:flex sm:items-center sm:justify-between'>
        <Footer.Copyright
          href='#'
          by="hovor blog"
          year={new Date().getFullYear()}
        />
        <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
          <Footer.Icon href='#' icon={BsFacebook}/>
          <Footer.Icon href='#' icon={BsInstagram}/>
          <Footer.Icon href='#' icon={BsTwitter}/>
          <Footer.Icon href='https://github.com/brightjonathan' target='_blank' rel='noopener noreferrer'  icon={BsGithub}/>
          <Footer.Icon href='#' icon={BsDribbble}/>

        </div>
      </div>
    </div>
  </Footer>
  )
}

export default Footer1;
