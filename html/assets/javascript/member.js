
function handleClick(memberName) {
  ['markmark', 'kaning', 'nun'].forEach((member) => {
    document.getElementById(`memberImage-${member}`).classList.remove('active');
  });

  document.getElementById(`memberImage-${memberName}`).classList.add('active');
  document.getElementById('member-name').innerText = `${memberData[memberName].name} (${memberData[memberName].nickname})`;
  document.getElementById('member-sid').innerText = memberData[memberName].sid;
  document.getElementById('member-dept').innerText = memberData[memberName].dept;
  document.getElementById('member-description').innerText = memberData[memberName].description;

  const memberSocial = document.querySelector('.member__socials');
  memberSocial.innerHTML = '';
  memberData[memberName].socials.forEach((social) => {
    memberSocial.appendChild(createSocialElement(social));
  });
}

function createSocialElement(social) {
  const socialElement = document.createElement('a');
  socialElement.href = social.url;
  socialElement.classList.add('member__social');
  socialElement.target = '_blank';

  const socialImage = document.createElement('img');
  socialImage.src = `assets/images/logo/social/${social.name.toLowerCase()}.svg`;
  socialImage.alt = `${social.name} Logo`;
  socialImage.classList.add('member__socialImage');

  socialElement.appendChild(socialImage);
  return socialElement;
}

function init() {
  handleClick('markmark');

  const memberItem = document.querySelectorAll('.member__item');
  memberItem[0].addEventListener('click', () => handleClick('markmark'));
  memberItem[1].addEventListener('click', () => handleClick('kaning'));
  memberItem[2].addEventListener('click', () => handleClick('nun'));
}

init();