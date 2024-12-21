const Footer = () => {
	return (
	  <footer className='py-4 md:px-8 bg-gradient-to-r from-black via-gray-900 to-black text-white border-t border-gray-700'>
		<div className='flex flex-col items-start gap-2 md:max-w-6xl mx-auto'>
		  <p className='text-left text-sm leading-loose text-gray-300'>
			Built by{" "}
			<a
			  href='https://github.com/burakorkmez'
			  target='_blank'
			  className='font-medium text-red-500 hover:text-red-400 transition-colors duration-300 underline underline-offset-4'
			>
			  Shreyansh_Gupta
			</a>
			. The source code is available on{" "}
			<a
			  href='https://github.com/burakorkmez'
			  target='_blank'
			  rel='noreferrer'
			  className='font-medium text-red-500 hover:text-red-400 transition-colors duration-300 underline underline-offset-4'
			>
			  GitHub
			</a>
			.
		  </p>
		</div>
	  </footer>
	);
  };
  
  export default Footer;
  
  
