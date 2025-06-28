import { setEngine } from "./app/getEngine";
import { LoadScreen } from "./app/screens/LoadScreen";
import { MainScreen } from "./app/screens/main/MainScreen";
import { userSettings } from "./app/utils/userSettings";
import { CreationEngine } from "./engine/engine";
import "@pixi/sound";

declare global {
  interface Window {
    WebFontConfig: any;
  }
}

// Create a new creation engine instance
const engine = new CreationEngine();
setEngine(engine);

// Load the Google WebFont before initializing MainScreen
window.WebFontConfig = {
  google: {
    families: ["Playpen Sans Arabic:100,200,300,400,500,600,700,800"],
  },
  async active() {
    // Initialize the creation engine instance
    await engine.init({
      background: "#1E1E1E",
      resizeOptions: { minWidth: 768, minHeight: 1024, letterbox: false },
    });

    // Initialize the user settings
    userSettings.init();

    // Show the load screen
    await engine.navigation.showScreen(LoadScreen);

    // Show the main screen once the font and load screen are ready
    await engine.navigation.showScreen(MainScreen);
  },
};

// Inject the WebFont loader script
(function () {
  const wf = document.createElement("script");
  wf.src =
    (document.location.protocol === "https:" ? "https" : "http") +
    "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
  wf.type = "text/javascript";
  wf.async = true;
  const s = document.getElementsByTagName("script")[0];
  s.parentNode!.insertBefore(wf, s);
})();
