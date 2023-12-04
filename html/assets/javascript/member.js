const memberData = {
  "markmark": {
    "name": "Krittamet Damthongkam",
    "nickname": "Mark",
    "sid": "6609490062",
    "dept": "Computer Science, Faculty of Science and Technology",
    "image": "assets/images/member/markmark.webp",
    "description": "He is a computer science student at Thammasat University. Who is interested in web development. He will graduate about in 2026. He has a good knowledge of HTML, CSS, JavaScript, PHP, SQL. He was a trainee web developer since March 2023 - May 2023 at ETDA Thailand. His current goal is to be a full-stack web developer.",
    "socials": [
      {
        "name": "Facebook",
        "url": "https://fb.me/krittamark"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/krittamark"
      },
      {
        "name": "X",
        "url": "https://x.com/krittamark"
      },
      {
        "name": "Github",
        "url": "https://github.com/krittamark"
      }
    ]
  },
  "kaning": {
    "name": "Jiraporn Jaiyasuk",
    "nickname": "Kaning",
    "sid": "6609520090",
    "dept": "Computer Science, Faculty of Science and Technology",
    "image": "assets/images/member/kaning.webp",
    "description": "She like to listen to music or watching videos on Youtube in her free time. She likes to play badminton but she is not good at it. She likes to go out with her friends. She is a person who look introverted but she is not. Fell free to make a conversation with her.",
    "socials": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/njj_jk14"
      },
      {
        "name": "facebook",
        "url": "https://www.facebook.com/jiraporn.jaiyasuk"
      },
      {
        "name": "Github",
        "url": "https://github.com/Jiraporn-Jaiyasuk"
      }
    ]
  },
  "nun": {
    "name": "Nattanan Doangjinda",
    "nickname": "NunInw",
    "sid": "6609611923",
    "dept": "Computer Science, Faculty of Science and Technology",
    "image": "assets/images/member/nun.webp",
    "description": "NUNINW who likes to exercise and swimming",
    "socials": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/nun.nattanun/"
      },
      {
        "name": "Github",
        "url": "https://github.com/Nattanan-Doangjinda"
      }
    ]
  }
};

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