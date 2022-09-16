import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from 'src/app/services/movie-service.service'
import { Movie } from '../../models/movie.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';


export interface Title {
  name: string;
}

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})


export class MovieListComponent implements OnInit {
  myControl = new FormControl<string | Title>('');
  options: Title[] = [{ name: 'Star Wars' }, { name: 'Batman' }, { name: 'Avengers' }];
  filteredOptions!: Observable<Title[]>;
  movies!: Movie[];

  constructor(private router: Router, private movService: MovieServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );

  }

  displayFn(title: Title): string {
    return title && title.name ? title.name : '';
  }

  private _filter(name: string): Title[] {
    const filterValue = name.toLowerCase();


    this.movService.getMovie(filterValue)
      .subscribe(movies => {
        this.movies = movies.Search;
      })

    return this.options.filter(option => {
      option.name.toLowerCase().includes(filterValue)
    });
  }

  openDialog(poster: String) {
    this.dialog.open(DialogComponent, {
      data: poster
    })
  }

  details(mId: string) {
    this.router.navigate(['/details/' + mId])
  }

}
