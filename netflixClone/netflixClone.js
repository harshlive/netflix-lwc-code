import { LightningElement, track } from "lwc"; 
import Netfix_Movie_API from "@salesforce/label/c.Netfix_Movie_API";

export default class NetflixClone extends LightningElement {
  @track BASE_URL = "https://api.themoviedb.org/3";
  @track BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";
  @track API_KEY = Netfix_Movie_API;
  @track bannerImage;
  @track bannerTitle;
  @track bannerOverview;
  @track requests = [
    {
      key: "NETFLIX ORIGINALS",
      value:
        this.BASE_URL +
        "/discover/tv?api_key=" +
        this.API_KEY +
        "&with_networks=213"
    },
    {
      key: "TRENDING",
      value:
        this.BASE_URL +
        "/trending/all/week?api_key=" +
        this.API_KEY +
        "&language=en-US"
    },
    {
      key: "TOP RATED",
      value:
        this.BASE_URL +
        "/movie/top_rated?api_key=" +
        this.API_KEY +
        "&language=en-US"
    },
    {
      key: "ACTION",
      value:
        this.BASE_URL +
        "/discover/movie?api_key=" +
        this.API_KEY +
        "&with_genres=28"
    },
    {
      key: "COMEDY",
      value:
        this.BASE_URL +
        "/discover/movie?api_key=" +
        this.API_KEY +
        "&with_genres=35"
    },
    {
      key: "HORROR",
      value:
        this.BASE_URL +
        "/discover/movie?api_key=" +
        this.API_KEY +
        "&with_genres=27"
    },
    {
      key: "ROMANCE",
      value:
        this.BASE_URL +
        "/discover/movie?api_key=" +
        this.API_KEY +
        "&with_genres=10749"
    },
    {
      key: "DOCUMENTARIES",
      value:
        this.BASE_URL +
        "/discover/movie?api_key=" +
        this.API_KEY +
        "&with_genres=99"
    }
  ];
  @track netflixOriginalsURL;

  connectedCallback() {
    this.netflixOriginalsURL =
      this.BASE_URL +
      "/discover/tv?api_key=" +
      this.API_KEY +
      "&with_networks=213";
    fetch(this.netflixOriginalsURL, {
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
        console.log(jsonResponse);
        let rand = Math.floor(Math.random() * jsonResponse.results.length);
        console.log(rand);
        let movie = jsonResponse.results[rand];
        this.bannerImage = this.BASE_IMAGE_URL + movie.backdrop_path;
        this.bannerTitle =
          movie.title != undefined
            ? movie.title
            : movie.name != undefined
            ? movie.name
            : movie.original_name != undefined
            ? movie.original_name
            : "HarryPotter";
        this.bannerOverview = this.truncate(movie.overview, 150);
        console.log(this.bannerImage);
        console.log(this.bannerTitle);
      })
      .catch((error) => {
        console.log("callout error ===> " + JSON.stringify(error));
      });
  }
  truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }
}
