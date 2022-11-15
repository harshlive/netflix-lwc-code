import { LightningElement, track } from "lwc";

export default class NetflixCloneNav extends LightningElement {
  @track navCSS = "nav";
  connectedCallback() {
    window.addEventListener("scroll", () => {
      if (window.scrollY < 100) {
        this.navCSS = "nav";
      } else {
        this.navCSS = "nav navblack";
      } 
    });
  }
}
