import { Component } from '@angular/core';
import { ColorService, DashboardOptions } from '@ux-aspects/ux-aspects';
import { Chart } from 'chart.js';
import 'chance';
import jsPDF from 'jspdf';

@Component({
    selector: 'my-sample',
    templateUrl: './sample.component.html'
})
export class SampleComponent {

    makePdf(panel) {
        let styles: string[] = [];

        for (let stylesheetIdx = 0; stylesheetIdx < document.styleSheets.length; stylesheetIdx++) {


            // debugger;

            let stylesheet = document.styleSheets.item(stylesheetIdx) as any;

            let rules = stylesheet.cssRules as CSSRuleList;

            for (let ruleIdx = 0; ruleIdx < rules.length; ruleIdx++) {
                styles.push(rules.item(ruleIdx).cssText);
            }
        }


        let styleElement = document.createElement('style');
        styleElement.innerHTML = styles.join('\n');


        let modal = document.getElementById('testPDF');
        let source = document.getElementById('testCopy');

        let newWindow = window.open('about:blank');
        newWindow.document.head.appendChild(styleElement);
        newWindow.document.body.appendChild(source.cloneNode(true));
    }

    iframe: HTMLIFrameElement;
    iframeDoc: Document;

    iframeVisible = false;

    iframeShow() {
        let source = document.getElementById('testCopy');
        let body = this.iframeDoc.getElementsByTagName('BODY')[0];
        body.appendChild(source.cloneNode(true));

        this.iframeVisible = true;
    }

    iframePrint() {
        let source = document.getElementById('testCopy');
        let body = this.iframeDoc.getElementsByTagName('BODY')[0];
        body.appendChild(source.cloneNode(true));

        this.iframe.contentWindow.print();
    }

    ngOnInit() {
        this.iframe = (<HTMLIFrameElement> document.getElementById('print-iframe'));
        // let iframeDoc = this.iframe.contentDocument;
        this.iframeDoc = this.iframe.contentDocument;

        let styles: string[] = [];

        for (let stylesheetIdx = 0; stylesheetIdx < document.styleSheets.length; stylesheetIdx++) {
            let stylesheet = document.styleSheets.item(stylesheetIdx) as any;

            let rules = stylesheet.rules as CSSRuleList;

            for (let ruleIdx = 0; ruleIdx < rules.length; ruleIdx++) {
                styles.push(rules.item(ruleIdx).cssText);
            }
        }


        let styleElement = this.iframeDoc.createElement('style');
        styleElement.innerHTML = styles.join('\n');

        let head = this.iframeDoc.getElementsByTagName('HEAD')[0];
        head.appendChild(styleElement);
    }
    
    // configure the directive data
    lineChartData: Chart.ChartData = [{
        data: [],
        borderWidth: 2,
        fill: false
    },
    {
        data: [],
        borderWidth: 2,
        fill: false
    }];

    lineChartOptions: Chart.ChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        elements: {
            line: {
                tension: 0
            },
            point: {
                radius: 0
            }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent'
                },
                ticks: {
                    min: 0,
                    max: 49,
                    maxRotation: 0
                } as Chart.LinearTickOptions
            }],
            yAxes: [{
                gridLines: {
                    color: '#ddd'
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 100
                } as Chart.LinearTickOptions,
            }]
        },
    };

    lineChartLabels: string[] = [];
    lineChartLegend: boolean = false;
    lineChartColors = [
        {
            borderColor: this.colorService.getColor('vibrant1').toHex(),
        },
        {
            borderColor: this.colorService.getColor('vibrant2').toHex(),
        }];

    options: DashboardOptions = {
        columns: 2,
        padding: 10,
        rowHeight: 220,
        emptyRow: false,
        minWidth: 187
    };

    table: any[] = [{
        name: 'test',
        content: 'test',
    }, {
        name: 'test',
        content: 'test',
    }, {
        name: 'test',
        content: 'test',
    }, {
        name: 'test',
        content: 'test',
    }, {
        name: 'test',
        content: 'test',
    }, {
        name: 'test',
        content: 'test',
    }, {
        name: 'test',
        content: 'test',
    }, {
        name: 'test',
        content: 'test',
    }, {
        name: 'test',
        content: 'test',
    }, {
        name: 'test',
        content: 'test',
    }, {
        name: 'test',
        content: 'test',
    }, {
        name: 'test',
        content: 'test',
    }, {
        name: 'test',
        content: 'test',
    }, {
        name: 'test',
        content: 'test',
    }];

    constructor(public colorService: ColorService) {

        // generate the chart data
        for (let idx = 0; idx < 50; idx++) {

            let label = '';

            if (idx === 0) {
                label = 'Jan 1, 2017';
            }

            if (idx === 49) {
                label = 'Mar 30, 2017';
            }

            this.lineChartLabels.push(label);

            this.lineChartData[0].data.push({
                x: idx,
                y: idx
            });

            this.lineChartData[1].data.push({
                x: idx,
                y: idx
            });
        }
    }
}