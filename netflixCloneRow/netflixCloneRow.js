import { LightningElement, track, api } from "lwc";

export default class NetflixCloneRow extends LightningElement {
  @api title;
  @api fetchUrl; 
  @track resp;
  @track BASE_URL = "https://image.tmdb.org/t/p/original";
  connectedCallback() {
    fetch(this.fetchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjEyMWI4ZmZkMzdkYjE5MTIzYzlmNDczMjFlMjU5YyIsInN1YiI6IjVjNDc0NWFmMGUwYTI2NDk2NWNhNGFhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tdMnNkQfXU__PtQSCyB-XPBJ3FJtIVwlU86LBJHeURU"
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        this.resp = jsonResponse.results;

        this.resp.forEach((element) => {
          if (element.backdrop_path) {
            element.backdrop_path = this.BASE_URL + element.backdrop_path;
            element.class =
              this.title == "NETFLIX ORIGINALS"
                ? "poster posterlarge"
                : "poster";
          }
        });
      })
      .catch((error) => {
        console.log("callout error ===> " + JSON.stringify(error));
      });
  }
}
