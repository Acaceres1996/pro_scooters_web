import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointmanagerService {

  private base:string = "https://api.urudin.tk/"

  getLogin() : string{
    return (this.base + "admin/login");
  }

  getAdminEndpoint() : string{
    return (this.base + "admin");
  }

  getScooterEndpoint(): string{
    return (this.base + "scooter");
  }

  getRegisterEndpoint(): string{
    return (this.base + "scooterhistorico")
  }

  getParameterEndpoint(): string{
    return (this.base + "parametro");
  }

  getUserEndpoint():string{
    return (this.base + "cliente");
  }

  getRideEndpoint():string{
    return (this.base + "viaje");
  }

  getNotificationsEndpoint():string{
    return (this.base + "notificacion");
  }

  getPaymentsEndpoint():string{
    return (this.base + "monederohistorico");
  }
}

