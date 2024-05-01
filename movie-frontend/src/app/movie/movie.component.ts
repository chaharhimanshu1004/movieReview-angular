import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {

  constructor(private http: HttpClient) { }
  moviesList: any[] = [];

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.http.get('http://localhost:3000/movies').subscribe((movies: any) => {
      this.moviesList = movies;
    });
  }

  deleteMovie(id: number) {
    this.http.delete(`http://localhost:3000/movies/${id}`).subscribe(
      () => {
        console.log(`Movie with ID ${id} deleted successfully`);
        // Refresh the movie list after deletion
        this.loadMovies();
      },
      (error) => {
        console.error('Error deleting movie:', error);
      }
    );
  }
  

}
