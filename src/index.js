import "./index.scss";
import "./js/pages/notifications";
import "./js/pages/settings";
import "./js/pages/home-page";
import "./js/pages/passes-page";
import "./js/pages/requests-page";
import "./js/pages/making-request-page";
import "./js/pages/settings-about";
import "./js/pages/applications";
import "./js/pages/adding_application";
import "./js/pages/outgoing-requests";
import "./js/pages/incoming-requests";
import "./js/pages/incoming-request-details";
import "./js/pages/request-repeat";
import "./js/pages/login-page";
import "./js/pages/news";
import "./js/pages/add-news";
import "./js/components/header";
import './js/components/modal'
import './js/components/modal-change-work'
import './js/components/modal-pass'
import './js/components/modal-share-pass'
import './js/components/modal-success'
import './js/components/modal-sms'
import "./js/components/switcher";
import "./js/components/form";
import "./js/components/modal-reject-request";
import "./js/components/input-add-file";
import "./js/components/modal-exit";
import "./js/components/filters";
import { example } from "./js/utils/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
console.log(example);

gsap.registerPlugin(ScrollTrigger);

var panels = gsap.utils.toArray(".panel");
panels.pop();

panels.forEach((panel, i) => {
  // Get the element holding the content inside the panel

  // Get the Height of the content inside the panel
  let panelHeight = panel.offsetHeight;

  // Get the window height
  let windowHeight = window.innerHeight;

  let difference = panelHeight - windowHeight;

  // ratio (between 0 and 1) representing the portion of the overall animation that's for the fake-scrolling. We know that the scale & fade should happen over the course of 1 windowHeight, so we can figure out the ratio based on how far we must fake-scroll
  // let fakeScrollRatio =
  //   difference > 0 ? difference / (difference + windowHeight) : 0;

  // // if we need to fake scroll (because the panel is taller than the window), add the appropriate amount of margin to the bottom so that the next element comes in at the proper time.
  // if (fakeScrollRatio) {
  //   panel.style.marginBottom = panelHeight * fakeScrollRatio + "px";
  // }
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: "bottom bottom",
      end: "bottom top",
      pinSpacing: false,
      pin: true,
      scrub: true,
    },
  });

  // fake scroll. We use 1 because that's what the rest of the timeline consists of (0.9 scale + 0.1 fade)
  if (fakeScrollRatio) {
    tl.to(innerpanel, {
      y: -difference,
      duration: 1 / (1 - fakeScrollRatio) - 1,
      ease: "none",
    });
  }
  // tl.fromTo(
  //   panel,
  //   { scale: 1, opacity: 1 },
  //   { scale: 0.5, opacity: 0.5, duration: 0.9 }
  // ).to(panel, { opacity: 0, duration: 0.1 });
});
