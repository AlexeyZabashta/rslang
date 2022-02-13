export const renderLoginWindow = async () => {
  console.log('Отрисовываю окно LogIn');
  const loginWindow = document.querySelector('.header-login_block') as HTMLElement;
  loginWindow.innerHTML = '';
  loginWindow.innerHTML = `<div class="login-window">
        <div class="login-exit">
            <button class="login-exit_btn"></button>
        </div>
        <h4 class="login-head"> Login </h4>        
        <input class="login-input _login" type="text" placeholder="Input login"/>
        <input class="login-input _password" type="password" placeholder="Input password"/>    
        <div class="login-btn_wrapper">
            <button class="login-btn sign-in">
                 Sign in 
            </button>        
        <p class="notReg">Are not yet registered?</p>        
            <button class="login-btn registration">
                Registration 
            </button>
        </div>       
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

  const loginInputData = document.querySelector('._login') as HTMLInputElement;
  const passInputData = document.querySelector('._password') as HTMLInputElement;

  signInBtn.addEventListener('click', () => {
    if (loginInputData.value !== '' && passInputData.value !== '') {
      const userLogin = loginInputData.value;
      const userPassword = passInputData.value;
      console.log('userLogin = ', userLogin, 'userPassword = ', userPassword);
    } else alert('Авторизируйтесь или Зарегистрируйтесь');
  });
};
