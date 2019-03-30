import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LookAndFeel } from '../../../models/lookAndFeel';
import { TOASTR_TOKEN } from '../../../services/toastr.service';
import { LookAndFeelService } from '../../../services/lookAndFeel.service';

@Component({
  selector: 'app-look-and-feel-update',
  templateUrl: './look-and-feel-update.component.html',
  styleUrls: ['./look-and-feel-update.component.scss']
})
export class LookAndFeelUpdateComponent implements OnInit {

  @Output() saveEvent:EventEmitter<string> = new EventEmitter();
  @Output() cancelEvent:EventEmitter<string> = new EventEmitter();
  @Input() item:any;
  
  constructor(@Inject(TOASTR_TOKEN) private toastr,
  private lookAndFeelService: LookAndFeelService) { }


  formGroup:FormGroup;
  saveDisabled:Boolean = true;

  ngOnInit() {
    this.formGroup = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        css: new FormControl('')
      })

      this.formGroup.statusChanges.subscribe(result => {
        this.saveDisabled = !(this.formGroup.dirty && this.formGroup.valid);
      })

      this.formGroup.get('name').setValue(this.item.Name);
      this.formGroup.get('css').setValue(this.item.CSS);
  }

  guardar() {
    let lookAndFeel: LookAndFeel = new LookAndFeel();
    lookAndFeel.Id = this.item.Id;
    lookAndFeel.Name = this.formGroup.get('name').value;
    lookAndFeel.CSS = this.formGroup.get('css').value;
    
    this.lookAndFeelService.addItem(lookAndFeel).subscribe(result => {
      this.saveEvent.emit('reload');
    }, err => {
      this.toastr.error(err.message);
    })
  }

  cancelar() {
    this.cancelEvent.emit('');
  }

}
