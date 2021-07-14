import { AfterViewInit, TemplateRef, ViewChild, Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'issue-ngtemplateref';
  dtOptions = {};
  columns: Array<any> = [];

  @ViewChild('dtActions') dtActions!: TemplateRef<any>;

  dataTableActions: Array<any> = [
    {
      cmd: "edit",
      label: "Bearbeiten"
    },
    {
      cmd: "delete",
      label: "Löschen"
    },
  ];

  constructor(private cd: ChangeDetectorRef) {
    this.columns = [];
  }

  ngAfterViewInit() {
    this.columns.push(...[
      {
        title: 'ID',
        data: 'id'
      },
      {
        title: 'First name',
        data: 'firstName',
      },
      {
        title: 'Last name',
        data: 'lastName'
      }
    ]);

    if (this.dataTableActions.length > 0) {
      this.columns.push({
        title: "Aktionen",
        data: null,
        orderable: false,
        searchable: false,
        defaultContent: "",
        ngTemplateRef: {
          ref: this.dtActions,
          context: {
            captureEvents: this.onCaptureEvent.bind(this)
          }
        }
      });
    }

    this.dtOptions = {
      ajax: 'assets/data.json',
      dom: '<l>Bfrtip',
      buttons: [
        {
          extend: 'colvis',
          columns: ':not(.noVis)'
        },
        'excel',
      ],
      columnDefs: [
        {
          targets: "_all",
          className: "valign-middle",
        },
        {
          targets: [0],
          className: "text-right noVis",
        },
      ],
      stateSave: true,
      serverSide: true,
      processing: true,
      searchDelay: 600,
      columns: this.columns
    };

    this.cd.detectChanges();
  }

  onCaptureEvent(event: any): void {
    //Stuff
  }
}
