
// const router = useRouter();
// const getCurrentUser = async () => {
//   const data = await appwriteService.isLoggedIn()
//   if (data) {
//     router.push('/dashboard')
//   }
// }
import React from 'react';

const Header = () => {
  return (
    <div className="header intro closableBannerVisible" id="myHeader">
      <div>
        <div className="container mx-auto px-4">
          <div className="mobile" id="linkid">
            <div id="mySidenav" className="sidenav hidden lg:flex">
              <ul className="list-none flex items-center justify-center lg:block hidden mb-0">
                <li className="w-36 ps-0">
                  <div>
                    <a href="index.html">
                      <img className="w-full logotop" src="images/logo.svg" alt="Logo Top" />
                      <img className="w-full logofixed" src="images/fixedlogo.svg" alt="Logo Fixed" />
                    </a>
                  </div>
                </li>
              </ul>
              <ul className="list-none flex items-center text-left mb-0">
                <li className="nav-item relative hidden lg:block">
                  <a className="nav-link" href="#" title="Solutions" id="headingdivChalet">
                    Solutions <i className="bi bi-chevron-down"></i>
                  </a>
                  <div className="plus-minus-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#solutions"></div>
                  <div className="collapse dropdwoen-sec" id="solutions">
                    <ul className="list-none text-left dropdown-menu1">
                      <li className="nav-item">
                        <a href="javascript:void(0)" title="test">test</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="index.html" title="Home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="about.html" title="About Us">About Us</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="pricing.html" title="Pricing">Pricing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="blog.html" title="Blog">Blog</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact-us.html" title="Contact Us">Contact Us</a>
                </li>
                <li>
                  <div className="mob-nav-booknow flex lg:flex-row flex-col items-center ms-md-5">
                    <div className="me-1">
                      <a className="btn btn_w" href="login.html">Log in</a>
                    </div>
                    <div className="ms-2">
                      <a href="sign-up.html" className="btn btn_2">Sign up</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="row flex items-center">
              <div className="col-md-12 col-12 flex items-center justify-between">
                <div className="w-64 mobilelogo block lg:hidden">
                  <div>
                    <a href="index.html">
                      <img className="w-full logo logotop" src="images/logo.svg" alt="Mobile Logo Top" />
                      <img className="w-full logo logofixed" src="images/fixedlogo.svg" alt="Mobile Logo Fixed" />
                    </a>
                  </div>
                </div>
                <div className="mob-nav-booknow block lg:hidden">
                  <a href="sign-up.html" className="btn btn_2">Sign up</a>
                </div>
                <div className="flex items-center heambermenu">
                  <div id="nav-icon4" className="close">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section>
      <div className="bg-darkgreen">
        <div className="container mx-auto">
          <div className="linebg1 py-24 relative">
            <ul className="linebg2 list-none flex flex-wrap justify-center">
              {[...Array(9)].map((_, i) => (
                <li key={i}></li>
              ))}
            </ul>
            <div className="row flex items-center mt-3 pt-20 relative">
              <div className="col-md-7 tracking-in-expand">
                <div className="w-full" data-aos="fade-right">
                  <div className="header-content pb-5">
                    <h1 className="text-4xl text-gray-800">Accept free & unlimited payments with instant bank settlement</h1>
                    <p className="mt-4" data-aos="zoom-in">
                      Unlock access to QR code, payment links, plugin, and APIs, enabling you to seamlessly accept both free and unlimited payments. Experience instant bank settlement while safeguarding against the risk of bank account freezes through our proprietary smart route technology.
                    </p>
                    <div className="mt-5">
                      <a href="sign-up.html" className="btn btn_2 me-2">Sign up</a>
                      <a href="pricing.html" className="btn btn_w">Start Accepting Payments</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 text-end py-5 text-center">
                <img className="imgph-w rounded-2xl my-4" data-aos="fade-left" src="images/illustration.svg" alt="Illustration" />
              </div>
            </div>
            {/* logoslider */}
            <div className="container pt-5 text-center">
              <div className="col-md-9 mx-auto clientSwipera">
                {[...Array(10)].map((_, i) => (
                  <div key={i}>
                    <img src={`images/logo_${(i % 5) + 1}.svg`} alt={`Logo ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
            {/* logoslider */}
          </div>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <>
      <Header />
      <HeroSection />
    </>
  );
};

export default App;
