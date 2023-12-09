function createActivityElement(data) {
  const activityElement = document.createElement("div");
  activityElement.classList.add("activity__item");

  const activityImageWrapper = document.createElement("div");
  activityImageWrapper.classList.add("activityImage__wrapper");

  const activityImage = document.createElement("img");
  activityImage.classList.add("activityImage__image");
  activityImage.src = data.activityImage;

  const activityImageGradient = document.createElement("div");
  activityImageGradient.classList.add("activityImage__gradient");

  const activityDescTitle = document.createElement("span");
  activityDescTitle.classList.add("activityDesc__title");
  activityDescTitle.innerText = `${data.name} (${data.studentID})`;

  const activityDescText = document.createElement("span");
  activityDescText.classList.add("activityDesc__text");
  activityDescText.innerText = data.description;

  activityImageGradient.appendChild(activityDescTitle);
  activityImageGradient.appendChild(activityDescText);

  activityImageWrapper.appendChild(activityImage);
  activityImageWrapper.appendChild(activityImageGradient);

  const activityContentWrapper = document.createElement("div");
  activityContentWrapper.classList.add("activityContent__wrapper");

  const activityTitle = document.createElement("span");
  activityTitle.classList.add("activity__title");
  activityTitle.innerText = data.workTitle;

  const activityLocationWrapper = document.createElement("div");
  activityLocationWrapper.classList.add("activityLocation__Wrapper");

  const activityLocationIcon = document.createElement("i");
  activityLocationIcon.classList.add("icon", "icon-pin");

  const activityLocationText = document.createElement("span");
  activityLocationText.classList.add("activityLocation__text");
  activityLocationText.innerText = data.location;

  activityLocationWrapper.appendChild(activityLocationIcon);
  activityLocationWrapper.appendChild(activityLocationText);

  activityContentWrapper.appendChild(activityTitle);
  activityContentWrapper.appendChild(activityLocationWrapper);

  activityElement.appendChild(activityImageWrapper);
  activityElement.appendChild(activityContentWrapper);

  return activityElement;
}