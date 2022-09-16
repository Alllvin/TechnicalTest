import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private http: HttpClient) { }

  getMovie(searchValue: string): Observable<any> {
    return this.http.get<any>(`http://www.omdbapi.com/?s=${searchValue}&apikey=715289b`)
  }

  getDetails(mId: any): Observable<any> {
    return this.http.get<any>(`http://www.omdbapi.com/?i=${mId}&plot=full&apikey=715289b`)
  }
}
