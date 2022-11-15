import { LightningElement, track, api } from "lwc";

export default class NetflixCloneBanner extends LightningElement {
  @api imgUrl;
  @track headerStyle;
  @api bannerTitle;
  @api bannerImage; 
  @api bannerOverview;
  connectedCallback() {
    this.headerStyle = "background-image:url(" + this.bannerImage + ");";
  }
}
