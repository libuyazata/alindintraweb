import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { HomeService } from './home.service';
import { Chart } from 'angular-highcharts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  chart:any;
  dashboardData:any;

  onGoingCalls: Array<any>;
  completedCalls: Array<any>;
  nonAllottedCalls: Array<any>;
  
  constructor(private homeService: HomeService, private datePipe: DatePipe) {
    // this.homeService.getDashboardData({}).subscribe((resp:any) => {
    //   this.dashboardData = resp.dashBoard;
    //   let emp30DaysTrend = this.convertToChartData(this.dashboardData.dashBoardEmployeeStatus);
    //   this.renderLast30DaysAttendanceTrend(emp30DaysTrend);
    //   // this.getLeaveAlerts();
    // });
  }

  ngOnInit() {  
    this.getAdminDashBoard();
    //this.getCompletedCalls();
    //this.getNonAllottedCalls();
    //this.getOnGoingCalls();
  }

  protected renderLast30DaysAttendanceTrend(emp30DaysTrend:any) {
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Last 30 days Attendance Trend'
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Number of employees present'
        }
    
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        // series: {
        //   borderWidth: 0,
        //   dataLabels: {
        //     enabled: true,
        //     format: '{point.y:.1f}'
        //   }
        // }
      },
    
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },
    
      "series": [
        {
          "name": "Employees Present",
          //"colorByPoint": false,
          "data": emp30DaysTrend
        }
      ]
    });
  }

  protected convertToChartData(dataList:any) {
    let employeesData = [];
    for (let index=0; index < dataList.length; index++) {
      employeesData.push({
        "name" : this.datePipe.transform(dataList[index].dayDate, "dd MMM yyyy"),
        "y" : dataList[index].presentEmployeeCount
      })
    }
    return employeesData;
  }

  // protected getLeaveAlerts(){
  //   let params = { "year" : new Date().getFullYear() };
  //   this.homeService.getLeaveAlerts(params).subscribe((resp:any)=>{
  //     this.leaveAlerts = resp.allAlert;
  //   });
  // }

  protected getAdminDashBoard() {
    this.homeService.getAdminDashboardData().subscribe((resp:any) => {      
      /*
      noOfDepartments: 8
      noOfEmpoyees: 10
      empCountBasedOnDept: null
      projectDetails:
        totalProjects: 9
        pjtNotStarted: 0
        pjtStarted: 9
        totalPjtDoc: 18
      */
      if(resp.adminDashBoard != null){
        this.dashboardData = resp.adminDashBoard;
      }
    })
  }

  protected getCompletedCalls() {
    this.homeService.getCompletedCalls().subscribe((resp:any) => {
      
    })
  }

  protected getOnGoingCalls() {
    this.homeService.getOnGoingCalls().subscribe((resp:any) => {
      
    })
  }

  protected getNonAllottedCalls() {
    this.homeService.getNonAllottedCalls().subscribe((resp:any) => {
      
    })
  }
}
