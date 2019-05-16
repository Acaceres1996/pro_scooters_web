import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScooterService } from 'src/app/services/scooter/scooter.service';
import { Scooter } from 'src/app/model/scooter/scooter';
import { AlertService } from 'src/app/alert/alert.service';
import { AlertType } from 'src/app/alert/alert.enum';
import { RegisterService } from 'src/app/services/register/register.service';


@Component({
  selector: 'app-viewscooter',
  templateUrl: './viewscooter.component.html',
  styleUrls: ['./viewscooter.component.scss']
})
export class ViewscooterComponent implements OnInit {
  public id: string;
  scooter: Scooter = new Scooter();

  constructor(
    private route: ActivatedRoute,
    private scooterAPI: ScooterService,
    private alertService: AlertService,
    private registerAPI: RegisterService
  ) { }

  ngOnInit() {
    this.alertService.add(AlertType.info, "Cargando...");
    this.id = this.route.snapshot.paramMap.get('id');
    this.setScooter();
  }

  isEncendido() {
    return this.scooter.encendido;
  }

  setScooter() {
    this.scooterAPI.get(this.id).subscribe(data => {
      this.scooter = data;
      this.registerAPI.getScooterInfo(this.id).subscribe(data => {
        this.scooter.scooterhistorico = data;
      }, error => {
        this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
        console.log(error);
      });
      console.log(this.scooter);
      this.alertService.clear();
    }, error => {
      this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
      console.log(error);
    });
  };
}
