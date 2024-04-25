import { Component, Input, NgZone } from '@angular/core';
import Chart, { ChartDataset } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  template: `
    <div class="chart-container">
      <canvas id="MyChart">{{ chart }}</canvas>
    </div>
  `,
  styleUrl: './line-chart.component.css',
})
export class LineChartComponent {
  public chart!: any;
  @Input() public labels!: string[];
  @Input() public dataset!: ChartDataset<'line', string[]>[];

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges() {
    this.ngZone.runOutsideAngular(() => {
      this.chart.data.labels = this.labels;
      this.chart.data.datasets = this.dataset;

      this.chart.update();
    });
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: this.dataset,
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },

            // add this:
            adapters: {
              date: {
                locale: enUS,
              },
            },
          },
          y: {
            ticks: {
              callback: function (value, index, values) {
                return value + '°F';
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });
  }
}
