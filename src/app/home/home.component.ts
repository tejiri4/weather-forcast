import { Component, Input, inject } from '@angular/core';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HomeService } from './home.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LineChartComponent],
  template: `
    <div class="forcast-select-group">
      <label class="forcast-select-group-label" for="forcast-select"
        >Select a forecast:</label
      >
      <select
        id="forcast-select"
        class="forcast-select"
        (change)="handleForcastSelectChange($event)"
      >
        <option
          [defaultSelected]="getDefaultSelected('Select')"
          id="Select"
          disabled
        >
          Select an option
        </option>
        <option
          [defaultSelected]="getDefaultSelected('LWX')"
          id="LWX"
          value="LWX"
        >
          View District of Columbia Forecast
        </option>
        <option
          [defaultSelected]="getDefaultSelected('TOP')"
          id="TOP"
          value="TOP"
        >
          View Kansas Forecast
        </option>
      </select>
    </div>
    <div *ngIf="showChart" class="container">
      <div class="chart">
        <app-line-chart [labels]="labels" [dataset]="dataset"></app-line-chart>
      </div>
    </div>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  HomeService: HomeService = inject(HomeService);
  route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  @Input() labels: any;
  @Input() dataset: any;
  @Input() public id: string = 'Select';
  @Input() showChart: boolean = false;

  constructor() {
    this.route.params.subscribe((params: Params) => {
      this.fetchForecast(params['id']);

      this.id = params['id'] || 'Select';
      this.showChart = params['id'] === 'TOP' || params['id'] === 'LWX';
    });
  }

  fetchForecast(id: string) {
    this.HomeService.getForcast(id).then((forcast) => {
      const timestamps = forcast.properties.periods.map(
        (period) => new Date(period.startTime)
      );
      const temperatures = forcast.properties.periods.map(
        (period) => `${period.temperature}`
      );

      this.labels = timestamps.map((timestamp) => timestamp.toISOString());

      this.dataset = [
        {
          label: 'Temperature',
          data: temperatures,
          backgroundColor: 'blue',
        },
      ];
    });
  }

  handleForcastSelectChange = (event: any) => {
    this.router.navigate([event?.target?.value]);
  };

  getDefaultSelected = (option: string) => {
    console.log(option, this.id, option === this.id);

    return option === this.id;
  };
}
