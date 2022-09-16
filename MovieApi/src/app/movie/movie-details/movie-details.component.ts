import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MovieServiceService } from 'src/app/services/movie-service.service'


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private movService: MovieServiceService) { }
  details!: any;

  ngOnInit(): void {
    this.movService.getDetails(this.route.snapshot.paramMap.get('mId'))
      .subscribe(details => {
        this.details = details;
      })
  }

}
