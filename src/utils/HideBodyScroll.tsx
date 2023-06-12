export const hideBodyScroll = (act: "hide" | "show") => {
  const body = document.querySelector('body');
  switch (act) {
    case "hide":
      if (body !== null) {
        body.style.overflowY = "hidden";
      }
      break;
    case "show":
      if (body !== null) {
        body.style.overflowY = "scroll";
      }
      break;
    default:
      break;

  }
}