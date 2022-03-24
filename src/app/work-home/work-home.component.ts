import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { WorkHomeService } from './work-home.service';
import { Chart } from 'angular-highcharts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'work-home',
  templateUrl: './work-home.component.html',
  styleUrls: ['./work-home.component.scss']
})
export class WorkHomeComponent implements OnInit {

  chart:any;
  dashboardData:any;

  onGoingCalls: Array<any>;
  completedCalls: Array<any>;
  nonAllottedCalls: Array<any>;
  
  constructor(private WorkHomeService: WorkHomeService, private datePipe: DatePipe) {
  }

  ngOnInit() {  
    this.getAdminDashBoard();
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
  //   this.WorkHomeService.getLeaveAlerts(params).subscribe((resp:any)=>{
  //     this.leaveAlerts = resp.allAlert;
  //   });
  // }

  protected getAdminDashBoard() {
    this.WorkHomeService.getAdminDashboardData().subscribe((resp:any) => {      
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
    this.WorkHomeService.getCompletedCalls().subscribe((resp:any) => {
      
    })
  }

  protected getOnGoingCalls() {
    this.WorkHomeService.getOnGoingCalls().subscribe((resp:any) => {
      
    })
  }

  protected getNonAllottedCalls() {
    this.WorkHomeService.getNonAllottedCalls().subscribe((resp:any) => {
      
    })
  }
}
