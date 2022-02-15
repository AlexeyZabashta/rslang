export const renderLoginWindow = async () => {
  console.log('Отрисовываю окно LogIn');
  // const nameRegExp = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
  // const emailRegExp = /^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$/;
  // const nameRegExp = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  const loginWindow = document.querySelector('.header-login_block') as HTMLElement;
  // loginWindow.innerHTML = '';
  loginWindow.innerHTML = `<div class="login-window">
        <div class="login-exit">
            <button class="login-exit_btn"></button>
        </div>
        <h4 class="login-head"> Sign up </h4> 
        <form class="login-form">
          <input class="login-input _name" 
            type="text"
            name="_name"
            id="_name"
            minlength="2"
            maxlength="20"           
            placeholder="Input login"
            autocomplete="off"
            data-reg="^[a-zA-Z][a-zA-Z0-9-_]{1,20}$"         
          />
          <div class="lable_name">
            Login should contain 2-20 Latin letters, 
            numbers, symbols and characters
          </div>
              
          <input class="login-input _email" 
            type="text"
            name="_email"
            id="_email"           
            placeholder="Input email"
            autocomplete="off"
            data-reg="^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"          
          />
          <div class="lable_email">
            Email must match the sample username@userbox.com
          </div>

          <input class="login-input _password" 
            type="password"
            name="_password"
            id="_password" 
            minlength="8"
            maxlength="20"         
            placeholder="Input password"
            autocomplete="off"
            data-reg="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^0-9a-zA-Z]).{8,15}$"    
          />
          <div class="lable_password">
            Password must contain Latin letters 
            (at least one capital letter), 
            numbers, and special characters #$/?&%@
          </div>S
        </form>  
        <div class="login-btn_wrapper">
            <button class="login-btn sign-in">
                 Sign in 
            </button>        
            <p class="notReg">Are not yet registered?</p>        
            <button class="login-btn registration">
                Registration 
            </button>
        </div>
        <div class="login-error"></div>       
    </div> 
    `;
  loginWindow.style.display = 'flex';
  loginWindow.style.opacity = '1';
  loginWindow.style.visibility = 'visible';

  const exitBtn = document.querySelector('.login-exit_btn') as HTMLButtonElement;
  exitBtn.addEventListener('click', () => {
    loginWindow.style.opacity = '0';
    loginWindow.style.visibility = 'hidden';
  });

  const signInBtn = document.querySelector('.sign-in') as HTMLButtonElement;
  const registrationBtn = document.querySelector('.registration') as HTMLButtonElement;

  signInBtn.addEventListener('mouseover', () => { registrationBtn.classList.add('_not-hover'); });
  signInBtn.addEventListener('mouseout', () => { registrationBtn.classList.remove('_not-hover'); });
  registrationBtn.addEventListener('mouseover', () => { signInBtn.classList.add('_not-hover'); });
  registrationBtn.addEventListener('mouseout', () => { signInBtn.classList.remove('_not-hover'); });

  const loginInputData = document.querySelector('._name') as HTMLInputElement;
  const emailInputData = document.querySelector('._email') as HTMLInputElement;
  const passInputData = document.querySelector('._password') as HTMLInputElement;
  const errorMessage = document.querySelector('.login-error') as HTMLElement;

  const inputCheck = (el: HTMLInputElement) => {
    const inputValue = el.value;
    const inputReg = el.getAttribute('data-reg');
    const regExp = new RegExp(String(inputReg));

    if (regExp.test(inputValue)) {
      el.style.border = '2px solid var(--border)';
      el.style.color = 'var(--border)';
      el.style.backgroundColor = 'var(--white)';
      el.classList.add('_validated');
    } else {
      el.style.border = '2px solid var(--red)';
      el.style.color = 'var(--black)';
      el.style.backgroundColor = 'var(--light-red)';
      el.classList.remove('_validated');
    }
  };

  function inputHandler(target: Event) {
    const elem = target.target as HTMLInputElement;
    if (elem.hasAttribute('data-reg')) inputCheck(elem);
  }

  const loginForm = document.querySelector('.login-form') as HTMLFormElement;
  loginForm.addEventListener('input', inputHandler);

  signInBtn.addEventListener('click', () => {
    if (loginInputData.classList.contains('_validated')
     && emailInputData.classList.contains('_validated')
     && passInputData.classList.contains('_validated')) {
      const userLogin = loginInputData.value;
      const userEmail = emailInputData.value;
      const userPassword = passInputData.value;
      errorMessage.style.opacity = '0';
      console.log('userLogin = ', userLogin, 'userEmail = ', userEmail, 'userPassword = ', userPassword);
    } else {
      errorMessage.innerHTML = 'Log in or register if you don\'t have an account yet';
      errorMessage.style.opacity = '1';
    }
  });
};
